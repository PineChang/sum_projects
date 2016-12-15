//js中的静态变量实现

var conF  = (function(){
	var conF = {
		MAX_NUM:100,
		MIN_NUM:0
	}

	//以下只提供一个getter方法进行访问
	//以下为要暴露出给外界调用来操纵数据的方法;
	return {
		get:function(name){
			return conF[name]?conF[name]:null;
		}
	}

})();
//如何使用
var count = conF.get('MAX_NUM');

console.log(count);


//静态变量是已经存在的不需要初始化,有不能修改的变量

//如果第一次使用的时候初始化,不需要的时候不需要初始化,第一次初始化就就不用初始化了,就一直存在了,那么就可以用惰性单粒,
//类似于swift中的闭包

var lazySingle = (function(){
	//等待初始化的实例
	var instance=null;
	//进行初始化的方法
	function Single(){
		return {
			demoProperty:'1.0',
			demoFunction:function(){console.log(1234)}
		}
	}
	return  function(){
		//第一次调用的时候不存在,那么就进行初始化
		if(!instance){
			instance=Single()
		}
		//初始化后就可以返回这个单粒实例了
		return instance;
	}

})();


lazySingle().demoFunction();