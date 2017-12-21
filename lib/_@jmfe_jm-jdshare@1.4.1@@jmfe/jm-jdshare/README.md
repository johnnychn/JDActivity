# 无线 jdApp 分享组件使用文档

|  文档版本      |  jdShare版本           | 维护日期          | 维护内容     |   维护人    |
| ------------- |---------------|---------------|-------------|-------------|
|V1.0           |V0.9             | 2016-03-08    | 新建文档     |     曾通    |
|V1.1           |V1.0             | 2016-04-20    | 放到jmfe-package库     |     曾通    |
|V1.2           |V1.3             | 2016-07-15    | 新增二维码分享以及clickcallback方法(客户端5.2版本)     |     蔡森磊    |
|V1.3           |V1.4             | 2016-09-20    | 新增二维码自定义分享以及增加朋友圈字段(客户端5.4版本)    |     蔡森磊    |

## [常见问题说明](WIKI.md)

## 1. 组件概况
#### Why?

京东 App 原生分享组件提供分享调用的协议，但是 Android 与 IOS 之间协议不同，版本之间协议不同，这对分享的使用带来困难。因此，我们希望将接口进行封装，对外提供简洁的调用方法，对App不同版本优雅降级，使 jdApp 分享变得更加简单。

#### What?

jdShare 是一个 javascript 对象，是在 jdApp 原生的分享组件调用协议基础上统一封装而成。

#### Who?

jdShare 由 JMFE(Jingdong Mobile Front End) 团队开发和维护；有问题可以联系咚咚: zengtong。

#### How? 

组件提供三类操作，下发分享设置；呼起分享面板；直接分享到某个渠道，详细说明请见下文。

#### Where?

组件以在 jdApp 环境为主要应用场景，在 jdApp 外使用时，下发分享功能不用，呼起分享面板与直接分享相关功能会降级。


## 2. 组件使用说明
### 2.1 组件引入

- npm命令
```
  npm install @jmfe/jm-jdshare --registry=http://registry.m.jd.com 
```
- 组件没有第三方依赖。
- 支持 AMD，CommonJS，以及常规 script 标签形式引入。
- 组件采用单例模式，如果是 AMD 及 CommonJS 格式引入，则会返回一个 jdShare 实例；如果是 script 标签引入，则会在 window 下注册一个全局对象，可以通过 window.jdShare 访问。

### 2.2 基本概况
1. 组件会自动为分享出去的链接添加时间戳；
2. jdShare 总共提供3个方法，每个方法调用时传入一个对象字面量作为参数；

### 2.3 方法入参

调用 jdShare 的每个函数时，都需要传入配置对象，否则组件会抛出异常；

调用 jdShare 的方法时，传入配置对象格式如下。

**注意url,img字段值请加上http或https头，否则可能会出现错误**
```javascript
    {
        title: '京东无线',
        content: '每日京喜好货，都在京东APP！',
        desc: '每日京喜好货，都在京东APP！',
        url: 'http://m.jd.com/',
        img: 'http://m.360buyimg.com/n1/s120x120_jfs/t2566/341/1119128176/23675/6356333b/568e3d86Naa36a750.jpg',
        channel: '',
        callback: null,  // 不要依赖回调，不要在回调中加入业务逻辑，不要在回调中处理耗时的操作
		clickcallback:null, // 5.2新增 分享面板中点击分享渠道成功后回调 注意 sendDirectShare 不支持这个回调方法
		qrparam:null, // 具体配置详见 5.2新增 二维码分享
		timeline_title:'' // 5.4新增 朋友圈字段 
    }
```
参数说明

* `title` 为分享的标题
* `content` 为分享的内容
* `desc`为内容描述，取`content`字段值
* `url` 为分享出去的链接，组件会将传入的 URL 进行 encode，因此用户只需传入 URL
* `img` 为分享的小图标，组件会将传入的 URL 进行 encode，因此用户只需传入 URL
* `channel` 为分享的渠道
* `timeline_title` 为微信朋友圈字段 

    分享渠道的设置主要用于配置自定义的分享面板，以及直接分享到某个渠道，具体来说取值有以下几类：
    
    1. 为空： 表示不制定分享渠道，则默认显示全部；
    2. 一个渠道：单独分享到某个渠道；
    3. 多个渠道：唤起面板时，面板仅显示设定的渠道；
    4. 5.2新增二维码分享渠道 字段名 QRCode 需要单独配置二维码参数qrparam
    
    每一种情况，对应到3个不同方法时，表现不是一样的，下文会具体讨论；

