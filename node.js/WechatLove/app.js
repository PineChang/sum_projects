var Koa = require('koa')
var path = require('path')

var wechat = require('./wechat/g')
var util = require('./lib/util')


//获取用来存储文本文件的token路径
var wechat_file=path.join(__dirname,'./config/wechat.txt')
//一些配置信息
var config = {
	wechat:{
		appID:'wxf060d659c8aba4ec', 
		appsecret:'29e57719e36fd9f1ed69e9baab89370c',
		token:'ilovepine',
		//用来从文本中读取存储的token数据
		getAccessToken:function(){
			return util.readFileAsync(wechat_file)//返回一个Promise
		},
		//用来从文本中写入存储的token数据
	    saveAccessToken:function(data){
	    	//由于data是json对象格式,现在转换为字符串格式
	    	return util.writeFileAsync(wechat_file,data)//返回一个Promise

	    }
	}
}
var app = new Koa();
app.use(wechat(config.wechat))
app.listen(80)
console.log("listening:80")