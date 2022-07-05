

function Project() {
	if(!(this instanceof Project)){
		return new Project();
	}
	this.target = null;
	this.observe = null;
}
Project.prototype.init = function(){
	let work = document.querySelectorAll(".projects");
	let that = this;
	work.forEach(w => that.createObserve(w));
}
Project.prototype.createObserve = function(target) {
	let observer;

	let options = {
		root: null,
		rootMargin: "100px 0px 0px 0px",
		threshold: 1
	};

	observer = new IntersectionObserver(this.handleIntersect.bind(this, arguments), options);
	observer.observe(target);
	this.observe = observer;
}
Project.prototype.handleIntersect = function (args, entries, observer) {
	let that = this;
	entries.forEach(entry => {
		if (!entry.isIntersecting) return;
		that.target = entry.target;
		let group = that.target.getElementsByTagName('img');
		for (let img = 0; img < group.length; img++) {
			var src = group[img].getAttribute('data-src');
			that.loaded(src, group[img])
				.then((image) => that.fadeIn(image))
				.then(() => that.showContent());
 		}
	})
}
Project.prototype.loaded = async function(url, el) {
	return new Promise((resolve, reject) => {
		if (el.src) {
			this.observe.unobserve(this.target);
			resolve(el);
			return;
		}
		el.onload = () => resolve(el);
		el.style.opacity = 0;
		el.onerror = reject;
		el.src = url;
	});
}
Project.prototype.showContent = function(){
	let content = this.target.getElementsByClassName('projects__side--content')[0];
	let title = this.target.getElementsByClassName('projects__side--title')[0];
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

let p = new Project();
window.addEventListener("load", () => p.init() )

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