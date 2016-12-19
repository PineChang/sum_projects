
'use strict'
var sha1 = require('sha1')


var Wechat  = require('./wechat');


module.exports=function(opts){
	
	//当请求过来到服务器的时候,先验证token的合法性
    //通过实例化初始化WeChat来自函数的对象,进行验证
    var wechat = new Wechat(opts)
    //再返回generator函数,用来处理请求
		return function *(next){
		console.log(this.query);


		var token = opts.token


		var signature=this.query.signature
		

		var nonce = this.query.nonce
		

		var timestamp = this.query.timestamp


		var echostr = this.query.echostr
		

		var str = [token,timestamp,nonce].sort().join('')
		var sha = sha1(str)
        //如果是get请求说明是来验证微信的接口的
		if(this.method==="GET"){

			if(sha===signature){
				
				this.body=echostr+""
			}else{
				this.body='wrong'
			}
			//如果是POST请求那么可能是发过来的额消息包,响应的点击事件等
		}else if(this.method==="POST"){
			if(sha!=signature){
				this.body='wrong';
				return false;
			}

            var data = yield getRawBody(this.req,{
            	lengh:this.length,
            	limit:'1mb',
            	encoding:this.charset
            })
            console.log(data.toString())

		}
		


	}
}