* `callback` 用户设置回调函数
* `clickcallback` 用户设置回调函数 <font color=darkred >注意 sendDirectShare 不支持这个回调方法</font>

### 2.4 二维码分享配置
```javascript
	{
		...
		channel:"",
		qrparam:{
			top_pic:'',    //频道名
			mid_pic:'',    //大图
			slogan:'',     //口号
			qr_title:'',   //标题
			qr_content:''，//运营语
			qr_direct:''   //5.4新增 自定义二维码图片 
		}
	}
```
开启条件：
1. `qrparam`参数必须配置,否则即使`channel`开启 也无效
2. `channel:""`并且配置了`qrparam`会默认全部开启所有分享渠道
3. 指定渠道需要`channel:"QRCode,..."`并配置`qrparam`参数
4. 设置了`qr_direct`字段，优先级高于任何二维码参数配置，直接生成此字段配置的图片为分享出去的图片，不在重新生成


### 2.5 异常抛出

1. 如果遇到用户配置信息错误等，组件会主动抛出自定义异常；

    ```javascript
    function JdShareException(message) {
            this.message = message;
            this.name = "JdShareException";
            this.toString = function () {
                return this.name + ": " + this.message;
            };
        }
    ```
异常对象包含 message 字段，显示错误消息；name字段，固定为"JdShareException"，以及一个 toString() 方法，返回错误的名字以及错误的消息；

2. 如果在代码执行中，遇到其它异常，组件会将异常原样向外抛出；
3. 建议用户在使用组件时，try catch 处理异常；

### 2.6 回调函数

首先，请注意：
 
_**不要依赖回调，不要在回调中加入业务逻辑，不要在回调中处理耗时的操作，不要在回调中 alert**_

_**IPhone 平台，jdApp 4.4.0， 4.4.1， 4.4.2， 5.0.0 等各个版本，设置回调后，仍然会显示原生的分享结果 Toast，而 Android 平台上的 jdApp，一旦执行了用户设置的回调，则不再显示原生的回调结果 Toast**_

_**在 jdApp 4.4.0 以上版本中，增加了对回调函数的支持，更低版本不支持分享结果回调。**_

是否在分享完成后调用回调函数，需要在传入配置对象的 callback 字段设置，callback 字段取值有2种情况：

1. null：即不需要回调参数
2. 回调函数引用：如果设置了回调函数，即 callback 字段的类型是 function，则会调用此回调函数；
3. 回调函数的格式为：

    ```javascript
    function cb(result) {
        console.log(JSON.stringify(result));        
    }
    ```
    其中，result 参数即分享的结果， result 是一个对象，包含2个字段：

    在 Android 版本 jdApp 中，预期正确返回应该如下：
    ```javascript
    {
        "shareChannel":"",          // 渠道名，字符串
        "shareResult":"2"           // 结果编码，字符串
    }
    ```

    在 IPhone 版本 jdApp 中，预期正确返回应该如下：
    ```javascript
    {
        "shareChannel":"",          // 渠道名，字符串
        "shareResult":2             // 结果编码，数值
    }
    ```

    `shareChannel`  字段指的是分享渠道，

    * 该字段取值在 jdApp5.0 之前情况如下：
        Android 平台：      
        ```javascript
          Wxfriends     // 微信好友
          Wxmoments     // 微信朋友圈
          Sinaweibo     // 新浪微博
          QQfriends     // QQ好友
          QQzone        // QQ空间
        ```

        IPhone 平台
        ```javascript
            weixin     // 微信好友 以及 微信朋友圈
            weibo      // 新浪微博
            qq         // QQ好友
            qzone      // QQ空间
        ```
    
    * 该字段取值在 jdApp5.0 版本：
        Android平台与IPhone平台都统一为：
        ```javascript
        Wxfriends     // 微信好友
        Wxmoments     // 微信朋友圈
        Sinaweibo     // 新浪微博
        QQfriends     // QQ好友
        QQzone        // QQ空间
        ```
        例如，Android 下，表现为：
        
        |  操作         | 返回          |  
        |-------------- |---------------------|
        |分享给微信好友取消| `{"shareChannel":"Wxfriends","shareResult":"2"}`|
        |分享给微信朋友圈取消| `{"shareChannel":"Wxmoments","shareResult":"2"}`|
        |分享给微博取消 |`{"shareChannel":"Sinaweibo","shareResult":"2"}`|
        |分享给QQ好友取消| `{"shareChannel":"QQfriends","shareResult":"2"}`|
        |分享给QQ空间取消| `{"shareChannel":"QQzone","shareResult":"2"}`|
        
        例如，IPhone下，表现为：
        
        |  操作         | 返回          |  
        |-------------- |---------------------|
        |分享给微信好友取消| `{"shareChannel":"Wxfriends","shareResult":2}`|
        |分享给微信朋友圈取消| `{"shareChannel":"Wxmoments","shareResult":2}`|
        |分享给微博取消 |`{"shareChannel":"Sinaweibo","shareResult":2}`|
        |分享给QQ好友取消| `{"shareChannel":"QQfriends","shareResult":2}`|
        |分享给QQ空间取消| `{"shareChannel":"QQzone","shareResult":2}`|
        
        上表列出的都是取消的情况，返回结果代码为2，同理，如果为成功，则代码为0，如果失败，代码为1;
          
    `shareResult`  字段指的是分享结果：
    
    * 在 Android 中，`shareResult`取值是字符串型。
    * 在 IPhone 中，`shareResult`取值是数值型。
    * 取值总共有`0`,`1`,`2` 三种，
        1. `0`,代表分享成功；
        2. `1`,代表分享失败；
        3. `2`,代表分享取消；
    
	<font color=darkred >**clickcallback  回调参数只有一个 "shareChannel"** </font>
    
