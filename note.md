### table 表嵌套select 下拉选择值，后面的值跟着变动，变量的作用范围有问题，不能是全局，要只在那行起作用才行，如何改？
## 一共多少联系人联系地址在添加的时候可以加一个小标签、

#10.14探讨后需要修改的
##1、~~隐藏侧边栏客户详情~~、客户详情返回按钮、客户详情页点击内容的复制、查询时，点击回车就可以查询
##2、数据库的修改，将district1字段理解为省市区的区，后面加一个详细位置，比如湖北省武汉市汉阳区拦江堤中学，前段输入地址改为使用插件，国家用下拉选择，默认为中国
##3、批量删除时加一个提示，提示此操作将删除多个联系人，注意此操作有风险
##4、删除数据时，不是真的删除那些数据，而是在数据库修改字段。01表示是否存在
##5、增加企业、还是个人，个人的话只有一个联系人和联系地址，企业有多个联系人和联系地址，这里企业和个人用01表示，默认联系人设置时用v-show或者v-if做判断
##6、查询功能多加几个可以查询的值，比如省市区的查询，可能会用到外连接内连接索引什么的
##7、各个提示小时的完善，有些提示不正确
##8、~~输入回车、出发事件@keyup.enter.native = 'search'`~~
##9、客户详情页只显示客户信息，点击编辑按钮才会编辑客户信息，这里应该也是用v-if?

#问题
##1、编写前段代码的屏幕越小，兼容就越好？在我的显示器上编写的格式没什么问题，但是放到笔记本上，格式完全不对，但在笔记本上编写的前段代码放在显示器上没什么问题
##2、客户分为企业和个人，应该是还是用v-if吧