define(['jquery', 'utils/util', 'utils/alert'], function($, util, alert) {


    function sendReceiveClick() {
        var basicInputs = {
            sendName: { titleStr: "寄件人姓名", valStr: $("#sendName").val() },
            sendTel: { titleStr: "寄件人电话", valStr: $("#sendTel").val() },
            addr1: { titleStr: "寄件人地址", valStr: $("#addr1").val() },
            sendAddr: { titleStr: "寄件人详细地址", valStr: $("#sendAddr").val() },
            receiveName: { titleStr: "收件人姓名", valStr: $("#receiveName").val() },
            receiveTel: { titleStr: "收件人电话", valStr: $("#receiveTel").val() },
            addr2: { titleStr: "收件人地址", valStr: $("#addr2").val() },
            receiveAddr: { titleStr: "收件人详细地址", valStr: $("#receiveAddr").val() },
            goodsDesc: { titleStr: "货物描述", valStr: $("#goodsDesc").val() },
            goodsMask: { titleStr: "货物备注", valStr: $("#goodsMask").val() }
        }

        //对获取到的填入信息进行非空校验
        for (var key in basicInputs) {

            if (!basicInputs[key].valStr) {

                alert.jAlert("请输入" + basicInputs[key].titleStr, "提示", null, "确定");
                return;

            }
        }

        //组织请求参数
        var jsonParam = "{\"SENDER_PCD\":\"" + basicInputs.addr1.valStr + "\",\"RECEIVER_PCD\":\"" + basicInputs.addr2.valStr + "\",\"RECEIVER_ADDRESS\":\"" + basicInputs.receiveAddr.valStr + "\",\"RECEIVER_MOBILE\":\"" + basicInputs.receiveTel.valStr + "\",\"RECEIVER_NAME\":\"" + basicInputs.receiveName.valStr + "\",\"SENDER_ADDRESS\":\"" + basicInputs.sendAddr.valStr + "\",\"SENDER_MOBILE\":\"" + basicInputs.sendTel.valStr + "\",\"SENDER_NAME\":\"" + basicInputs.sendName.valStr + "\",\"REMARK\":\"" + basicInputs.goodsMask.valStr + "\",\"COMMODITY\":\"" + basicInputs.goodsDesc.valStr + "\"}";
        var str_data = 'AppInput='+jsonParam;
        //组织url
        var url = util.getHoUrl()+"MoAppOrder";
        //发送请求
        $(".gifAnim").css("display", "flex");
        console.log(jsonParam);
        util._ajax_submit_service(url,str_data, function(json) {
            
            $(".gifAnim").css("display", "none");
            if(json.CODE=="0"){
                 alert.jAlert(json.REMARK, "提示", null, "确定");

            }else{
                alert.jAlert(json.REMARK, "错误提示", null, "确定");

            }

           
        }, function(e,x) {
           
            $(".gifAnim").css("display", "none");
            alert.jAlert("网络错误"+x.responseText, "提示", null, "确定")



        });

    }

    $("#submitSendReceive").click(sendReceiveClick);





})
