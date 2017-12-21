V1.2
   date: 2016-04-26
   changes: 将协议封装进函数，大幅减少代码行数;
            增加XView内分享支持

V1.1
   date: 2016-04-25
   changes: 增加 ipad 支持

V1.0
   date: 2016-04-20
   changes: "channel"与"callback" 为选填，不填的话默认值分别为 "",null

V0.9
  date: 2016-03-18
  changes:重构代码；1. 删除config函数，不做统一的配置，改为每个方法调用时都要传入配置参数，让用户更知道协议细节；2. 兼容jdApp5.0版本新分享协议，将原来的3个单独动作整合到一个统一整体；TODO: eventId 参数目前仅 Android平台 jdApp5.0.0 版本支持，暂时不加入

V0.8.1
  date: 2016-03-03
  changes:移动 this.options对象到 jdShare构造函数内部。

V0.8
   date: 2016-01-10
   changes:分享出去默认带时间戳

V0.7
  date: 2015-12-31
  changes:每个函数调用时可传入对象作为参数，进行配置；同时兼容0.2版的是否需要回调用法；

V0.6.1
  date: 2015-12-28
  changes:getOS() 函数只运行一次；

V0.6
   date: 2015-10-23
   changes:新增建立对象后再次配置文案， 优化jdShare调用方式

V0.5
   date: 2015-10-22
   changes: 改为单例模式

V0.4
   date: 2015-10-21
   changes:回调函数中由于 IOS与Android 不统一，以及 IOS bug，需要再次兼容；改将回调函数传入初始化方法中；

V0.3
   date: 2015-10-20
   changes:对 URL 进行 encodeURIComponent()

V0.2
   date: 2015-10-10
   changes:对每一个方法增加单独控制是否需要回调

V0.1
  date: 2015-10-8
  changes:初始版本 对 Android 与 IOS 分享功能进行封装，兼容不同系统，对App不同版本优雅降级，尽最大努力使分享容易使用




















