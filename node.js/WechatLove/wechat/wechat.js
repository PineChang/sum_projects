'use strict'

var Promise = require('bluebird')
var request = Promise.promisify(require('request'))


var prefix = 'https://api.weixin.qq.com/cgi-bin/'
var api = {
	accessToken:prefix+'token?grant_type=client_credential'
}

//一些类用来验证token的合法性
function Wechat (opts){
//以下将wechat的json对象,转换为函数创造的实例对象,
//方便从自身取出数据,进行处理
  var that = this//this与that都是指向WeChat实例的指针
  //只不过为了区分,用that初始化prototype中的属性,用this初始化构造函数中属性
  this.appID = opts.appID
  this.appsecret =  opts.appsecret
  this.getAccessToken = opts.getAccessToken
  this.saveAccessToken = opts.saveAccessToken


  //在初始化实例化的时候就调用getAccessToken进行验证
  this.getAccessToken()
  .then(function(data){
  	//先解析以下这个从文本中拿到的data,如果解析异常
  	//那么,就重新更新一下这个data
  	try{
  		data = JSON.parse(data)

  	}catch(e){
  		
  		return that.updateAccessToken(data)//1返回一个promise对象
  	}
  	//如果解析成功,就检测一下这个data是否合法有效 

  	if(that.isValidAccessToken(data)){
  		//直接用return就能将结果发送到下一个then的参数里面,不需要用下面的注释的用法
       return data;
  		//Promise.resolve(data)
    //否则就更新以下这个data
  	}else{
  		return that.updateAccessToken(data)//3返回一个promise对象
  	}
  }).then(function(data){
    
   
  	that.access_token=data.access_token;
  	that.expires_in = data.expires_in;
  	
    data = JSON.stringify(data)
  	that.saveAccessToken(data)
  })


}

Wechat.prototype.isValidAccessToken=function(data){
	//第一步验证data以及data中的数据存在不存在
	if(!data || !data.access_token || !data.expires_in){
		return false
	}
	//第二部如果存在就验证,token过期的没有
	var access_token = data.access_token
	//过期的时间
	var expires_in = data.expires_in
    //现在的时间
	var now = (new Date().getTime())
	//如果现在的时间,小于过期时间,那么就没有过期,返回true
	if(now<expires_in){
		return true
	}else{
		return false
	}

}

Wechat.prototype.updateAccessToken = function() {
	var appID = this.appID
	var appsecret = this.appsecret
	var url = api.accessToken+ '&appid='+appID + '&secret='+appsecret
    console.log(url)
	return new Promise(function(resolve,reject){
		request({url:url,json:true}).then(function(response){
			
			//
			var data = response.body;
			
			var now = (new Date().getTime())
			var expires_in = now+(data.expires_in-20)*1000
			data.expires_in = expires_in
			resolve(data)
		})
	})
};

module.exports = Wechat;