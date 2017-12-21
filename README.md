### Dependencies

jquery 1.0+


### 用法
```javascript
var jda=new JDActivity();
var drawData = {
        activityId: activityID,//项目ID
        key: '9a8d48a8e0fb4759a16773eae6c208c0', //券Key
        roleId: '9381670',//券roleId
        to: '//h5.m.jd.com/dev/TbpTJEmLfV4vTRE9SLU5ojPFvmv/index.html' //项目地址
            };
jda.newBabelAwardCollection(drawData, callback);



 //设置微信分享，在 *.jd.com 域名下可用 素材要都用 https:// 谢谢

    jda.wechatShareInit({
        img: 'https://h5.m.jd.com/dev/TbpTJEmLfV4vTRE9SLU5ojPFvmv/pages/211711/img/share.jpg',
        url: 'https://h5.m.jd.com/dev/TbpTJEmLfV4vTRE9SLU5ojPFvmv/index.html',
        desc: '神秘吃鸡补给箱已落地，内有惊喜，等你开启！',
        title: '注意，前方空投补给箱！'
    });

    $('#share_btn').click(function () {
        var $this = $(this);
        var channels = $this.attr('channels');
        jda.msgCallPopShare({
                title: '注意，前方空投补给箱！',
                content: '神秘吃鸡补给箱已落地，内有惊喜，等你开启！',
                url: 'https://h5.m.jd.com/dev/TbpTJEmLfV4vTRE9SLU5ojPFvmv/index.html',
                img: 'https://h5.m.jd.com/dev/TbpTJEmLfV4vTRE9SLU5ojPFvmv/pages/211711/img/share.jpg',
                channel: 'Wxfriends,Wxmoments,Sinaweibo',
            }
        );
    })


``` 
### Methods


<table>
<tr>
<td>名称</td><td>参数 </td><td>说明</td>
</tr>
<tr>
<td>new JDActivity()</td><td> </td><td></td>
</tr>
<tr>
<td>newBabelAwardCollection(drawData,callback,error)</td>
<td>
drawData:Object 奖券信息 <br/>
drawData.activityId 活动ID <br/>
drawData.key 券key <br/>
drawData.roleId 券roleId <br/>
drawData.to 页面地址 协议 // <br/>
callback:function 回调函数<br/>
error:function 错误回调函数</td>
<td>领取奖品接口 </td>
</tr>
</table>


### 错误代码 code
    接口调用是否成功
    -1：后台处理异常
    0：成功
    1：失败
    3: 未登录

    subCode
    A1：领取成功
    其他：失败 subCodeMsg 失败原因