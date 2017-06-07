var loginBtn = document.getElementById('login')
	var registerBtn = document.getElementById('register')

console.log('LOGIN FORM')
window.onload=function(){console.log('we loaded')}


	loginBtn.addEventListener('click', handleClick, true)
	registerBtn.addEventListener('click', handleClick, true)


	function handleClick(e){
		var action = e.target.innerText
		console.log(action)
		if(action==='Login'){
			getLoginInfo()


		}else if(action==='Register'){
			getRegisterInfo()

		}


	}

	function getRegisterInfo(){
		removeFixItClass()
		console.log('Lets register the new user')
		var username = document.querySelector('input[name="register_username"]').value
		var password = document.querySelector('input[name="register_password"]').value
		var verifypassword = document.querySelector('input[name="verifypassword"]').value
		console.log(username)
		console.log(password)
		console.log(verifypassword)
		if(verifyFileds(username, password, verifypassword)){
			var data={
				username:username,
				password: password
			}
			console.log('all verified!  register this user')
			POST('http://127.0.0.1:7777/register', data, function(resp){
				var resp = JSON.parse(resp)
				console.log(resp)
				if(resp.err){
					loginErr.innerText=''
					console.log('error')
					var registerErr = document.getElementById('registerError')
					registerErr.innerText=resp.err
				}else if(resp.success && resp.userData && resp.logggedIn===true){
					console.log(resp.userData)
					localStorage.setItem('username', username)
					console.log('redirect to '+resp.redirect)
					var loginErr = document.getElementById('registerError')
					loginErr.innerText=resp.success
					// setTimeout(function(){window.location.href=resp.redirect}, 500)
				}
				

			})

		}

	}

	function getLoginInfo(){
		removeFixItClass()
		console.log('Lets login the returning user')
		var username = document.querySelector('input[name="login_username"]').value
		var password = document.querySelector('input[name="login_password"]').value
		console.log(username)
		console.log(password)
		if(verifyFileds(username, password)){
			var data={
				username:username,
				password: password
			}
			console.log('all verified!  login this user')
			POST('http://127.0.0.1:7777/login', data, function(resp){
				var resp = JSON.parse(resp)
				console.log(resp)
				var loginErr = document.getElementById('loginError')
				if(resp.err){
					loginErr.innerText=''
					removeFixItClass()
					removePreviousErrorMessage()
					console.log('error')
					loginErr.innerText=resp.err
				}else if(resp.success && resp.userData && resp.logggedIn===true){
					console.log(resp.userData)
					localStorage.setItem('username', username)
					console.log('redirect to '+resp.redirect)
					loginErr.innerText=resp.success
					// setTimeout(function(){window.location.href=resp.redirect}, 500)
				}

			})
		}else{

		}


	}
	function removeFixItClass(){
		console.log('fix it')
		var fixEl = document.getElementsByClassName('fixIt')
		console.log(fixEl)
		for(let x = 0;x<fixEl.length;x++){

				fixEl[x].classList.remove('fixIt')
				console.log('removed')
			}

		
	}

	function removePreviousErrorMessage(){
		var errorDisplay = document.getElementsByClassName('errorDisplay')
		console.log(errorDisplay)
		for(let x = 0;x<errorDisplay.length;x++){
			if(errorDisplay[x].id=='registerError'||errorDisplay[x].id=='loginError') {
				console.log('continue')
				continue
			}else{
				errorDisplay[x].parentNode.removeChild(errorDisplay[x])
			}
		}
	}

	function addRemoveErrMsg(errMsg, divWindow, x){
		removePreviousErrorMessage()
		console.log(errMsg)
		console.log(divWindow)
		console.log(x)
		var errorDisplay = document.createElement('div')
		errorDisplay.classList.add('errorDisplay')
		errorDisplay.innerText = errMsg
		divWindow.children[x].append(errorDisplay)
	}

	function tellUserToFixIt(type, x, errMsg){
		removeFixItClass()
		var divWindow;
		if (type === 'register') {
			divWindow = document.getElementsByClassName('registerForm')[0]
			divWindow.children[x].classList.add('fixIt')
			addRemoveErrMsg(errMsg, divWindow, x)
		}else if(type=== 'login'){
			divWindow = document.getElementsByClassName('loginForm')[0]
			divWindow.children[x].classList.add('fixIt')
			addRemoveErrMsg(errMsg, divWindow, x)


		}

	}

	function verifyFileds(args){
		var type=''
		if(arguments.length===3){
			type='register'
		}else{
			type='login'
		}
		console.log(arguments)
		for(let x = 0;x<arguments.length;x++){
			console.log(arguments[x])
			if(arguments[x].length < 5){
				var errMsg = 'Value must be longer that 5 characters '
				console.log(errMsg)
				tellUserToFixIt(type, x, errMsg)
				return false
			}else if(arguments[x].indexOf("'")!=-1){
				var errMsg = 'invalid character " \' "'
				console.log(errMsg)
				tellUserToFixIt(type, x, errMsg)
				return false
			}

		}
		return true

	}



	function POST(url, data, callback){
		console.log('sending data')
		console.log(data)
		var data = JSON.stringify(data)
		var request = new XMLHttpRequest();
		request.open('POST', url, true);
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		// request.setRequestHeader('Content-Type', 'application/json');
		request.send(data);
		request.onload=function(){
			callback(request.responseText)
		}
	}

	function GET(url, callback){
		var request = new XMLHttpRequest();
		request.open('GET', url, true);

		request.onload = function() {
		  if (request.status >= 200 && request.status < 400) {
		    // Success!
		    var data = JSON.parse(request.responseText);
		    callback(data)
		  } else {
		    // We reached our target server, but it returned an error

		  }
		};

		request.onerror = function() {
		  // There was a connection error of some sort
		};

		request.send();
	}


