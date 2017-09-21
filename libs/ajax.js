function ajaxGet(url,callback){
	var ajax = new XMLHttpRequest();
	ajax.open("GET",url,true);
	ajax.send(null);
	ajax.onreadystatechange = function(){
		if(ajax.readyState == 4 && ajax.status == 200){
			callback(ajax.responseText);		
		}
	}
}
function ajaxPost(url,callback,data){
	var ajax = new XMLHttpRequest();
	ajax.open("POST",url,true);
	ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	ajax.send(data);
	ajax.onreadystatechange = function(){
		if(ajax.readyState == 4 && ajax.status == 200){
			callback(ajax.responseText);		
		}
	}
}
function jsonp(src,cb,callback){
	// 创建script标签;
	var script = document.createElement("script");
	// 创建随机函数名;
	var randomCallback = "callback"+parseInt(Math.random()*1000);
	// 随机名称的全局函数;
	window[randomCallback] = function(res){
		callback(res);
	}
	//http://www.baidu.com?callback=随机全局函数;
	src = src + "?" + cb + "=" + randomCallback;
	script.src = src;
	document.body.appendChild(script);
	
	script.onload = function(){ //当script加载成功后;
		setTimeout(function(){
			//删除无用script标签;
			script.remove();
			//删除无用全局函数;
			delete window[randomCallback];
		}, 100);
	}
}