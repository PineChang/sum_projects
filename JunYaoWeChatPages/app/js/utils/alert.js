define(['jquery'],function($){


//警告框
$.alerts = {
    verticalOffset : -75, // 垂直偏移
    horizontalOffset : 0, // 横向偏移
    repositionOnResize : true, // re-centers the dialog on window resize
    overlayOpacity : .5, // 遮罩透明度
    overlayColor : '#666', // 遮罩颜色
    draggable : true, // make the dialogs draggable (requires UI Draggables plugin)
    okButton : '确定', // 确定按钮文本
    cancelButton : '取消', // 取消按钮文本
    dialogClass : null, // 文本框样式
   
    // Public methods
    alert : function(message, title, callback) {
        if (title == null)
            title = '提示';
        $.alerts._show(title, message, null, 'alert', function(result) {
            if (callback)
                callback(result);
        });
    },

    confirm : function(message, title, callback) {
        if (title == null)
            title = '确认';
        $.alerts._show(title, message, null, 'confirm', function(result) {
            if (callback)
                callback(result);
        });
    },

    prompt : function(message, value, title, callback) {
        if (title == null)
            title = '输入';
        $.alerts._show(title, message, value, 'prompt', function(result) {
            if (callback)
                callback(result);
        });
    },

    // Private methods

    _show : function(title, msg, value, type, callback) {
        $.alerts._hide();
        $.alerts._overlay('show');
       //基础架构
        $("BODY").append('<div id="popup_container">\
                             <h1 id="popup_title"></h1>\
                             <div id="popup_content">\
                                <div id="popup_message"></div>\
                             </div>\
                         </div>');

        if ($.alerts.dialogClass)
            $("#popup_container").addClass($.alerts.dialogClass);

        // position : pos, IE6 Fixvar pos = ('undefined' == typeof (document.body.style.maxHeight)) ? 'absolute' : 'fixed';

        $("#popup_container").css({
            position : 'absolute',
            zIndex : 99999,
            backgroundColor:"#606060",
            borderRadius:"0.5rem",
            border:"1px solid #CDCDCD",
            color:"white",
            top:"50%",
            left:"50%",
            transform:"translateX(-50%) translateY(-50%)",
            width: "80%"
           

            
        });

        $("#popup_title").text(title);
        $("#popup_content").addClass(type);
        $("#popup_message").text(msg);
        $("#popup_message").html($("#popup_message").text().replace(/\n/g, '<br />'));

        // $("#popup_container").css({
        // minWidth : $("#popup_container").outerWidth(),
        // maxWidth : $("#popup_container").outerWidth()
        // });

        $.alerts._reposition();
        $.alerts._maintainPosition(true);

        switch( type ) {
        case 'alert':
            //$("#popup_content").after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /></div>');
            $("#popup_content").after('<div><div class="btn ub ub-ac ub-pc"  id="popup_ok">' + $.alerts.okButton + '</div></div>');
            $.alerts._changebg("#popup_ok");
            $("#popup_ok").click(function() {
                $.alerts._hide();
                callback(true);
            });
            $("#popup_ok").focus().keypress(function(e) {
                if (e.keyCode == 13 || e.keyCode == 27)
                    $("#popup_ok").trigger('click');
            });
            break;
        case 'confirm':
            // $("#popup_content").after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
            $("#popup_content").after('<div class=" ub"><div class="btn ub ub-f1 ub-ac ub-pc"  id="popup_ok">' + $.alerts.okButton + '</div><div class="btn ub ub-f1 ub-ac ub-pc"  id="popup_cancel">' + $.alerts.cancelButton + '</div></div>');
            $.alerts._changebg("#popup_ok");
            $.alerts._changebg("#popup_cancel");
            $("#popup_ok").click(function() {
                $.alerts._hide();
                if (callback)
                    callback(true);
            });
            $("#popup_cancel").click(function() {
                $.alerts._hide();
                if (callback)
                    callback(false);
            });
            $("#popup_ok").focus();
            $("#popup_ok, #popup_cancel").keypress(function(e) {
                if (e.keyCode == 13)
                    $("#popup_ok").trigger('click');
                if (e.keyCode == 27)
                    $("#popup_cancel").trigger('click');
            });
            break;
        case 'prompt':
            //$("#popup_content").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
            $("#popup_content").append('<br />\<input type="text" size="60" style="font-size:1em;height:1.5em;width:20em" id="popup_prompt" />')
                               .after('<div class=" ub"><div class="btn ub ub-f1 ub-ac ub-pc"  id="popup_ok">' + $.alerts.okButton + '</div><div class="btn ub ub-f1 ub-ac ub-pc"  id="popup_cancel">' + $.alerts.cancelButton + '</div></div>');
            $("#popup_prompt").width($("#popup_message").width());
            $("#popup_ok").click(function() {
                var val = $("#popup_prompt").val();
                $.alerts._hide();
                if (callback)
                    callback(val);
            });
            $("#popup_cancel").click(function() {
                $.alerts._hide();
                return;
            });
            $("#popup_prompt, #popup_ok, #popup_cancel").keypress(function(e) {
                if (e.keyCode == 13)
                    $("#popup_ok").trigger('click');
                if (e.keyCode == 27)
                    $("#popup_cancel").trigger('click');
            });
            if (value)
                $("#popup_prompt").val(value);
            $("#popup_prompt").focus().select();
            break;
        }

        // Make draggable
        if ($.alerts.draggable) {
            try {
                $("#popup_container").draggable({
                    handle : $("#popup_title")
                });
                $("#popup_title").css({
                    cursor : 'move'
                });
            } catch(e) {/* requires jQuery UI draggables */
            }
        }
    },

    _hide : function() {
        // if ($.alerts.bg) {
        // $("#bg").remove();
        // }
        $("#popup_container").remove();
        $.alerts._overlay('hide');
        $.alerts._maintainPosition(false);
    },

    _overlay : function(status) {
        switch( status ) {
        case 'show':
            $.alerts._overlay('hide');
            $("BODY").append('<div id="popup_overlay"></div>');
            $("#popup_overlay").css({
                position : 'absolute',
                zIndex : 99998,
                top : '0px',
                left : '0px',
                width : '100%',
                height : $(document).height(),
                background : $.alerts.overlayColor,
                opacity : $.alerts.overlayOpacity
            });
            break;
        case 'hide':
            $("#popup_overlay").remove();
            break;
        }
    },

    _reposition : function() {

        var top = (($(window).height() / 2) - ($("#popup_container").height() / 2)) + $.alerts.verticalOffset;
        var left = (($(window).width() / 2) - ($("#popup_container").width() / 2)) + $.alerts.horizontalOffset;
        if (top < 0)
            top = 0;
        if (left < 0)
            left = 0;

        // IE6 fix
        if ('undefined' == typeof (document.body.style.maxHeight))
            top = top + $(window).scrollTop();

        /*$("#popup_container").css({
            top : top + 'px',
            left : left + 'px'
        });*/
        $("#popup_overlay").height($(document).height());
    },

    _maintainPosition : function(status) {
        if ($.alerts.repositionOnResize) {
            switch(status) {
            case true:
                $(window).bind('resize', function() {
                    $.alerts._reposition();
                });
                break;
            case false:
                $(window).unbind('resize');
                break;
            }
        }
    },

    _changebg : function(object) {
        $(object).mousedown(function() {
            $(object).css("background", "#f8faf8");
        });
        $(object).mouseup(function() {
            $(object).css("background", "#fff");
        });
    }
}

// Shortuct functions
jAlert = function(message, title, callback, okButton) {
    if (okButton)
        $.alerts.okButton = okButton;
    $.alerts.alert(message, title, callback);
}
jConfirm = function(message, title, callback, okButton, cancelButton) {
    if (okButton)
        $.alerts.okButton = okButton;
    if (cancelButton)
        $.alerts.cancelButton = cancelButton;
    $.alerts.confirm(message, title, callback);
};

jPrompt = function(message, value, title, callback) {
    $.alerts.prompt(message, value, title, callback);
};





var  alert = {
                jAlert:jAlert,
                jConfirm:jConfirm,
                jPrompt:jPrompt
            };
return alert;



























})