## 3. 组件方法
jdShare 对象对外暴露3个方法，分别如下：

### 3.1 setShareInfo 方法
作用：下发分享设置
版本：jdApp4.4.0以上版本支持，低于 jdApp4.4.0的部分版本可能支持(具体不详，但 2015年12月25日，Android 平台 V＜4.1，IPhone 平台 V＜4.3 已经强制升级)
jdApp 内表现：预期在屏幕右上角出现分享按钮
jdApp 外表现：该功能不可用；执行该函数没有反应

使用示例：
```javascript
    jdShare.setShareInfo({
        title: '京东超市，天天低价抢购！',
        content: '每日京喜好货，都在京东超市天天抢购！早市、午市、晚市，三个时段，不让品质低价偷偷溜走！',
        url: 'http://h5.m.jd.com/active/rushbuying/index.html',
        img: 'http://m.360buyimg.com/n1/s120x120_jfs/t2566/341/1119128176/23675/6356333b/568e3d86Naa36a750.jpg',
        channel: 'Wxfriends,Wxmoments,Sinaweibo',
        callback: null,  // 不要依赖回调，不要在回调中加入业务逻辑，不要在回调中处理耗时的操作,
		clickcallback:null, // 5.2新增 分享面板中点击分享渠道成功后回调 注意 sendDirectShare 不支持这个回调方法
        qrparam:null， // 具体配置详见 5.2新增 二维码分享 
		timeline_title:'' // 5.4新增 朋友圈字段
    });   
```

1. 每次调用时都要传入配置对象。

2. Android 平台 

  
|  功能         | < jdApp5.0          |  =jdApp5.0     |
|-------------- |---------------------|----------------|
|调用该函数后是否会显示分享按钮|   显示   | 显示     |
|回调函数配置是否可用| 可用（设置了 callback 函数，则带回调，如果再次调用时 设置 callback 为 null，则能够关闭回调）   |  可用（设置了 callback 函数，则带回调，如果再次调用时 设置 callback 为null，则能够关闭回调）    |
|能否设置指定channel| 不能（如果设置了会被忽略，会弹出默认的分享面板，即分享面板显示出全部项目；）    |  能（如果设置了，则弹出的分享面板中仅出现配置好的分享渠道）    |
    
3. IPhone 平台


|  功能         | < jdApp5.0          |  =jdApp5.0     |
|-------------- |---------------------|----------------|
|调用该函数后是否会显示分享按钮| 不显示（图标是否显示由 CMS 平台配置）    | 显示     |
|回调函数配置是否可用| 第一次下发的信息是能够生效的，但是一旦配置 callback 后，就无法关闭回调    |   第一次下发的信息是能够生效的，但是一旦配置 callback 后，就无法关闭回调     |
|能否设置指定channel| 不能    |  能    |
    

