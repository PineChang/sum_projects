define(['jquery'],function($){

    //用来对class选择和分割为数组

    var getHoUrl = function(){

    	 //return "http://cargotest.ce-air.com/HOServiceForApp/";
         return "http://172.21.129.147:222/WebService/MOAPPService.asmx/";
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