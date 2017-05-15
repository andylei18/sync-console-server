/*!
 * SyncConsole.js v0.0.6
 * (c) 2017 Awe <hilongjw@gmail.com>
 * Released under the MIT License.
 * 
 */
webpackJsonp([1],{104:function(module,__webpack_exports__,__webpack_require__){"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(__webpack_exports__,"__esModule",{value:!0});var __WEBPACK_IMPORTED_MODULE_0__event__=__webpack_require__(107),__WEBPACK_IMPORTED_MODULE_1__mock_console__=__webpack_require__(115),__WEBPACK_IMPORTED_MODULE_2__mock_xhr__=__webpack_require__(117),__WEBPACK_IMPORTED_MODULE_3__mock_error__=__webpack_require__(116),__WEBPACK_IMPORTED_MODULE_4__socket_client__=__webpack_require__(118),__WEBPACK_IMPORTED_MODULE_5__system__=__webpack_require__(119),__WEBPACK_IMPORTED_MODULE_6__trace_kit__=__webpack_require__(109),__WEBPACK_IMPORTED_MODULE_7__history__=__webpack_require__(114),_createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();__WEBPACK_IMPORTED_MODULE_6__trace_kit__.a.collectWindowErrors=!1;var SyncConsole=function(_Event){function SyncConsole(e){_classCallCheck(this,SyncConsole);var t=_possibleConstructorReturn(this,(SyncConsole.__proto__||Object.getPrototypeOf(SyncConsole)).call(this));return t.options=e,t.remoteMode=!1,t._history=new __WEBPACK_IMPORTED_MODULE_7__history__.a(t.options),t.logQueue=[],t.historyQueue=t._history.queue,t.netWorkQueue=[],t.clientQueue=[],t.mockConsole=null,t.mockNetWork=null,t.mockError=null,t.scoketClient=null,t.systemInfo=new __WEBPACK_IMPORTED_MODULE_5__system__.a,t.system=t.systemInfo.data,t.initConsole({methods:t.options.consoleMethods}),t.initNetWork(),t.initMockError({Vue:t.options.Vue}),t.socketOptions={nsp:t.options.server+"sync-console",token:t.options._sync_console_token,project:t.options.project},t.options._sync_console_remote&&t.initClient(),t}return _inherits(SyncConsole,_Event),_createClass(SyncConsole,[{key:"initConsole",value:function(e){this.mockConsole=new __WEBPACK_IMPORTED_MODULE_1__mock_console__.a(e),this.mockConsole.$on("new",this.newLog.bind(this))}},{key:"newLog",value:function(e){this.historyQueue.push(e),this.logQueue.push(e),this.$emit("update-log",e),this.scoketClient&&this.scoketClient.$emit("ask-update",{log:e})}},{key:"initNetWork",value:function(){this.mockNetWork=new __WEBPACK_IMPORTED_MODULE_2__mock_xhr__.a,this.mockNetWork.$on("update",this.updateNetWrok,this)}},{key:"updateNetWrok",value:function(e){for(var t=!1,n=0,o=this.netWorkQueue.length;n<o;n++)if(this.netWorkQueue[n]._requestId===e._requestId){t=!0,this.netWorkQueue[n]=e;break}t||this.netWorkQueue.push(e),this.$emit("update-net",e),this.scoketClient&&this.scoketClient.$emit("ask-update",{net:e})}},{key:"initMockError",value:function(e){var t=this;this.mockError=new __WEBPACK_IMPORTED_MODULE_3__mock_error__.a(e),this.mockError.$on("update",function(e){console.error(e),t.$emit("new-error")})}},{key:"initClient",value:function(){var e=this;return this.scoketClient?Promise.resolve(this.scoketClient.client):(this.scoketClient=new __WEBPACK_IMPORTED_MODULE_4__socket_client__.a(this.socketOptions),this.scoketClient.init().then(function(){return e.scoketClient.$emit("system",e.system),e.scoketClient.$on("ask-data",function(t){t(null,{system:e.system,logQueue:e.logQueue,historyQueue:e.historyQueue,netWorkQueue:e.netWorkQueue})}),e.scoketClient.$on("init",function(t){e.system=t.system||{},e.logQueue=t.logQueue||[],e.historyQueue=t.historyQueue||[],e.netWorkQueue=t.netWorkQueue||[],e.$emit("init-log",e.logQueue),e.$emit("init-net",e.netWorkQueue),e.$emit("init-history",e.historyQueue)}),e.scoketClient.$on("update",function(t){t.log&&e.newLog(t.log),t.net&&e.updateNetWrok(t.net)}),e.scoketClient.$on("run-code",function(t){e.execCommand(t)}),e.scoketClient.$on("remote-mode",function(){e.remoteSync=!0}),e.scoketClient.$on("init-clients",function(){e.clientQueue=e.scoketClient.clientQueue,e.$emit("init-clients",e.clientQueue)}),e.scoketClient.$on("update-clients",function(){e.clientQueue=e.scoketClient.clientQueue}),e.scoketClient.client}).catch(function(e){console.debug(e)}))}},{key:"setRemoteMode",value:function(){this.remoteMode=!0,this.scoketClient.remoteMode()}},{key:"removeClient",value:function(){this.scoketClient.remove()}},{key:"execCommand",value:function execCommand(code){if(this.remoteSync)return this.scoketClient.$emit("run-code-remote",code);console.log(code);try{var result=eval(code);console.log(result)}catch(e){console.error(__WEBPACK_IMPORTED_MODULE_6__trace_kit__.a.computeStackTrace(e))}}},{key:"remove",value:function(){this.removeClient()}}]),SyncConsole}(__WEBPACK_IMPORTED_MODULE_0__event__.a);__webpack_exports__.default=SyncConsole},107:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=function(){function e(){o(this,e),this._listeners={}}return r(e,[{key:"$on",value:function(e,t,n){return n=n||null,this._listeners[e]||(this._listeners[e]=[]),this._listeners[e].push({cb:t,ctx:n}),this._listeners[e].length-1}},{key:"$once",value:function(e,t,n){n=n||null}},{key:"$off",value:function(e,t){var n=this;this._listeners[e]&&this._listeners[e].length&&(t||(this._listeners[e].map(function(e){return null}),this._listeners[e]=[]),"function"==typeof t&&this._listeners[e].map(function(o,r){o.cb===t&&(n._listeners[e].splice(r,1),o=null)}),"number"==typeof t&&this._listeners[e].splice(t,1))}},{key:"$emit",value:function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];if(t.length){var o=t[0];t.shift(),this._listeners[o]&&this._listeners[o].length&&this._listeners[o].map(function(e){e.cb.apply(e.ctx,t)})}}}]),e}();t.a=i},109:function(e,t,n){"use strict";var o=n(36),r={collectWindowErrors:!0,debug:!1},i="?";r.computeStackTrace=function(){function e(e){if(void 0!==e.stack&&e.stack){for(var t,r,a,u=/^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,s=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?)(?::(\d+))?(?::(\d+))?\s*$/i,c=/^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,l=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,f=/\((\S*)(?::(\d+))(?::(\d+))\)/,p=e.stack.split("\n"),h=[],m=(/^(.*) is undefined$/.exec(e.message),0),_=p.length;m<_;++m){if(r=u.exec(p[m])){var d=r[2]&&0===r[2].indexOf("native"),y=r[2]&&0===r[2].indexOf("eval");y&&(t=f.exec(r[2]))&&(r[2]=t[1],r[3]=t[2],r[4]=t[3]),a={url:d?null:r[2],func:r[1]||i,args:d?[r[2]]:[],line:r[3]?+r[3]:null,column:r[4]?+r[4]:null}}else if(r=c.exec(p[m]))a={url:r[2],func:r[1]||i,args:[],line:+r[3],column:r[4]?+r[4]:null};else{if(!(r=s.exec(p[m])))continue;var y=r[3]&&r[3].indexOf(" > eval")>-1;y&&(t=l.exec(r[3]))?(r[3]=t[1],r[4]=t[2],r[5]=null):0!==m||r[5]||void 0===e.columnNumber||(h[0].column=e.columnNumber+1),a={url:r[3],func:r[1]||i,args:r[2]?r[2].split(","):[],line:r[4]?+r[4]:null,column:r[5]?+r[5]:null}}!a.func&&a.line&&(a.func=i),h.push(a)}return h.length?{name:e.name,message:e.message,url:n.i(o.d)(),stack:h}:null}}function t(e,t,n,o){var r={url:t,line:n};if(r.url&&r.line){if(e.incomplete=!1,r.func||(r.func=i),e.stack.length>0&&e.stack[0].url===r.url){if(e.stack[0].line===r.line)return!1;if(!e.stack[0].line&&e.stack[0].func===r.func)return e.stack[0].line=r.line,!1}return e.stack.unshift(r),e.partial=!0,!0}return e.incomplete=!0,!1}function a(e,s){for(var c,l,f=/function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i,p=[],h={},m=!1,_=a.caller;_&&!m;_=_.caller)if(_!==u&&_!==r.report){if(l={url:null,func:i,line:null,column:null},_.name?l.func=_.name:(c=f.exec(_.toString()))&&(l.func=c[1]),void 0===l.func)try{l.func=c.input.substring(0,c.input.indexOf("{"))}catch(e){}h[""+_]?m=!0:h[""+_]=!0,p.push(l)}s&&p.splice(0,s);var d={name:e.name,message:e.message,url:n.i(o.d)(),stack:p};return t(d,e.sourceURL||e.fileName,e.line||e.lineNumber,e.message||e.description),d}function u(t,i){var u=null;i=null==i?0:+i;try{if(u=e(t))return u}catch(e){if(r.debug)throw e}try{if(u=a(t,i+1))return u}catch(e){if(r.debug)throw e}return{name:t.name,message:t.message,url:n.i(o.d)()}}return u.augmentStackTraceWithInitialElement=t,u.computeStackTraceFromStackProp=e,u}(),t.a=r},110:function(e,t,n){"use strict";function o(e){return e.replace(/\/.*\//,"")}function r(e){var t=e.$options.name||e.$options._componentTag;if(t)return t;var n=e.$options.__file;return n?o(n):e.$root===e?"Root":"Anonymous Component"}function i(e){var t=void 0;if(_&&(t=e._props))return Object.keys(t).map(function(n){var o=t[n],r=o.options;return{type:"props",key:o.path,value:e[o.path],meta:{type:r.type?a(r.type):"any",required:!!r.required,mode:d[o.mode]}}});if(t=e.$options.props){var o=[];for(var r in t){var i=t[r];r=n.i(m.f)(r),o.push({type:"props",key:r,value:e[r],meta:{type:i.type?a(i.type):"any",required:!!i.required}})}return o}return[]}function a(e){var t=e.toString().match(y);return"function"==typeof e?t&&t[1]||"any":"any"}function u(e){var t=_?e._props:e.$options.props,n=e.$options.vuex&&e.$options.vuex.getters;return Object.keys(e._data).filter(function(e){return!(t&&e in t||n&&e in n)}).map(function(t){return{key:t,value:e._data[t]}})}function s(e){var t=[],n=e.$options.computed||{};for(var o in n){var r=n[o],i="function"==typeof r&&r.vuex?"vuex bindings":"computed",a=null;try{a={type:i,key:o,value:e[o]}}catch(e){a={type:i,key:o,value:"(error during evaluation)"}}t.push(a)}return t}function c(e){var t=e.$route;if(t){var n=t.path,o=t.query,r=t.params,i={path:n,query:o,params:r};return t.fullPath&&(i.fullPath=t.fullPath),t.hash&&(i.hash=t.hash),t.name&&(i.name=t.name),t.meta&&(i.meta=t.meta),[{key:"$route",value:i}]}return[]}function l(e){var t=e.$options.vuex&&e.$options.vuex.getters;return t?Object.keys(t).map(function(t){return{type:"vuex getters",key:t,value:e[t]}}):[]}function f(e){var t=e.$observables;return t?Object.keys(t).map(function(t){return{type:"observables",key:t,value:e[t]}}):[]}function p(e){if(e){var t=e.constructor;return t&&t.version&&(_=t.version&&"1"===t.version.split(".")[0]),{id:e._uid,_isVue:!0,name:r(e),state:i(e).concat(u(e),s(e),c(e),l(e),f(e))}}return{}}function h(e,t){return t&&t._isVue?p(t):t}var m=n(36);t.a=h;var _=!1,d=["default","sync","once"],y=/^(?:function|class) (\w+)/},114:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var r=n(36),i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=function(){function e(t){var n=t.maxLogCount;o(this,e),this.queue=this.load(),this.maxLogCount=n||30,this.mockQueuePush(),this.onCloseSave()}return i(e,[{key:"mockQueuePush",value:function(){var e=this,t=this.queue.push;this.queue.push=function(n){if(e.queue.length>e.maxLogCount)for(;e.queue.length>e.maxLogCount;)e.queue.shift();t.call(e.queue,n)}}},{key:"onCloseSave",value:function(){var e=this,t=window.onbeforeunload;window.onbeforeunload=function(){e.save(),n.i(r.e)(t)&&t()}}},{key:"save",value:function(){var e=JSON.stringify(this.queue);n.i(r.h)("historyQueue",e)||(this.queue=[])}},{key:"load",value:function(){var e=n.i(r.i)("historyQueue")||"[]",t=[];try{t=JSON.parse(e)}catch(e){console.error(e)}return t}}]),e}();t.a=a},115:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=n(107),u=n(148),s=n.n(u),c=n(110),l=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),f=function(e){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n.options={methods:e.methods||["log","warn","info","error"]},n.logIndex=0,n.mockConsole(n.options.methods),n}return i(t,e),l(t,[{key:"mockConsole",value:function(e){var t=this;e.map(function(e){var n=console[e],o=t;console[e]=function(){for(var t=arguments.length,r=Array(t),i=0;i<t;i++)r[i]=arguments[i];if(!r||!r.length)return n.apply(console,r);var a={id:o.logIndex++,type:e,date:Date.now(),args:JSON.parse(s()(r,c.a))};o.$emit("new",a),n.apply(console,r)}})}}]),t}(a.a);t.a=f},116:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=n(107),u=n(109),s=n(110),c=n(36),l=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),f=function(e){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n.options=e,n.mockOnError(),n.options.Vue&&(n.options.Vue.config.errorHandler=function(){for(var e=arguments.length,t=Array(e),o=0;o<e;o++)t[o]=arguments[o];n.VueErrorHandler.apply(n,t)}),n}return i(t,e),l(t,[{key:"VueErrorHandler",value:function(e,t,o){var r=u.a.computeStackTrace(e);if(!r)return console.error(e,n.i(s.a)("",t),o);var i=void 0,a=void 0;r.stack.length&&(i=r.stack[0].line,a=r.stack[0].column),this.$emit("update",{lineNo:i,colNo:a,source:r.url,name:r.name,error:e,message:e.message,stack:r.stack,info:o,vm:n.i(s.a)("",t)})}},{key:"mockOnError",value:function(){var e=this;u.a.collectWindowErrors=!1,this.windowOnError=window.onerror,window.onerror=function(t,o,r,i,a){var s=a&&u.a.computeStackTrace(a);if(!s)return console.error(t,o,r,i,a);var l={name:s.name,message:t,source:o,lineNo:r,colNo:i,error:a,stack:s.stack};e.$emit("update",l),n.i(c.e)(e.windowOnError)&&e.windowOnError.call(window,t,o,r,i,a)}}}]),t}(a.a);t.a=f},117:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e){var t={},n=[];return e?(e.split("\n").map(function(e){n=e.split(":"),e&&n.length&&(t[n[0]]=n[1])}),t):t}var u=n(107),s=n(36),c=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=function(e){function t(){o(this,t);var e=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.mockXMLHttpRequest(),e}return i(t,e),c(t,[{key:"update",value:function(e){var t=this.formatRequest(e,{requestHeader:{},_requestId:e._requestId,startTime:0,costTime:0,status:0,header:"",headers:{},response:"",url:e._URL});this.$emit("update",t)}},{key:"formatRequest",value:function(e,t){switch(e.readyState){case 0:case 1:e._startTime=t.startTime=Date.now();break;case 2:t.header=e.getAllResponseHeaders();break;case 3:break;case 4:t.requestHeader=e._SyncHeader,t.startTime=e._startTime,t.header=e.getAllResponseHeaders(),t.headers=a(t.header),t.response=e.response,t.endTime=Date.now(),t.costTime=t.endTime-t.startTime}return t.status=e.status,t}},{key:"mockXMLHttpRequest",value:function(){if(window.XMLHttpRequest){var e=function(){},t=this,o=window.XMLHttpRequest.prototype.open,r=window.XMLHttpRequest.prototype.setRequestHeader;window.XMLHttpRequest.prototype.setRequestHeader=function(e,t){return this._SyncHeader||(this._SyncHeader={}),this._SyncHeader[e]=t,r.call(this,e,t)},window.XMLHttpRequest.prototype.open=function(){for(var r=arguments.length,i=Array(r),a=0;a<r;a++)i[a]=arguments[a];var u=this,c=i[1],l=this.onprogress||e,f=this.onload||e;u._requestId=n.i(s.g)(),u._URL=c;var p=u.onreadystatechange||e;return c&&(this.onreadystatechange=function(){return t.update(this),p.apply(u,arguments)},this.onprogress=function(){t.update(this);for(var e=arguments.length,n=Array(e),o=0;o<e;o++)n[o]=arguments[o];return l.apply(u,n)},this.onload=function(){t.update(this);for(var e=arguments.length,n=Array(e),o=0;o<e;o++)n[o]=arguments[o];return f.apply(u,n)}),o.apply(u,i)}}}}]),t}(u.a);t.a=l},118:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=n(107),u=n(36),s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),c=void 0,l=function(e){function t(e){o(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this)),a=e.token,s=e.nsp,c=e.project;return i.token=a,i.remote=!1,i.client=null,i.nsp=s,i.project=c||n.i(u.d)(),i.target="",i.clientQueue=[],i}return i(t,e),s(t,[{key:"addClient",value:function(e){for(var t=0,n=this.clientQueue.length;t<n;t++)if(this.clientQueue[t].id===e.id)return;this.clientQueue.push(e),this.$emit("update-clients")}},{key:"removeClient",value:function(e){for(var t=0,n=this.clientQueue.length;t<n;t++)if(this.clientQueue[t].id===e.id){this.clientQueue.splice(t,1);break}this.$emit("update-clients")}},{key:"loadClients",value:function(){var e=this,t=n.i(u.a)();this.client.emit("admin:init-req",{token:this.token,project:t._sync_console_project}),this.client.on("admin:init-res",function(t){t.map(e.addClient.bind(e)),e.$emit("init-clients")}),this.client.on("admin:add-client",function(t){e.addClient(t)}),this.client.on("admin:remove-client",function(t){e.removeClient(t)})}},{key:"clearOldRemoteModeListenner",value:function(){this.$off("run-code-remote")}},{key:"remoteMode",value:function(e){var t=this;this.client&&(this.remote=!0,this.target=e,this.clearOldRemoteModeListenner(),this.client.off("admin:sync-update"),this.client.off("admin:sync-init"),this.$emit("remote-mode"),this.client.emit("admin:sync-req",{target:e,token:this.token}),this.client.on("admin:sync-init",function(e){t.$emit("init",e.data)}),this.client.on("admin:sync-update",function(e){t.$emit("update",e.data)}),this.$on("run-code-remote",function(e){t.client.emit("admin:run-code",{code:e,token:t.token,target:t.target})}))}},{key:"clientMode",value:function(){var e=this;this.client&&(this.$off("ask-update"),this.$off("system"),this.$on("system",function(t){e.client.emit("client:init",{system:t,project:e.project})}),this.client.on("client:sync-req",function(t){e.target=t.target,e.$emit("ask-data",function(t,n){t||e.client.emit("client:sync-init",{target:e.target,data:n})})}),this.$on("ask-update",function(t){e.target&&!e.remote&&e.client.emit("client:sync-update",{target:e.target,data:t})}),this.client.on("client:run-code",function(t){e.$emit("run-code",t.code)}),this.client.on("client:error",function(t){console.error(t.message),e.$emit("error-msg",t.message)}))}},{key:"init",value:function(){var e=this;return this.client?Promise.resolve(this.client):n.e(2).then(n.bind(null,77)).then(function(t){return c=t,e.client=c.connect(e.nsp),e.clientMode(),e.client})}},{key:"remove",value:function(){this.client.close(),this.client=null}}]),t}(a.a);t.a=l},119:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=n(107),u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),s=function(e){function t(){o(this,t);var e=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.UA=window&&window.navigator&&window.navigator.userAgent?window.navigator.userAgent:"",e.data=e.syncData(),e.systemMemory=[],e.asyncData(),e.updateMemory(),e}return i(t,e),u(t,[{key:"syncData",value:function(){return{UA:this.UA,viewportWidth:window.innerWidth||document.documentElement.clientWidth,viewportHeight:window.innerHeight||document.documentElement.clientHeight,layoutWidth:document.documentElement.clientWidth,layoutHeight:document.documentElement.clientHeight,zoom:document.documentElement.clientHeight/window.innerHeight,dpr:window.devicePixelRatio,system:this.system(),browser:this.browser(),wechat:this.wechat(),network:this.network()}}},{key:"asyncData",value:function(){var e=this;this.performance(function(t,n){t&&console.error(t),e.data=Object.assign(e.data,n),e.$emit("update",e.data)})}},{key:"browser",value:function(){var e=this.UA,t="",n=e.match(/(chrome)\/([\d.]+)/i),o=e.match(/(safari)\/([\d.]+)/i),r=e.match(/(firefox)\/([\d.]+)/i),i=e.match(/opera (.*)\/(.*\d);/i),a=/msie|trident/i.test(e),u=e.match(/(?:msie |rv:)(\d+(\.\d+)?)/i);return n?t="Chrome "+n[2].replace(/_/g,"."):o?t="Safari "+o[2].replace(/_/g,"."):r?t="Firefox "+r[2].replace(/_/g,"."):i?t="Opera "+i[2].replace(/_/g,"."):a&&(t="Internet Explorer "+u[1]),t}},{key:"system",value:function(){var e=this.UA,t="Unknown",n=e.match(/(ipod).*\s([\d_]+)/i),o=e.match(/(ipad).*\s([\d_]+)/i),r=e.match(/(iphone)\sos\s([\d_]+)/i),i=e.match(/(android)\s([\d.]+)/i),a=e.match(/CrOS/i),u=e.match(/mac (.*) ([\d_]+)/i),s=e.match(/windows (.*) ([\d.]+)/i);return i?t="Android "+i[2]:r?t="iPhone, iOS "+r[2].replace(/_/g,"."):o?t="iPad, iOS "+o[2].replace(/_/g,"."):n?t="iPod, iOS "+n[2].replace(/_/g,"."):u?t="Mac "+u[1]+" "+u[2].replace(/_/g,"."):s?t="Windows "+s[1]+" "+s[2].replace(/_/g,"."):a&&(t="Chromeos"),t}},{key:"wechat",value:function(){var e=this.UA,t=e.match(/MicroMessenger\/([\d.]+)/i),n="Unknown";return t&&t[1]&&(n=" WeChat "+t[1]),n}},{key:"protocol",value:function(){var e="Unknown";return e="https:"===location.protocol?"HTTPS":"http:"===location.protocol?"HTTP":location.protocol.replace(":",""),e}},{key:"network",value:function(){var e=this.UA,t=e.toLowerCase().match(/ nettype\/([^ ]+)/g),n="Unknown";return t&&t[0]&&(t=t[0].split("/"),n=t[1]),n}},{key:"updateMemory",value:function(){var e=this;this.systemMemoryTimer=setInterval(function(){e.systemMemory.length>100&&e.systemMemory.shift(),e.systemMemory.push(e.memory())},500)}},{key:"memory",value:function(){var e=window.performance||window.msPerformance||window.webkitPerformance;if(e){var t=e.memory;if(t){var n=t.usedJSHeapSize,o=Math.pow(1024,2);return{size:Math.floor(n/o),percent:100*Math.random()}}}}},{key:"performance",value:function(e){var t=window.performance||window.msPerformance||window.webkitPerformance;if(!t||!t.timing)return e(new Error("unsupport  performance"));var n={};setTimeout(function(){var o=t.memory,r=t.timing,i=Math.pow(1024,2);o&&o.usedJSHeapSize&&(n.usedJSHeapSize=Math.floor(o.usedJSHeapSize/i)+" MB"),o&&o.totalJSHeapSize&&(n.totalJSHeapSize=Math.floor(o.totalJSHeapSize/i)+" MB"),o&&o.jsHeapSizeLimit&&(n.jsHeapSizeLimit=Math.floor(o.jsHeapSizeLimit/i)+" MB"),r.navigationStart&&(n.navigationStart=r.navigationStart),r.navigationStart&&r.domainLookupStart&&(n.navigation=r.domainLookupStart-r.navigationStart+"ms"),r.domainLookupEnd&&r.domainLookupStart&&(n.dns=r.domainLookupEnd-r.domainLookupStart+"ms"),r.connectEnd&&r.connectStart&&(r.connectEnd&&r.secureConnectionStart?n["tcp (ssl)"]=r.connectEnd-r.connectStart+"ms ("+(r.connectEnd-r.secureConnectionStart)+"ms)":n.tcp=r.connectEnd-r.connectStart+"ms"),r.responseStart&&r.requestStart&&(n.request=r.responseStart-r.requestStart+"ms"),r.responseEnd&&r.responseStart&&(n.response=r.responseEnd-r.responseStart+"ms"),r.domComplete&&r.domLoading&&(r.domContentLoadedEventStart&&r.domLoading?n.domComplete=r.domComplete-r.domLoading+"ms ("+(r.domContentLoadedEventStart-r.domLoading)+"ms)":n.domComplete=r.domComplete-r.domLoading+"ms"),r.loadEventEnd&&r.loadEventStart&&(n.loadEvent=r.loadEventEnd-r.loadEventStart+"ms"),r.navigationStart&&r.loadEventEnd&&(n["total (DOM)"]=r.loadEventEnd-r.navigationStart+"ms ("+(r.domComplete-r.navigationStart)+"ms)"),e(null,n)},1)}}]),t}(a.a);t.a=s},148:function(e,t){function n(e,t,n,r){return JSON.stringify(e,o(t,r),n)}function o(e,t){var n=[],o=[];return null==t&&(t=function(e,t){return n[0]===t?"[Circular ~]":"[Circular ~."+o.slice(0,n.indexOf(t)).join(".")+"]"}),function(r,i){if(n.length>0){var a=n.indexOf(this);~a?n.splice(a+1):n.push(this),~a?o.splice(a,1/0,r):o.push(r),~n.indexOf(i)&&(i=t.call(this,r,i))}else n.push(i);return null==e?i:e.call(this,r,i)}}t=e.exports=n,t.getSerialize=o}});