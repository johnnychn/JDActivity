!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.JDActivity=e():t.JDActivity=e()}(this,function(){return function(t){function e(n){if(o[n])return o[n].exports;var i=o[n]={exports:{},id:n,loaded:!1};return t[n].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var o={};return e.m=t,e.c=o,e.p="/dist/",e(0)}([function(t,e,o){var n,i,r;!function(c,u){i=[t,o(1),!function(){var t=new Error('Cannot find module "jquery"');throw t.code="MODULE_NOT_FOUND",t}()],n=u,r="function"==typeof n?n.apply(e,i):n,!(void 0!==r&&(t.exports=r))}(this,function(t,e,o){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t){}function r(t){var e=void 0,o=new RegExp("(^| )"+t+"=([^;]*)(;|$)");return(e=document.cookie.match(o))?decodeURI(e[2]):null}var c=n(e);i.babelAwardCollection=function(t,e,n,i){var u="http://h5.m.jd.com/h5api.jsp",f={},d={activityId:t,moduleId:e};f.functionid="babelAwardCollection",f.client="wh5",f.clientVersion="1.0.0",f.body=(0,c.default)(d),f.sid=r("sid")||"3f354432be41f1e805c00c8a10fc2af5",o.ajax({url:u,type:"get",data:f,dataType:"jsonp",jsonpCallback:"getResult",success:n||function(t){},error:i||function(){}})},window.JDActivity=t.exports=i})},function(t,e,o){t.exports={default:o(2),__esModule:!0}},function(t,e,o){var n=o(3),i=n.JSON||(n.JSON={stringify:JSON.stringify});t.exports=function(t){return i.stringify.apply(i,arguments)}},function(t,e){var o=t.exports={version:"2.5.3"};"number"==typeof __e&&(__e=o)}])});
//# sourceMappingURL=jd_activity.js.map