# Smart



#Css
#Methods

| 名称                            |参数                                |说明                           |
| ------------------------------ | --------------------------------- | -------------------------------- |
| createCssString(cssString)     |cssString:String                   | 把css字符串写入文档                      |
| createCssStyle(mark, obj)|mark:String,obj:Object,ext:String  | 用obj创建与mark关联的css对象,并写入文档|
| createSmartCssStyle(mark, obj, ext)            |mark:String,obj:Object,ext:String  | 用smartobj创建与mark关联的css对象,并写入文档|
| smartObject(obj,ext)           |obj:Object,ext:String              | 用obj创建css对象,可以使用CssBuilder.css或jquery的 $.css() 添加到dom            |
| css(el, styles)                |el:String ,styles:Object           | 向el写入css样式,如果属性值非法,则删除|
| smartCss(el, obj,ext)    |el:String ,obj:Object,ext:String   | 向el写入通过obj创建的css样式|
