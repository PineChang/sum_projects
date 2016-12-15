require.config({
    baseUrl: "../js/modules",
    paths: {
        'utils': '../utils',
        'jquery': '../utils/jquery-1.9.1.min'
    },
    waitSeconds: 0

})
require(['utils/util', 'utils/LArea', 'Awb', 'Order', 'SendReceive', 'utils/domReady', 'jquery'], function(util, LArea, Awb, Order, SendReceive, domReady, $) {
    
         //初始化省市区
        var area1 = new LArea.LAreaCls();
        area1.init({
            'trigger': '#addr1', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
            'valueTo': '#value1', //选择完毕后id属性输出到该位置
            'keys': {
                id: 'id',
                name: 'name'
            }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
            'type': 1, //数据源类型
            'data': LArea.LAreaData //数据源

        });
         var area2 = new LArea.LAreaCls();
         area2.init({
            'trigger': '#addr2', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
            'valueTo': '#value2', //选择完毕后id属性输出到该位置
            'keys': {
                id: 'id',
                name: 'name'
            }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
            'type': 1, //数据源类型
            'data': LArea.LAreaData //数据源

        });

    domReady(function(){
        //console.log(util.createXHRFactory()+" ");
        //Awb.test();
        //初始化加载gif动画html
        util.gifLoading();
        //监听hash地址变化
        function locationHashChanged() {
            switch (location.hash) {

                case "#awbQuery":
                    document.title = "运单查询";
                    break;
                case "#awbQueryResult":
                    document.title = "运单查询结果"
                    Awb.displayAwbTrackData();
                    break;
                case "#deliveryGoods":
                    document.title = "我要发货"
                    break;
                default:
                    document.title = "吉祥货运";
            }

        }

        window.onhashchange = locationHashChanged;
    });

})
