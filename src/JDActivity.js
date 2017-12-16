
/**
 * JD 活动API
 */

var $=require('jquery');
function JDActivity(config) {

    this.init(config|{});
}
function getCookie(name) {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return decodeURI(arr[2]);
    else
        return null;
}

JDActivity.prototype.init = function (config) {

};
JDActivity.babelAwardCollection = function (activityId,moduleId,callback,error) {

    let url = 'http://h5.m.jd.com/h5api.jsp';
    let data = {};
    let activity={activityId:activityId,moduleId:moduleId};
    data.functionid = 'babelAwardCollection';
    data.client='wh5'
    data.clientVersion='1.0.0';
    data.body=JSON.stringify(activity);
    data.sid=getCookie('sid')||'3f354432be41f1e805c00c8a10fc2af5';
    $.ajax({
        url:url,
        type:'get',
        data:data,
        dataType: "jsonp",
        jsonpCallback:"getResult",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以不写这个参数，jQuery会自动为你处理数据
        success: callback||function (data) {


        },
        error: error||function(){
        }
    });

    //'http://h5.m.jd.com/h5api.jsp?functionid=babelAwardCollection&client=wh5&clientVersion=1.0.0&body=%7b%22activityId%22:%22TbpTJEmLfV4vTRE9SLU5ojPFvmv%22,
    // %22moduleId%22:%22sKcUvcGnf4kKxruvjDdwAWmCXmM%22%7d&callback=j&sid=6fefc1c334b2c2b525110557e6f09506')
}


window.JDActivity=module.exports = JDActivity;