//状态设计模式,用来解决每次有一个请求都要switch..case一遍的情况
//状态设计模式,也可以理解为响应式函数式变成,有点像ios中的mosony布局库
//也就是对一个数据或者而一种状态进行一系列的处理,那么可以将这一系列的处理进行
//分类封装,用到那些处理,就将那些处理存储起来,到最后一下子全部执行;
var MarryState = function () {
	var _currentState={},

	states  = {
		jump:function () {
			console.log("jump")
		},
		move:function () {
			console.log("move")
		},
		shoot:function () {
			console.log("shoot")
		},
		squat:function () {
			console.log("squat")
		}
	}

	var Action = {
		changeState : function(){
			var arg = arguments;
			_currentState = {};
			if(arg.length){
				for (var i = 0; i < arg.length; i++) {
					_currentState[arg[i]]=true;
				}
			}
			//返回this,用于链式调用;
			return this;


		},
		gose:function () {
			for(var key in _currentState){
				states[key] && states[key]()
			}
			return this;
		}
	}

	//暴露出可访问的接口;
	return {
		change:Action.changeState,
		goes:goes
	}
}

MarryState().change('jump','shoot')
.goes().goes().change('shoot');