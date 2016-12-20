//策略模式,将一堆独立的算法模块封装起来;
//不需要只是关注算法的实现结果,不关注算法的实现过程;



var inputStrategy = function(){

	//封闭算法的实现
	var strategy = {
		notNull:function(value){
			return /\s+/.test(value);
		},
		number:function(value){
			return /^[0-9]+(\.[0-9]+)?$/.test(value)
		},
		phone:function(value){
			return /^\d{3}\-\d{8}$|^\d{4}\-\d{7}$/.test(value);
		}
	}
    //暴露访问某个方法的的接口
	return {
		check:function(type,value){
			value=value.replace(/^\s+|\s+$/g,'');

			return strategy[type]?strategy[type]:'没有该类型的检测的方法';
		},
		//能够像已有的函数库中添加新验证方法的函数;
		addStrategy:function(type,fn){
			stategy[type]=fn;
		}
	}
}