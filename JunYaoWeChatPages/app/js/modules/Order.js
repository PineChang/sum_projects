define(['jquery','utils/util','utils/alert'],function($,util,alert){
    
	function hoOrderQuery(event){
        var telInput=$("#telInput").val();
            
        if (telInput == "") {
              alert.jAlert("请输入手机号","提示",null,"确定")
                $("#telInput").focus();
                return;
        }
            //第一项服务器端发送请求;
            //提交之前弹出正在加载的窗口
           $(".gifAnim").css("display","flex");
            //组织请求参数
        var jsonParam = "{\"SENDER_MOBILE\":\"" + telInput+ "\"}";
        var str_data = 'AppInput='+jsonParam;
        //组织url
        var url = util.getHoUrl()+"GetAppOrder";
        //发送请求
        $(".gifAnim").css("display", "flex");
        util._ajax_submit_service(url,str_data, function(json) {
            $(".gifAnim").css("display", "none");
            if(json.CODE=="0"&&json.OTHEROBJ&&json.OTHEROBJ.Orderlist&&json.OTHEROBJ.Orderlist.length>0){
            	//如果有数据先把运单查询的图标清除掉
                $("#orderContainer").html("")

               console.log(json)
                //然后将数据渲染进去;
                var list = json.OTHEROBJ.Orderlist;
                for(var i=0;i<list.length;i++){

                	$('#orderItemTemplate').clone().attr("id","order"+i).appendTo("#orderContainer");
                	$("#order"+i).find(".icon-AWB2").next().html("运单号&nbsp"+list[i].ORDER_NO);
                	$("#order"+i).find(".orderInfo").children().eq(1).text(list[i].COMMODITY);
                	$("#order"+i).find(".orderInfo").children().eq(3).text(list[i].REMARK);

                	$("#order"+i).find(".receiverInfo").children().eq(1).text(list[i].RECEIVER_NAME);
                	$("#order"+i).find(".receiverInfo").children().eq(3).text(list[i].RECEIVER_MOBILE);
                	$("#order"+i).find(".receiverInfo").children().eq(5).text(list[i].RECEIVER_PCD);
                	$("#order"+i).find(".receiverInfo").children().eq(7).text(list[i].RECEIVER_ADDRESS);
                }

                

            }else{
            	$("#orderContainer").html("<div class=\"noQueryPic\"></div>")
            	alert.jAlert(json.REMARK, "错误提示", null, "确定");
            }
            
        }, function(e,x) {           
            $(".gifAnim").css("display", "none");
            alert.jAlert("网络错误"+x.responseText, "提示", null, "确定")



        });
    }


	$("#orderBtn").click(hoOrderQuery);




})