define(["jquery","utils/util","utils/alert"],function(e,l,t){function r(){var r={sendName:{titleStr:"寄件人姓名",valStr:e("#sendName").val()},sendTel:{titleStr:"寄件人电话",valStr:e("#sendTel").val()},addr1:{titleStr:"寄件人地址",valStr:e("#addr1").val()},sendAddr:{titleStr:"寄件人详细地址",valStr:e("#sendAddr").val()},receiveName:{titleStr:"收件人姓名",valStr:e("#receiveName").val()},receiveTel:{titleStr:"收件人电话",valStr:e("#receiveTel").val()},addr2:{titleStr:"收件人地址",valStr:e("#addr2").val()},receiveAddr:{titleStr:"收件人详细地址",valStr:e("#receiveAddr").val()},goodsDesc:{titleStr:"货物描述",valStr:e("#goodsDesc").val()},goodsMask:{titleStr:"货物备注",valStr:e("#goodsMask").val()}};for(var a in r)if(!r[a].valStr)return void t.jAlert("请输入"+r[a].titleStr,"提示",null,"确定");var d='{"SENDER_PCD":"'+r.addr1.valStr+'","RECEIVER_PCD":"'+r.addr2.valStr+'","RECEIVER_ADDRESS":"'+r.receiveAddr.valStr+'","RECEIVER_MOBILE":"'+r.receiveTel.valStr+'","RECEIVER_NAME":"'+r.receiveName.valStr+'","SENDER_ADDRESS":"'+r.sendAddr.valStr+'","SENDER_MOBILE":"'+r.sendTel.valStr+'","SENDER_NAME":"'+r.sendName.valStr+'","REMARK":"'+r.goodsMask.valStr+'","COMMODITY":"'+r.goodsDesc.valStr+'"}',v="AppInput="+d,i=l.getHoUrl()+"MoAppOrder";e(".gifAnim").css("display","flex"),console.log(d),l._ajax_submit_service(i,v,function(l){e(".gifAnim").css("display","none"),"0"==l.CODE?t.jAlert(l.REMARK,"提示",null,"确定"):t.jAlert(l.REMARK,"错误提示",null,"确定")},function(l,r){e(".gifAnim").css("display","none"),t.jAlert("网络错误"+r.responseText,"提示",null,"确定")})}e("#submitSendReceive").click(r)});