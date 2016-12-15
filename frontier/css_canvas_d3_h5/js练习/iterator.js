//js中迭代器模式

//比如有一组数据,如果用数组吧这些数据装起来,用的时候,每次用都要遍历一遍是不是很不好
//那么就用迭代器模式

//比如父容器section下面有许多子div模块,那么想要灵活操纵这些子div模块,怎么办
//难道每操纵一次用一遍遍历?


var  Iterator  = function(items,container){

   //&&表示从左向右遍历返回第一个空的值,如果都不为空,那么返回最后一项;
   //适用于将一个值经过一连串的处理,最后得到最终的处理结果的情况

   //||表示从左向右遍历返回第一个不为空的值,如果都为空,那么最后一项空值
    var container = container&&document.getElementById(container) ||　docuemnt;


    var  items  = container.getElementByTagName(items);
    //这个index很重要,它就是这个遍历器的操纵引擎
    index = 0 
    length=itmes.length;
    //这里用一下数组的splice方法
    var  splice  = Array.prototype.slice;
    //以下为要暴露出给外界调用来操纵数据的方法;
    return {
         
    	//以下为遍历器的必备方法;
        first:function(){
        	index=0;
        	return items[index];
        },
        last:function(){
        	index=length-1;
        	return items[index]

        },
        pre:function(){
        	if(--index>0){
        		return items[index]
        	}else{
        		index=0
        		return null;
        	}
        },

        next:function(){
        	if(++index<length){
        		return items[index]
        	}else{
        		index=length-1;
        		return null;
        	}

        }




    }




}