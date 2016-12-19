define(["jquery"],function(o){o.alerts={verticalOffset:-75,horizontalOffset:0,repositionOnResize:!0,overlayOpacity:.5,overlayColor:"#666",draggable:!0,okButton:"确定",cancelButton:"取消",dialogClass:null,alert:function(e,p,t){null==p&&(p="提示"),o.alerts._show(p,e,null,"alert",function(o){t&&t(o)})},confirm:function(e,p,t){null==p&&(p="确认"),o.alerts._show(p,e,null,"confirm",function(o){t&&t(o)})},prompt:function(e,p,t,i){null==t&&(t="输入"),o.alerts._show(t,e,p,"prompt",function(o){i&&i(o)})},_show:function(e,p,t,i,n){switch(o.alerts._hide(),o.alerts._overlay("show"),o("BODY").append('<div id="popup_container">                             <h1 id="popup_title"></h1>                             <div id="popup_content">                                <div id="popup_message"></div>                             </div>                         </div>'),o.alerts.dialogClass&&o("#popup_container").addClass(o.alerts.dialogClass),o("#popup_container").css({position:"absolute",zIndex:99999,backgroundColor:"#606060",borderRadius:"0.5rem",border:"1px solid #CDCDCD",color:"white",top:"50%",left:"50%",transform:"translateX(-50%) translateY(-50%)",width:"80%"}),o("#popup_title").text(e),o("#popup_content").addClass(i),o("#popup_message").text(p),o("#popup_message").html(o("#popup_message").text().replace(/\n/g,"<br />")),o.alerts._reposition(),o.alerts._maintainPosition(!0),i){case"alert":o("#popup_content").after('<div><div class="btn ub ub-ac ub-pc"  id="popup_ok">'+o.alerts.okButton+"</div></div>"),o.alerts._changebg("#popup_ok"),o("#popup_ok").click(function(){o.alerts._hide(),n(!0)}),o("#popup_ok").focus().keypress(function(e){13!=e.keyCode&&27!=e.keyCode||o("#popup_ok").trigger("click")});break;case"confirm":o("#popup_content").after('<div class=" ub"><div class="btn ub ub-f1 ub-ac ub-pc"  id="popup_ok">'+o.alerts.okButton+'</div><div class="btn ub ub-f1 ub-ac ub-pc"  id="popup_cancel">'+o.alerts.cancelButton+"</div></div>"),o.alerts._changebg("#popup_ok"),o.alerts._changebg("#popup_cancel"),o("#popup_ok").click(function(){o.alerts._hide(),n&&n(!0)}),o("#popup_cancel").click(function(){o.alerts._hide(),n&&n(!1)}),o("#popup_ok").focus(),o("#popup_ok, #popup_cancel").keypress(function(e){13==e.keyCode&&o("#popup_ok").trigger("click"),27==e.keyCode&&o("#popup_cancel").trigger("click")});break;case"prompt":o("#popup_content").append('<br /><input type="text" size="60" style="font-size:1em;height:1.5em;width:20em" id="popup_prompt" />').after('<div class=" ub"><div class="btn ub ub-f1 ub-ac ub-pc"  id="popup_ok">'+o.alerts.okButton+'</div><div class="btn ub ub-f1 ub-ac ub-pc"  id="popup_cancel">'+o.alerts.cancelButton+"</div></div>"),o("#popup_prompt").width(o("#popup_message").width()),o("#popup_ok").click(function(){var e=o("#popup_prompt").val();o.alerts._hide(),n&&n(e)}),o("#popup_cancel").click(function(){o.alerts._hide()}),o("#popup_prompt, #popup_ok, #popup_cancel").keypress(function(e){13==e.keyCode&&o("#popup_ok").trigger("click"),27==e.keyCode&&o("#popup_cancel").trigger("click")}),t&&o("#popup_prompt").val(t),o("#popup_prompt").focus().select()}if(o.alerts.draggable)try{o("#popup_container").draggable({handle:o("#popup_title")}),o("#popup_title").css({cursor:"move"})}catch(o){}},_hide:function(){o("#popup_container").remove(),o.alerts._overlay("hide"),o.alerts._maintainPosition(!1)},_overlay:function(e){switch(e){case"show":o.alerts._overlay("hide"),o("BODY").append('<div id="popup_overlay"></div>'),o("#popup_overlay").css({position:"absolute",zIndex:99998,top:"0px",left:"0px",width:"100%",height:o(document).height(),background:o.alerts.overlayColor,opacity:o.alerts.overlayOpacity});break;case"hide":o("#popup_overlay").remove()}},_reposition:function(){var e=o(window).height()/2-o("#popup_container").height()/2+o.alerts.verticalOffset,p=o(window).width()/2-o("#popup_container").width()/2+o.alerts.horizontalOffset;e<0&&(e=0),p<0&&(p=0),"undefined"==typeof document.body.style.maxHeight&&(e+=o(window).scrollTop()),o("#popup_overlay").height(o(document).height())},_maintainPosition:function(e){if(o.alerts.repositionOnResize)switch(e){case!0:o(window).bind("resize",function(){o.alerts._reposition()});break;case!1:o(window).unbind("resize")}},_changebg:function(e){o(e).mousedown(function(){o(e).css("background","#f8faf8")}),o(e).mouseup(function(){o(e).css("background","#fff")})}},jAlert=function(e,p,t,i){i&&(o.alerts.okButton=i),o.alerts.alert(e,p,t)},jConfirm=function(e,p,t,i,n){i&&(o.alerts.okButton=i),n&&(o.alerts.cancelButton=n),o.alerts.confirm(e,p,t)},jPrompt=function(e,p,t,i){o.alerts.prompt(e,p,t,i)};var e={jAlert:jAlert,jConfirm:jConfirm,jPrompt:jPrompt};return e});