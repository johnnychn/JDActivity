# 京东无线专用 在微信webview内设置分享的组件
> 用于基于以下域名的页面：*.jd.com 域名的页面, 猜测微信为京东的域名开了白名单，所以不需要额外的jsApi授权

## Usage

```js
share.init({
  img: 'http://h5.m.jd.com/active/qianggou/img/share-icon.jpg',
  url: location.href,
  desc: '12.12给力商品提前泄露，简直丧心病狂！毛衣只卖12元，更有爆品降1000元！',
  title: '爆品抢先预定  价格最高减1000元',
  timeline_title: "朋友圈文案"
});
```