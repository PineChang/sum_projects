//command模式是一种很实用的模式,比如在redux里面对state的数据操作就用了这种模式

var viewCommand = (function(){
	//定义一下视图模板
	var tpl = {
		product:[
		'<div>',
			'<img src="{#src#}"/>',
			'<p>{#text#}</p>',
		'</div>'
		].join(''),

		title:[
			'<div class="title">',
				'<div class="main">',
					'<h2>{#title#}</h2>',
					'<p>{#tips#}</p>',
				'</div>',
			'</div>'
		].join('')
	};

	//一下为缓存字符串,缓存了最终要渲染的视图

	var html = '';
	//定义一个函数用来把数据和模板进行绑定,用的原理就是正则表达式

	function formateString(strView,data){

		return strView.replace(/\{#(\w)#\}/g,function(match,key){
			//用正则匹配占位key,然后进行替换
			return obj[key];
		})

	}

	var Action = {
		create:function(data,view){
			//如果传递建立的data是数组,那么就进行遍历合并
			if(data.length){
				for (var i = 0; i < data.length; i++) {
					html+=formateString(tpl[view],data[i]);
				}
			//否则的话,就直接调用
			}else{
				html+=formateString(tpl[view],data)
			}
		}

		display:function(container,data,view){
			if(data){
				this.create(data,view);
			}
			document.getElementById(container).innerHtml=html;
			html=''
		}

	}



})