"no use strict";function initBaseUrls(e){require.tlns=e}function initSender(){var e=require(null,"ace/lib/event_emitter").EventEmitter,t=require(null,"ace/lib/oop"),n=function(){};return function(){t.implement(this,e),this.callback=function(e,t){postMessage({type:"call",id:t,data:e})},this.emit=function(e,t){postMessage({type:"event",name:e,data:t})}}.call(n.prototype),new n}var console={log:function(e){postMessage({type:"log",data:e})}},window={console:console},normalizeModule=function(e,t){if(t.indexOf("!")!==-1){var n=t.split("!");return normalizeModule(e,n[0])+"!"+normalizeModule(e,n[1])}if(t.charAt(0)=="."){var r=e.split("/").slice(0,-1).join("/"),t=r+"/"+t;while(t.indexOf(".")!==-1&&i!=t)var i=t,t=t.replace(/\/\.\//,"/").replace(/[^\/]+\/\.\.\//,"")}return t},require=function(e,t){var t=normalizeModule(e,t),n=require.modules[t];if(n)return n.initialized||(n.exports=n.factory().exports,n.initialized=!0),n.exports;var r=t.split("/");r[0]=require.tlns[r[0]]||r[0];var i=r.join("/")+".js";return require.id=t,importScripts(i),require(e,t)};require.modules={},require.tlns={};var define=function(e,t,n){arguments.length==2?n=t:arguments.length==1&&(n=e,e=require.id);if(e.indexOf("text!")===0)return;var r=function(t,n){return require(e,t,n)};require.modules[e]={factory:function(){var e={exports:{}},t=n(r,e.exports,e);return t&&(e.exports=t),e}}},main,sender;onmessage=function(e){var t=e.data;if(t.command)main[t.command].apply(main,t.args);else if(t.init){initBaseUrls(t.tlns),require(null,"ace/lib/fixoldbrowsers"),sender=initSender();var n=require(null,t.module)[t.classname];main=new n(sender)}else t.event&&sender&&sender._emit(t.event,t.data)};