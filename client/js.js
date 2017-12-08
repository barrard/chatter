'use strict'
var apiKey;
var username;

function evalScript(parent){

	var arr = parent.getElementsByTagName('script')
	for(let x = 0;x<arr.length;x++){
		eval(arr[x].innerHTML)

	}
}

var Data ={
	username:'',
	apikey:''
}



var app = document.getElementById('app')
CheckIfLoggedIn()
function CheckIfLoggedIn(){
	GET('/chatter/checkIfLoggedin', function(data){
		var data = JSON.parse(data)
		console.log('checkIfLoggedIn')
		console.log(data.loggedIn)
		console.log(data)
		if(!data.loggedIn){
			//not yet loggedIn so load up the login Form
			var template = document.getElementById('login-template').innerHTML
			app.innerHTML=template
			evalScript(app)
		}else if(data.loggedIn===true){
			//load the admin page
			var template = document.getElementById('admin-template').innerHTML
			app.innerHTML=template

			Data.apikey=data.apikey
			Data.username=data.username

			evalScript(app)



		}
		
	})

}





function GET(url, callback){
	var request = new XMLHttpRequest();
	request.withCredentials=true;

	request.open('GET', url, true);

	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
	  	console.log('successful ajax to '+url)
	    var respObj = JSON.parse(request.responseText);
	    console.log('onload from a GET request to '+url)
	    console.log(respObj)

	    if(respObj.loggedIn===false){
	    	setTimeout(function(){
	    		var template = document.getElementById('login-template').innerHTML
	    		app.innerHTML=template
	    		evalScript(app)
	    	}, 500)
	    }else{
	    	callback(request.responseText)

	    }

	  } else {
	    console.log('failed ajax to '+url)

	  }
	};

	request.onerror = function() {
	  // There was a connection error of some sort
	};

	request.send();
}


function POST(url, data, callback){
	console.log('sending data')
	console.log(data)
	var data = JSON.stringify(data)
	var request = new XMLHttpRequest();
	request.withCredentials=true;
	request.open('POST', url, true);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	// request.setRequestHeader('Content-Type', 'application/json');
	request.send(data);
	request.onload=function(){
		var respObj = JSON.parse(request.responseText)
		console.log('onload from a POST request to '+url)
		console.log(respObj)
		if(respObj.loggedIn===false){
			setTimeout(function(){
				var template = document.getElementById('login-template').innerHTML
				app.innerHTML=template
				evalScript(app)
			}, 500)
		}else{
			callback(request.responseText)

		}
	}
}

function $(el){
	return document.getElementById(el)
}
function $$(el){
	return document.getElementsByClassName(el)
}
function dce(el){
	return document.createElement(el)
}