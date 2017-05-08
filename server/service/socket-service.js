'use strict'

class clientQueue {
    constructor ({ server }) {
        this.queue = [],
        this.server = server
    }

    add (item) {
        for (let i = 0, len = this.queue.length; i < len; i++) {
            if (this.queue[i].id === item.id) {
                return console.log('not add-client')
            }
        }

        this.queue.push(item)
        console.log('add-client')
    }

    remove (id) {
        for (let i = 0, len = this.queue.length; i < len; i++) {
            if (id === this.queue[i].id) {
                return this.queue.splice(i, 1)
            }
        }
        console.log('remove-client', this.queue.length)
    }

    notifyAll (key, value) {
        this.queue.map(item => {
            console.log('notifyAll', item.id, key)
            this.server.to(item.id).emit(key, value)
        })
    }
}

module.exports = function socketService ({ server, isInvalidToken }) {
    const SocketIO = require('socket.io')(server)
    const syncConsole = SocketIO.of('/sync-console')

    const onlineClientQueue = new clientQueue({
        server: syncConsole
    })
    const onlineAdminQueue = new clientQueue({
        server: syncConsole
    })

    syncConsole.on('connection', function (socket) {
        socket.on('client:init', data => {
            onlineClientQueue.add({
                id: socket.id,
                system: data.system,
                project: data.project
            })
            onlineAdminQueue.notifyAll('admin:add-client', {
                id: socket.id,
                system: data.system,
                project: data.data
            })
        })

        socket.on('admin:init-req', data => {
            if (isInvalidToken(data.token)) return console.log('admin:init-req  unauth user is not admin')
            onlineAdminQueue.add({
                id: socket.id
            })
            socket.emit('admin:init-res', onlineClientQueue.queue)
        })

        socket.on('admin:sync-req', data => {
            if (isInvalidToken(data.token)) return console.log('admin:sync-req unauth user is not admin')
            const target = data.target
            syncConsole.to(target).emit('client:sync-req', {
                target: socket.id
            })
        })

        socket.on('admin:run-code', data => {
            if (isInvalidToken(data.token)) return console.log('admin:run-code unauth user is not admin')
            const target = data.target
            syncConsole.to(target).emit('client:run-code', {
                code: data.code
            })
        })

        socket.on('client:sync-init', (data) => {
            syncConsole.to(data.target).emit('admin:sync-init', {
                data: data.data
            })
        })

        socket.on('client:sync-update', (data) => {
            syncConsole.to(data.target).emit('admin:sync-update', {
                data: data.data
            })
        })

        socket.on('disconnect', function () {
            onlineClientQueue.remove(socket.id)
            onlineAdminQueue.remove(socket.id)
            onlineAdminQueue.notifyAll('admin:remove-client', {
                id: socket.id
            })
        })
    })
}