### 3.2 callSharePane 方法
作用：唤起分享面板
版本：

* jdApp 5.0 支持唤起自定义面板
* jdApp 4.4.0 加入唤起分享面板方法
* jdApp 4.4.0 之前的某些版本 (具体不详，但 2015年12月25日，Android 平台 V＜4.1，IPhone 平台 V＜4.3 已经强制升级)，能够唤起默认分享面板
      
表现：出现自定义配置的分享面板 / 或者唤起默认分享面板

使用示例：
```javascript
    jdShare.callSharePane({
        title: '京东超市，天天低价抢购！',
        content: '每日京喜好货，都在京东超市天天抢购！早市、午市、晚市，三个时段，不让品质低价偷偷溜走！',
        url: 'http://h5.m.jd.com/active/rushbuying/index.html',
        img: 'http://m.360buyimg.com/n1/s120x120_jfs/t2566/341/1119128176/23675/6356333b/568e3d86Naa36a750.jpg',
        channel: 'Wxfriends,Wxmoments,Sinaweibo',
        callback: null,  // 不要依赖回调，不要在回调中加入业务逻辑，不要在回调中处理耗时的操作
		clickcallback:null, // 5.2新增 分享面板中点击分享渠道成功后回调 注意 sendDirectShare 不支持这个回调方法
		qrparam:null, // 具体配置详见 5.2新增 二维码分享 
		timeline_title:'' // 5.4新增 朋友圈字段
    });
   
```

* 每次调用时都要传入配置对象。

* jdApp5.0 版本才能设置自定义的 channel，即：传入用逗号分隔的多个渠道名，Android 与 IPhone 平台都支持；
在 jdApp4.4.0 版本之后，才有唤起分享面板功能，jdApp4.4.0 至 jdApp5.0.0 版本都是会忽略 channel 值的设置，显示默认分享面板，即显示所有分享渠道；

* callback 设置在 IPhone 平台下 jdApp4.4.0 至 jdApp5.0.0 版本，都存在 bug，即：如果曾经设置过 callback，在这里再设置 `callback:null`, 并不能生效，具体请见文档 “Iphone 平台中， 分享的已知bug” 这节。


### 3.3 sendDirectShare 方法
作用：直接分享到某个渠道
版本：jdApp4.4.0以上版本支持，低于 jdApp4.4.0的部分版本可能支持(具体不详，但 2015年12月25日，Android 平台 V＜4.1，IPhone 平台 V＜4.3 已经强制升级)
表现：直接唤起相应渠道APP的分享设置界面
使用示例：

```javascript
    jdShare.sendDirectShare({
        title: '京东超市，天天低价抢购！',
        content: '每日京喜好货，都在京东超市天天抢购！早市、午市、晚市，三个时段，不让品质低价偷偷溜走！',
        url: 'http://h5.m.jd.com/active/rushbuying/index.html',
        img: 'http://m.360buyimg.com/n1/s120x120_jfs/t2566/341/1119128176/23675/6356333b/568e3d86Naa36a750.jpg',
        channel: Sinaweibo,
        callback: null,  // 不要依赖回调，不要在回调中加入业务逻辑，不要在回调中处理耗时的操作
		qrparam:null, // 具体配置详见 5.2新增 二维码分享 
		timeline_title:'' // 5.4新增 朋友圈字段
    });
   
```

* 每次调用时都要传入配置对象。

* 配置对象中，channel 字段可指定一个直接分享的渠道，此字段设置在 Android 平台与 IPhone 平台， jdApp4.4.0 至 jdApp5.0.0 版本中，都有效；如果 channel 字段为空 `""`,或者未定义的其他值，App 不做相应；

* callback 设置在 IPhone 平台下 jdApp4.4.0 至 jdApp5.0.0 版本，都存在 bug，即：如果曾经设置过 callback，在这里再设置 `callback:null`, 并不能生效，具体请见文档 “Iphone 平台中， 分享的已知bug” 这节。

## 4. Andriod 平台，分享已知bug
### 唤起分享面板或直接分享后，右上角会出现分享按钮
callSharePane，或者sendDirectShare 方法执行后，webview 右上角会出现分享按钮；
jdApp 5.0 版本之前存在此 bug， jdApp 5.0 版本已经修复；


