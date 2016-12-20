define(['jquery','utils/util','utils/alert'],function($,util,alert){

//可以在这个页面做一些有关Awb页面的初始化设置;

 var querybulk ="";
 var awbInfo = "";
 function hoTrackAwbQuery(event){
        var awbpre=$("#awbpre").val();
        var awbno=$("#awbno").val();       
        if (awbpre == "") {
               alert.jAlert("请输入运单号","提示",null,"确定")
                $("#awbpre").focus();
                return;
            }
            
        if (awbno == "") {
              alert.jAlert("请输入运单号","提示",null,"确定")
                $("#awbno").focus();
                return;
        }
       // 缓存查询的条件
        querybulk = {"awbpre":awbpre,"awbno":awbno};
        localStorage.setItem("querybulk",JSON.stringify(querybulk));
            //第一项服务器端发送请求;
            //组织请求参数
        var jsonParam = "{\"Stockpre\":\"" + awbpre+ "\",\"Stockno\":\""+awbno+"\"}";
        var str_data = 'AppInput='+jsonParam;
        //组织url
        var url = util.getHoUrl()+"GetAppAwb";
        //发送请求
        $(".gifAnim").css("display", "flex");
        util._ajax_submit_service(url,str_data, function(json) {
                     $(".gifAnim").css("display","none");
                     if (json.CODE!= -1) {
                        if(json.OTHEROBJ&&json.OTHEROBJ.Awbfsulist&&json.OTHEROBJ.Awbfsulist.length>0){
                            //如果成功的获取到数据,第一步将数据保存,第二步,将数据回显到页面
                            localStorage.setItem("strBulkTrack",JSON.stringify(json)); 
                            awbInfo = json ;
                            //此时跳转到查询结果页面展示;
                            window.location.hash="#awbQueryResult";
                 
                        }else{
                             alert.jAlert("您查询的货物信息不存在","提示",null,"确定")
   
                        }
  
                    } else {
                      
                        alert.jAlert(json.REMARK,"提示",null,"确定")
                    
                        return;
                    }
                
            },
            function(e,x){
                    $(".gifAnim").css("display","none");
                    alert.jAlert(x.responseText,"提示",null,"确定")
                   
                }
                
            );
            
  }

        //给运单查询按钮绑定事件
       
    $(".awbbtn").click(hoTrackAwbQuery);

    //展示运单数据的追踪显示
    function displayAwbTrackData() {
         
           $(".titleShow").text(querybulk.awbpre+"-"+querybulk.awbno);
           
           var bulkTracks =  awbInfo.OTHEROBJ;
           $(".sair").text(bulkTracks.Sairportid);
           $(".eair").text(bulkTracks.Eairportid);
           
           //让trackcontainer的高度充满剩余的空间
           var trackHeight = $("body").offset().height-$(".titleShow").offset().height-$(".saireair").offset().height;
           $("#trackcontainer").css("height",trackHeight);
           //渲染每一个cell
           if(bulkTracks.Awbfsulist&&bulkTracks.Awbfsulist.length>0){
             var bulklist =  bulkTracks.Awbfsulist; 
             //遍历之前先清空以前的数据
             $("#trackcontainer").html("");
             //此时对这个Awbfsulist进行遍历;
             for(var i=0;i<bulklist.length;i++){
                if(i==0){
                    $("#topItem").clone().attr("id",i).appendTo("#trackcontainer");
                }else if(i==bulklist.length-1){
                     $("#bottomItem").clone().attr("id",i).appendTo("#trackcontainer");  
                }else{   
                   $("#middleItem").clone().attr("id",i).appendTo("#trackcontainer")  
                }
                renderRow(i,bulklist[i]);   
             }     
           }
           function renderRow(i,data){
               
              $("#"+i).find(".row1").find("div").eq(0).text(data.Statusname);
              $("#"+i).find(".row1").find("div").eq(2).text(data.Airport);
              $("#"+i).find(".row1").find("span").eq(1).text(data.Fltno);
              
              $("#"+i).find(".row2").find("div").eq(0).text(data.Opepcs+"件  "+data.Opewt+"公斤");
              $("#"+i).find(".row2").find("div").eq(1).text(data.Opedate+" "+data.Opetime);     
           }


   }

  	var  Awb = {
  		displayAwbTrackData : displayAwbTrackData	
  	}

 return Awb;

})