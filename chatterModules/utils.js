var $Util = (function(){
	function geid(el){
		return document.getElementById(el)
	}
	function gecn(el){
		return document.getElementsByClassName(el)
	}
	function dce(el){
		return docuemnt.createElement(el)
	}
	function request(URL, method, data, callback){
		var request = new XMLHttpRequest();
		var resp = {}
		request.open(method, URL, true);

		request.onload = function() {
		  if (request.status >= 200 && request.status < 400) {
		    // Success!
		    resp.response = request.responseText;
		    callback(resp.response)

		  } else {
		    // We reached our target server, but it returned an error
		    resp.err = 'err'
		    callback(resp.err)

		  }
		};

		request.onerror = function() {
		  // There was a connection error of some sort
		};

		request.send();
	}

	function serialize(obj) {
	  var str = [];
	  for(var p in obj)
	    if (obj.hasOwnProperty(p)) {
	      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	    }
	  return str.join("&");
	}


return {
	geid:geid,
	dgcn: gecn,
	dce:dce,
	request:request,
	serialize:serialize
}


})()

$Util.geid('one')
