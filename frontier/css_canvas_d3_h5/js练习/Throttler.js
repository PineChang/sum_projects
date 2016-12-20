//节流:屏蔽重复的事情,只执行最后一次;

//比如频繁多次执行的一个操作,我们可以自定义每1秒执行一次
var throttle = function() {

    //第一个参数代表是否清楚计时器,第二个参数代表要执行的函数
    var isClear = arguments[0],
        fn;

    if (typeof isClear === 'boolean') {
        fn = arguments[1];
        fn.__throttleID && clearTimeout(fn.__throttleID);

    } else {
        //	当传递进来一个函数和这个函数的执行环境,执行参数以及延迟时间的时候
        //第一步,先将参数进行合并
        fn = isClear;
        //第二个参数为函数执行的时候的参数
        param = arguments[1];
        //将传递进来的参数和默认参数进行合并
        var p = extend({
            context: null,
            args: [],
            time: 300
        }, param)

        //第二步,清楚函数计时器句柄,arguments.callee表示递归调用当前函数
        arguments.callee(true, fn);

        //并为函数绑定新的计时器句柄,延迟执行函数;
        fn.__throttleID = setTimeout(function() {
            fn.apply(p.context, p.args)
        }, p.time)

    }

    //注意上面的巧妙写法,实际上是将两个函数,合并为一个函数,
    //模仿函数重载,通过在函数内部对传递进来的参数arguments进行判断,实现将多个小函数合并为
    //一个函数,代码看起来很吊,以后可以尝试着用这种思想;
}
throttle(function(){
	console.log("我们执行了")
})
/*
function bethrottled() {
    console.log("我被调用了")
};

((function() {
    for (var i = 0; i++; i < 100) {

        throttle(bethrottled)

    }
    console.log("123")



})())
*/