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
        var jsonParam = "{\"city1\":\"" + basicInputs.addr1.valStr + "\",\"city2\":\"" + basicInputs.addr2.valStr + "\",\"RECEIVER_ADDRESS\":\"" + basicInputs.receiveAddr.valStr + "\",\"RECEIVER_MOBILE\":\"" + basicInputs.receiveTel.valStr + "\",\"RECEIVER_NAME\":\"" + basicInputs.receiveName.valStr + "\",\"SENDER_ADDRESS\":\"" + basicInputs.sendAddr.valStr + "\",\"SENDER_MOBILE\":\"" + basicInputs.sendTel.valStr + "\",\"SENDER_NAME\":\"" + basicInputs.sendName.valStr + "\",\"REMARK\":\"" + basicInputs.goodsMask.valStr + "\",\"COMMODITY\":\"" + basicInputs.goodsDesc.valStr + "\"}";
        var str_data = 'AppInput='+jsonParam;
        //组织url
        var url = "http://172.21.129.147:222/WebService/MOAPPService.asmx/MoAppOrder";
        //发送请求
        $(".gifAnim").css("display", "flex");
        util._ajax_submit_service(url,str_data, function(json) {
             console.log("进入成功的方法了")
            $(".gifAnim").css("display", "none");
            console.log(json)

            //alert.jAlert(json, "提示", null, "确定");


        }, function(e,x) {
            console.log("进入失败的方法了")
            $(".gifAnim").css("display", "none");
            alert.jAlert("网络错误"+x.responseText, "提示", null, "确定")



        });

    }

    $("#submitSendReceive").click(sendReceiveClick);





})
