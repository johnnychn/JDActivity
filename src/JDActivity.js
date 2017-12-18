
/**
 * JD 活动API
 */

let $=window.jQuery;
if(!$){
    console.log('JDActivity require jquery')
}
let JDActivity=function (config) {
    this.config=config||{};
}
JDActivity.prototype.getCookie=function(name) {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return decodeURI(arr[2]);
    else
        return null;
}
JDActivity.prototype.babelAwardCollection = function (activityId,moduleId,callback,error) {

    let url = '//h5.m.jd.com/h5api.jsp';
    let data = {};
    let activity={activityId:activityId,moduleId:moduleId};
    data.functionid = 'babelAwardCollection';
    data.client='wh5'
    data.clientVersion='1.0.0';
    data.body=JSON.stringify(activity);
    data.sid=this.getCookie('sid')||this.sid;
    if(!data.sid){
        console.log('>>无法读取cookie中的sid,测试请填写测试sid')
    }

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
};



JDActivity.prototype.newBabelAwardCollection=function (award,callback,error) {
    $.ajax({
        url: '//api.m.jd.com/client.action',
        dataType: 'jsonp',
        jsonpCallback:"drawCallback",
        data: {
            functionId: 'newBabelAwardCollection',
            client: 'wh5',
            clientVersion: '1.0.0',
            'sid': this.getCookie('sid')||this.config.sid,
            'uuid': this.getCookie('uuid')||this.config.uuid,

            body: JSON.stringify({
                'activityId': award.activityId,
                'scene': '1',
                'args': 'key=' + award.key + ',roleId=' + award.roleId + ',to=' + award.to
            })
        },
        success:callback||function (data) {},
        error: error||function(){}
    })
}


window.JDActivity=module.exports = JDActivity;