## 5. Iphone 平台中， 分享的已知bug

### 执行用户自定义回调后，扔显示分享结果Toast
设置回调后，用户分享完，仍然会显示原生的分享结果 Toast，即“分享成功”，“分享失败”，“分享取消”等提示。
经测试，IPhone平台，jdApp 4.4.0， 4.4.1， 4.4.2， 5.0.0 等各个版本，都存在此 bug

### setShareInfo 功能面板中的按钮不支持定制

### 回调设置是否能够成功

1. 下发分享设置（带回调）-> 下发分享设置（不带回调），此时不带回调的设置不会起作用；
2. 下发分享设置（带回调）-> 呼出分享弹框(不带回调)，此时不带回调的设置不会生效，仍然会执行回调；
3. 下发分享设置（带回调）-> 设置直接分享(不带回调)，此时不带回调的设置不会生效，仍然会执行回调；
4. 下发分享设置（带回调）-> 下发分享设置（不带回调）-> 呼出分享弹框(不带回调)，此时不带回调的设置不会生效，仍然会执行回调；
5. 下发分享设置（带回调）-> 下发分享设置（不带回调）-> 设置直接分享(不带回调)，此时不带回调的设置不会生效，仍然会执行回调；
6. 呼出分享弹框（带回调）-> 呼出分享弹框（不带回调），此时不带回调设置不会生效，仍然会执行回调；
7. 呼出分享弹框（带回调）-> 直接分享（不带回调），此时不带回调设置不会生效，仍然会执行回调；
8. 直接分享出去（带回调）-> 直接分享出去（不带回调），此时不带回调设置不会生效，仍然会执行回调；
9. 直接分享出去（带回调）-> 呼出分享弹框（不带回调），此时不带回调设置不会生效，仍然会执行回调；

> 经测试：
App版本为`jdApp4.4.0`， `jdApp4.4.1`， `jdApp4.4.2`， `jdApp4.4.5`，`jdApp5.0.0` 都存在上述Bug
总结：只要在 `setShareInfo`，`callSharePane`，`sendDirectShare` 等任何一个函数中，曾经下设置过回调，后面的所有不带回调的操作都会失败，仍然会执行回调；

### 回调执行后的返回内容
1. jdApp 4.4.0，传给回调函数的 result 对象，输出如下：

    |  操作         | 返回          |  
    |-------------- |---------------------|
    |分享成功 |`{"shareChannel":0,"shareResult":"weixin"}`|
    |分享取消| `{"shareChannel":2,"shareResult":"weixin"}`|
    |分享到微博取消，渠道会显示微信 |`{"shareChannel":2,"shareResult":"weixin"}`|
    |分享到qq取消 | `{"shareChannel":2,"shareResult":"qq"}`|
    |分享到qq空间取消|  `{"shareChannel":2,"shareResult":"qzone"}`|    
    
> 即：
shareChannel 与 shareResult 反了；
weibo 的渠道会显示 weixin；
    
    

2. `jdApp 4.4.1`，`jdApp 4.4.2`，`jdApp 4.4.5`，传给回调函数的 result 对象，输出如下：

    |  操作         | 返回          |  
    |-------------- |---------------------|
    |分享微信好友成功| `{"shareChannel":"weixin","shareResult":0}`|
    |分享微信好友取消 |`{"shareChannel":"weixin","shareResult":2}`|
    |分享微信朋友圈成功| `{"shareChannel":"weixin","shareResult":0}`|
    |分享微信朋友圈取消| `{"shareChannel":"weixin","shareResult":2}`|
    |分享微博取消| `{"shareChannel":"weibo","shareResult":2}`|
    |分享QQ好友取消 |`{"shareChannel":"qq","shareResult":2}`|
    |分享QQ好友成功| `{"shareChannel":"qq","shareResult":0}`|
    |分享QQ空间取消| `{"shareChannel":"qzone","shareResult":2}`|
    |分享QQ空间成功 |`{"shareChannel":"qzone","shareResult":0}`|
    
> 即：
区分不了微信好友与微信朋友圈，返回值都是 weixin

### 分享取消后，toast 的图标是 √
分享取消后，toast的图标应该为感叹号或者X 等符号；

### setShareInfo 右上角的分享按钮不支持配置分享渠道 

### 三级页面上配置的分享信息会覆盖二级页面
待验证；
