define(['jquery'],function($){

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
    //用来对class选择和分割为数组

    var getHoUrl = function(){

    	 //return "http://cargotest.ce-air.com/HOServiceForApp/";
         return "http://172.21.129.141/";
         //HOServiceForApp/";
    }

   var  _ajax_submit = function(v_url,v_data,successFn,errorFn){
       $.ajax({
            url : v_url,
            type : "POST",
            dataType : "json",
            data : v_data,
            success :successFn,
            error : errorFn
        });
    }
   var _ajax_submit_service = function(v_url,str_data,successFn,errorFn){
       $.ajax({
            url : v_url,
            type : "post",
            dataType : "json",
            //contentType: "application/x-www-form-urlencoded",
           // contentType : "application/json; charset=utf-8",
            data : str_data,
            success :successFn,
            error : errorFn
        });
    }
   var  gifLoading = function(){
	    //构建碎片挺好xiaolv
	    var  htmlFragment=document.createDocumentFragment();
	    //构建遮罩层;
	    var oDiv = document.createElement("div");
	    oDiv.className="gifAnim";
	    //构建加载动画的容器
	    var gifDiv =document.createElement("div");
	    gifDiv.className="gifDiv";
	    var text=document.createTextNode("加载中...");
	    gifDiv.appendChild(text);
	    oDiv.appendChild(gifDiv);
	    htmlFragment.appendChild(oDiv);
	    var body =  document.getElementsByTagName("body");
	    body[0].appendChild(htmlFragment); 
 }



    var util = {
    	createXHRFactory:createXHRFactory,
    	getHoUrl:getHoUrl,
    	_ajax_submit:_ajax_submit,
    	_ajax_submit_service:_ajax_submit_service,
    	gifLoading:gifLoading

    }
    
	return util;

})