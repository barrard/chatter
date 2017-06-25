
var $Util = (function(){
'use strict'
	    var dgcn = function(el) {
	        return document.querySelectorAll(el)
	    }
	    var dgid = function(el) {
	        return document.querySelector(el)
	    }

	    function query(dom, el){
	    	return dom.querySelector(el)
	    }
	    var getShadowEl = function(el){
	    	console.log(arguments.length)
	    	console.log('we run this '+arguments.length+' times')
	    	var shadowRoot = getChatterRoot()
	    	var first = query(shadowRoot, arguments[0])
	    	if(arguments.length>1){
	    		console.log('greater than 1')
	    		var count = 1
	    		while(count<arguments.length){
	    			console.log(arguments[count])
	    			first = query(first, arguments[count])
	    			count++
	    			console.log('count is '+count)
	    			if(count==arguments.length){
	    				console.log('is this really worth is?')
	    				console.log(first)
	    				return first
	    			}
	    		}

	    	}else{
	    		console.log('just one thing ran')
	    		return(first)
	    	}


	    }
	    function queryShadowDom(el){
	    	var root = getChatterRoot()
	    	return root.querySelector(el)
	    }
	    function getChatterRoot(){
	    	return document.querySelector('._cornerChatBox').shadowRoot
		}
	    var dce = function(el) {
	        return document.createElement(el)
	    }




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
	serialize:serialize,
	queryShadowDom:queryShadowDom
}


})()

$Util.geid('one')



