/**
 * Created by Tong Zeng on 2015/10/10.
 *
 * V 0.1 初始版本 对 Android 与 IOS 分享功能进行封装，兼容不同系统，对App不同版本优雅降级，尽最大努力使分享容易使用     2015-10-8
 *
 * V 0.2 对每一个方法增加单独控制是否需要回调   2015-10-10
 *
 * V 0.3 对 URL 进行 encodeURIComponent()   2015-10-20
 *
 * V 0.4 回调函数中由于 IOS与Android 不统一，以及 IOS bug，需要再次兼容；改将回调函数传入初始化方法中； 2015-10-21
 *
 * V 0.5 改为单例模式   2015-10-22
 *
 * V 0.6 新增建立对象后再次配置文案， 优化jdShare调用方式     2015-10-23
 *
 */


;
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return factory(global);
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(global);
    } else {
        global.jdShare = factory(global);
    }
}(typeof window !== 'undefined' ? window : this, function (window) {
    'use strict';

    var INSTANCE;

    function getOS() {
        var device = '';
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf('iphone') != -1) {
            device = 'iphone';
        } else if (ua.indexOf('android') != -1) {
            device = 'android';
        } else if (ua.indexOf('ipad') != -1) {
            device = 'ipad';
        }
        return device;
    }

    function jdShare(options) {

        if (!(this instanceof jdShare)) {
            return new jdShare(options);
        }
        this.config(options);
    }

    jdShare.prototype.config = function (options) {
        this.options = {
            title: 'M页分享默认标题',
            description: '这是M页分享默认描述内容...',
            url: 'http://m.jd.com/?source=aaa&value=222',
            img: 'http://jcode.jd.com/misc/skin/2015/i/shareicon.png',
            channel: 'Wxfriends',
            callback: null  // 不要依赖回调，不要在回调中加入业务逻辑，不要在回调中处理耗时的操作
        };
        if (typeof options === 'object') {
            for (var i in options) {
                if (options.hasOwnProperty(i)) {
                    this.options[i] = options[i];
                }
            }
        }

        // 保存是否有回调函数
        this.isCallbackAvailable = (typeof this.options.callback === 'function')
        if (this.isCallbackAvailable) {
            var that = this;
            window.jdappShareRes = function (result) {
                var temp;
                // IOS 在 4.4 最初实现回调的时候，就把 shareChannel 与 shareResult 弄反了，并且 shareChannel 是数值
                // 此 bug 在 4.4.1 版本中会被修复，以与 andriod 版本保持统一
                if (result.shareChannel && typeof result.shareChannel === 'number') {
                    temp = result.shareChannel;
                    result.shareChannel = (result.shareResult).toString();
                    result.shareResult = temp;
                }
                that.options.callback(result);
            }
        }

        if (getOS() === 'iphone') {
            var androidShareChannel2IPhoneMap = {
                Wxfriends: "WeChat_Friend",
                Wxmoments: "WeChat_FriendTimeline",
                Sinaweibo: "Weibo",
                QQfriends: "QQFriend_SHARE_CLIENT",
                QQzone: "QQZone_SHARE_CLIENT",
                Moreshare: ""
            };
            this.options.channel = androidShareChannel2IPhoneMap[this.options.channel];
        }
        this.options.url = encodeURIComponent(this.options.url);
        this.options.img = encodeURIComponent(this.options.img);

        var ua = navigator.userAgent.toLowerCase();
        this.runtimeEnv = (function () {
            var env = '';
            if (/jdapp/i.test(ua)) {
                env = 'jdapp';
            } else if (/MicroMessenger/i.test(ua)) {
                env = 'wechat';
            }
            return env;
        }());
    }


    /**
     * 计算是否需要回调
     * @param {boolean} funcCallbackSwitch 函数是否需要回调
     * @returns {boolean} 计算后的值，需要回调则传回 true，不需要则传回 false
     */
    jdShare.prototype.callbackCalc = function (funcCallbackSwitch) {
        var totalCallbackSwitch;
        if (this.isCallbackAvailable) {
            if (funcCallbackSwitch != undefined && typeof funcCallbackSwitch === "boolean") {
                totalCallbackSwitch = funcCallbackSwitch;
            } else {
                totalCallbackSwitch = this.isCallbackAvailable;
            }
        } else {
            totalCallbackSwitch = false;
        }
        return totalCallbackSwitch;
    }

    if (getOS() === "android") {
        //需要回调`
        jdShare.prototype.callSharePane = function (funcCallbackSwitch) {
            var link;
            var totalCallbackSwitch = this.callbackCalc(funcCallbackSwitch);
            if (this.runtimeEnv == "jdapp") {

                //如果存在 callShare,那么看它是否需要回调，否则使用 openApp 协议，不支持回调
                if (typeof shareHelper.callShare === "function") {
                    //最后一个参数是 jdAppV4.4才新增的，老版本的jdApp不能识别，则会直接忽略掉此参数
                    shareHelper.callShare(
                        this.options.title,
                        this.options.description,
                        decodeURIComponent(this.options.url),
                        decodeURIComponent(this.options.img),
                        (totalCallbackSwitch) ? "Y" : "N"
                    );
                } else {
                    //使用 openApp 协议，不支持回调
                    link = 'openApp.jdmobile://communication?params={' +
                        '"des":"share",' +
                        '"type":"111",' +
                        '"title":"' + this.options.title + '",' +
                        '"content":"' + this.options.description + '",' +
                        '"shareUrl":"' + this.options.url + '",' +
                        '"iconUrl":"' + this.options.img + '",' +
                        '"channel":""' +
                        '}';
                    window.location.href = link;
                }
            } else {
                //使用 openApp 协议，不支持回调
                link = 'openApp.jdmobile://communication?params={' +
                    '"des":"share",' +
                    '"type":"111",' +
                    '"title":"' + this.options.title + '",' +
                    '"content":"' + this.options.description + '",' +
                    '"shareUrl":"' + this.options.url + '",' +
                    '"iconUrl":"' + this.options.img + '",' +
                    '"channel":""' +
                    '}';
                window.location.href = link;
            }
        }


        jdShare.prototype.setShareInfo = function (funcCallbackSwitch) {
            // 只能在jdApp内执行，其他环境不进行任何操作
            var totalCallbackSwitch = this.callbackCalc(funcCallbackSwitch);
            if (this.runtimeEnv == "jdapp") {

                //如果存在 setShareInfoCallback 函数，则使用，否则降级使用 setShareInfo
                if (typeof shareHelper.setShareInfoCallback === 'function') {
                    if (totalCallbackSwitch) {
                        try {
                            //根据needCallBack 以及 window.jdappShareRes 函数，决定是否需要回调；
                            //jdApp V4.4版本通过开关控制
                            //jdApp V4.4之前，setShareInfoCallback 会忽略 "Y/N" 参数，默认就是添加回调的
                            shareHelper.setShareInfoCallback(
                                this.options.title,
                                this.options.description,
                                decodeURIComponent(this.options.url),
                                decodeURIComponent(this.options.img),
                                "Y"
                            );
                        } catch (e) {
                            //jdApp V4.4 之前版本，如果已经有setShareInfoCallback函数，但参数是4个的话，上面代码会出错
                            shareHelper.setShareInfoCallback(
                                this.options.title,
                                this.options.description,
                                decodeURIComponent(this.options.url),
                                decodeURIComponent(this.options.img)
                                //根据needCallBack 以及 window.jdappShareRes 函数，决定是否需要回调；
                                //jdApp V4.4版本通过开关控制
                                //jdApp V4.4之前，setShareInfoCallback 会忽略 "Y/N" 参数，默认就是添加回调的
                            );
                        }
                    } else {
                        try {
                            // 关掉
                            shareHelper.setShareInfoCallback(
                                this.options.title,
                                this.options.description,
                                decodeURIComponent(this.options.url),
                                decodeURIComponent(this.options.img),
                                "N"
                            );
                        } catch (e) {
                            if (typeof shareHelper.setShareInfo === 'function') {
                                shareHelper.setShareInfo(
                                    this.options.title,
                                    this.options.description,
                                    decodeURIComponent(this.options.url),
                                    decodeURIComponent(this.options.img)
                                );
                            }
                        }
                    }
                    //如果不存在setShareInfoCallback，则调用setShareInfo，其能否回调实现是不确定的，依赖于CMS配置等，Android客户端那边有个回调全局开关，如果开关被别的配置或者代码打开了，那么就有回调，否则就没有回调。
                } else if (typeof shareHelper.setShareInfo === 'function') {
                    shareHelper.setShareInfo(
                        this.options.title,
                        this.options.description,
                        decodeURIComponent(this.options.url),
                        decodeURIComponent(this.options.img)
                    );
                }
            }
        }


        jdShare.prototype.sendDirectShare = function (funcCallbackSwitch) {
            var link;
            //京东App内才支持回调，否则不支持
            var totalCallbackSwitch = this.callbackCalc(funcCallbackSwitch);
            if (this.runtimeEnv == "jdapp") {
                // 如果有 sendShare则调用，否则使用 openApp 协议
                if (typeof shareHelper.sendShare === "function") {
                    shareHelper.sendShare(
                        this.options.title,
                        this.options.description,
                        decodeURIComponent(this.options.url),
                        decodeURIComponent(this.options.img),
                        this.options.channel,
                        (totalCallbackSwitch) ? "Y" : "N"
                    );

                } else {
                    //使用 openApp 协议, jdApp V4.4支持，更老版本会忽略此参数 channel 参数，弹出分享面板，保证至少能用
                    link = 'openApp.jdmobile://communication?params={' +
                        '"des":"share",' +
                        '"type":"111",' +
                        '"title":"' + this.options.title + '",' +
                        '"content":"' + this.options.description + '",' +
                        '"shareUrl":"' + this.options.url + '",' +
                        '"iconUrl":"' + this.options.img + '",' +
                        '"channel":"' + this.options.channel + '"' +
                        '}';
                    window.location.href = link;
                }
            } else {
                //使用 openApp 协议, jdApp V4.4支持，更老版本会忽略此参数 channel 参数，弹出分享面板，保证至少能用
                link = 'openApp.jdmobile://communication?params={' +
                    '"des":"share",' +
                    '"type":"111",' +
                    '"title":"' + this.options.title + '",' +
                    '"content":"' + this.options.description + '",' +
                    '"shareUrl":"' + this.options.url + '",' +
                    '"iconUrl":"' + this.options.img + '",' +
                    '"channel":"' + this.options.channel + '"' +
                    '}';
                window.location.href = link;
            }
        }

    } else if (getOS() === "iphone") {
        jdShare.prototype.callSharePane = function (funcCallbackSwitch) {
            var link;
            // IOS仅在 jdApp中支持唤起弹框，其它环境不做任何操作
            var totalCallbackSwitch = this.callbackCalc(funcCallbackSwitch);
            var iosIsCallback = (totalCallbackSwitch) ? "Y" : "N";
            link = 'openApp.jdmobile://communication?params={' +
                '"action":"share",' +
                '"title":"' + this.options.title + '",' +
                '"content":"' + this.options.description + '",' +
                '"shareUrl":"' + this.options.url + '",' +
                '"iconUrl":"' + this.options.img + '",' +
                '"isCallBack":"' + iosIsCallback + '"' +
                '}';
            location.href = link;
        }

        jdShare.prototype.setShareInfo = function (funcCallbackSwitch) {
            var link;
            // IOS仅在 jdApp中支持设置分享内容，其它环境不做任何操作
            var totalCallbackSwitch = this.callbackCalc(funcCallbackSwitch);
            var iosIsCallback = (totalCallbackSwitch) ? "Y" : "N";
            if (this.runtimeEnv === "jdapp") {
                link = 'openapp.jdmobile://communication?params={' +
                    '"action":"syncShareData",' +
                    '"title":"' + this.options.title + '",' +
                    '"content":"' + this.options.description + '",' +
                    '"shareUrl":"' + this.options.url + '",' +
                    '"iconUrl":"' + this.options.img + '",' +
                    '"isCallBack":"' + iosIsCallback + '"' +
                    '}';
                location.href = link;
            }
        }

        jdShare.prototype.sendDirectShare = function (funcCallbackSwitch) {
            var link;
            var totalCallbackSwitch = this.callbackCalc(funcCallbackSwitch);
            var iosIsCallback = (totalCallbackSwitch) ? "Y" : "N";
            // 如果 channel 不为空
            if (this.options.channel) {
                link = 'openApp.jdmobile://virtual?params={' +
                    '"category":"jump",' +
                    '"des":"share",' +
                    '"type":"111",' +
                    '"title":"' + this.options.title + '",' +
                    '"content":"' + this.options.description + '",' +
                    '"shareUrl":"' + this.options.url + '",' +
                    '"imageUrl":"' + this.options.img + '",' +
                    '"channel":"' + this.options.channel + '",' +
                    '"isCallBack":"' + iosIsCallback + '"' +
                    '}';
                location.href = link;
            }
        }
    }

    if (!INSTANCE) {
		return INSTANCE = jdShare();
    } else {
        return INSTANCE;
    }

}))
;
