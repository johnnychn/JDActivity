### Dependencies

jquery 1.0+


### 用法
```javascript
var jda=new JDActivity('3f354432be41f1e805c00c8a10fc2af5');
jda.babelAwardCollection(activityID,moduleId,callback,error)
``` 
### Methods


<table>
<tr>
<td>名称</td><td>参数 </td><td>说明</td>
</tr>
<tr>
<td>JDActivity</td><td>sid </td><td>默认sid，优先读取cookie中的值</td>
</tr>
<tr>
<td>babelAwardCollection(activityID,moduleId,callback,error)</td>
<td>
activityID:String 活动ID <br/>
moduleId:string 组件ID <br/>
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

    0：处理成功
    1-1:活动未开始
    1-2:活动已结束
    1-3：活动已下线
    1-4:活动id有误
    1-5:组件id有误
    3-1:用户等级不符合
    3-2:用户风险等级不符合
    4-3:当天可领次数不足
    4-2:总可领次数不足
    5-1:无可领取奖品
    5-2:总库存不足
    5-3:当前时间库存不足
    6-1:发送频率限制次数不足
    7-1:上游发券接口发券失败，或领券接口降级开关打开+发券太频繁