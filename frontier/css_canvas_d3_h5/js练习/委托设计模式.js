
//将li上的事件都绑定到其父标签中
ul.onclick=function(e){
	var  e  = e || window.event;
	tar = e.target || e.srcElement;
	if(tar.nodeName.toLowerCase()=="li"){
		tar.style.backgroundColor="grey"
	}
}