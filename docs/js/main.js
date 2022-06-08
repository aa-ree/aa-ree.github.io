

function Project() {
	if(!(this instanceof Project)){
		return new Project();
	}
}
Project.prototype.init = function(){
	var img = document.getElementsByTagName('img'),
 		count = 0,
		 that = p;
 		for(var j = 0; j < img.length; j++){
			var src = img[j].getAttribute('data-src');
			that.loaded(src, img[j])
				.then((img) => {
					that.fadeIn(img);
					return img
		 		})
				.then((img) => that.fadeBlock(img));
 		}
}
Project.prototype.loaded = async function(url, el) {
	return new Promise((resolve, reject) => {
		el.onload = () => resolve(el);
		el.style.opacity = 0;
		el.onerror = reject;
		el.src = url;
	});
}
Project.prototype.fadeBlock = function(el){
	var content = el.closest('.projects').children[1].getElementsByTagName('div')[0];
	var title = el.closest('.projects').children[1].getElementsByTagName('h2')[0];
	this.fadeIn(title);
	this.fadeIn(content);
	title.innerHTML = title.getAttribute('data-title');
	content.innerHTML = content.getAttribute('data-content');
}
Project.prototype.fadeIn = function(el){
	(function fade() {
		var val = parseFloat(el.style.opacity);
		if ((val += .1) <= 1){
		  el.style.opacity = val;
		  el.complete && requestAnimationFrame(fade);
		}
	})();
}

var p = new Project();
window.onload = p.init;

// function AjaxRequest(){

// 	if(window.XMLHttpRequest){
// 		this.httpRequest = new XMLHttpRequest();
// 		if(this.httpRequest.overrideMimeType){
// 			this.httpRequest.overrideMimeType('text/xml');
// 		}
// 	} else if(window.ActiveXObject){
// 		try{
// 			this.httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
// 		} catch (e){
// 			try{
// 				this.httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
// 			} catch (e){}
// 		}
// 	}

// 	if (!this.httpRequest){
// 		console.log('Cannot create XHR object');
// 		return false;
// 	}
// }

// AjaxRequest.prototype.send = function(type, url, asyn, postData) {
// 	var that = this;
// 	this.httpRequest.onreadystatechange = function(){
// 		if(that.getReadyState() === 4 && that.getStatus() === 200){
// 			//var mail = new SendMail(that.getResponse());
// 		} else {
// 			console.log('something wrong...');
// 		}
// 	};
// 	type = type || 'GET';
// 	if(type === 'POST'){
// 		this.httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
// 	}
// 	asyn = asyn || true;
// 	postData = postData || null;
// 	this.httpRequest.open(type, url, asyn);
// 	this.httpRequest.send(postData);
// }

// AjaxRequest.prototype.getReadyState = function() {
//   return this.httpRequest.readyState;
// }

// AjaxRequest.prototype.getStatus = function() {
//   return this.httpRequest.status;
// }

// AjaxRequest.prototype.getResponseText = function() {
//   return this.httpRequest.responseText;
// }
// AjaxRequest.prototype.getResponse = function() {
//   return JSON.stringify(this.httpRequest.response, null, 2);
// }

// AjaxRequest.prototype.getResponseXML = function() {
//   return this.httpRequest.responseXML;
// }