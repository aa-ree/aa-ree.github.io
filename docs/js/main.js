

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
 			img[j].onload = function(){
 				count++;
 				that.start(count, img.length);
 			}
 			img[j].src = img[j].getAttribute('data-src');
 			img[j].style.opacity = 0;
 		}

 	// var xhr = new AjaxRequest();
 	// xhr.send('','//ipinfo.io/','','');
}
Project.prototype.start = function(count, max){
	//if(count !== max ) return false;
	var right = document.getElementsByClassName('projects__side--desc'), that = this;
	for(var r =0; r<right.length; r++){
		var div = right[r].getElementsByTagName('div')[0],
	  		h2 = right[r].getElementsByTagName('h2')[0],
	  		img = document.getElementsByTagName('img');

	  for(var i = 0; i < img.length; i++){
	  	that.fadeIn(img[i]);
	  }

	  that.fadeIn(h2);
	  that.fadeIn(div);
	  h2.innerHTML = h2.getAttribute('data-title');
		div.innerHTML = div.getAttribute('data-content');
  }
}
Project.prototype.fadeIn = function(el){
	el.style.opacity = 0;
  (function fade() {
		var val = parseFloat(el.style.opacity);
	 	if ((val += .1) <= 1){
	  	el.style.opacity = val;
	  	requestAnimationFrame(fade);
	  }
  })();
}

function AjaxRequest(){

	if(window.XMLHttpRequest){
		this.httpRequest = new XMLHttpRequest();
		if(this.httpRequest.overrideMimeType){
			this.httpRequest.overrideMimeType('text/xml');
		}
	} else if(window.ActiveXObject){
		try{
			this.httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e){
			try{
				this.httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e){}
		}
	}

	if (!this.httpRequest){
		console.log('Cannot create XHR object');
		return false;
	}
}

AjaxRequest.prototype.send = function(type, url, asyn, postData) {
	var that = this;
	this.httpRequest.onreadystatechange = function(){
		if(that.getReadyState() === 4 && that.getStatus() === 200){
			//var mail = new SendMail(that.getResponse());
		} else {
			console.log('something wrong...');
		}
	};
	type = type || 'GET';
	if(type === 'POST'){
		this.httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	}
	asyn = asyn || true;
	postData = postData || null;
	this.httpRequest.open(type, url, asyn);
	this.httpRequest.send(postData);
}

AjaxRequest.prototype.getReadyState = function() {
  return this.httpRequest.readyState;
}

AjaxRequest.prototype.getStatus = function() {
  return this.httpRequest.status;
}

AjaxRequest.prototype.getResponseText = function() {
  return this.httpRequest.responseText;
}
AjaxRequest.prototype.getResponse = function() {
  return JSON.stringify(this.httpRequest.response, null, 2);
}

AjaxRequest.prototype.getResponseXML = function() {
  return this.httpRequest.responseXML;
}

var p = new Project();
window.onload = p.init;