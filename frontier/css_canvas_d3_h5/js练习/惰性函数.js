
	//以下用惰性函数的思想与工厂方法创建http请求封装,
	//所谓惰性函数就是对于复杂的判断,比如兼容性判断,第一次执行的时候判断
	//一下,如果第二执行,就不用判断了,直接拿来用就行了
	//而非单粒惰性函数,因为http可以创建多次
	var createXHRFactory = function(){
		var xhr = null;
		if(typeof XMLHttpRequest!= 'undefined'){
			//第一次判断后将其赋值,用于第一次调用的返回
			xhr=new XMLHttpRequest();
			//改变函数的指向,第2＋次调用就直接用这个工厂函数就行了,
			//不用再次判断
			createXHRFactory=function(){
				return new XMLHttpRequest();
			}
		}else{
			try{
				xhr = new ActiveXObject('Msxml2.XMLHTTP');
				createXHRFactory=function(){
					return new ActiveXObject('Msxml2.XMLHTTP');
				}
			}catch(e){
					try{
						xhr = new ActiveXObject("Microsoft.XMLHTTP");
						createXHRFactory=function(){
							return new ActiveXObject("Microsoft.XMLHTTP");
						}
					}catch(e){

							createXHRFactory=function(){
								return null;
					        }
					}
			}
		}

		return xhr;
	}