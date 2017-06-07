console.log('admin setup')
'use strict';
var dgcn = function(el){
return document.getElementsByClassName(el)
}
var dgid = function(el){
	return document.getElementById(el)
}
var dce = function(el){
	return document.createElement(el)
}


console.warn('Your not registered yet')

// function clickHandlerOpenBox(chatBox){

// 	chatBox.addEventListener('click', function openChatApp(e){
// 		e.stopPropagation()
// 		if(dgid('chatterChatWindow')){
// 			var cw = dgid('chatterChatWindow')
// 			if(cw.style.display == "block"){
// 				console.log('its block, hide it now')
// 				cw.style.display='none'
// 			}else if(cw.style.display == "none"){
// 				console.log('its hide make me see it now')
// 				cw.style.display='block'

// 			}
// 		}else{
// 			socket = io.connect('http://192.168.0.93:8081');
// 			console.log('got a socket object?')
// 			console.log(socket)
// 			// socket = io.connect('http://66.8.168.178:8081');
// 			socket.on('socketCount', function(d){
// 				dgid('_ChatUserCount').innerText=d
// 			})
// 			socket.on('serverID', function(d){
// 				console.log(d)
				
// 				dgid('_ChatteruserID').innerText=d

// 			})
// 			socket.on('inputText', function(d){
// 				addInputTextToChatWindow(d)

// 			})

// 			var chatWindow = document.createElement('div')
// 			chatWindow.id = 'chatterChatWindow'
// 			var container = chatBox.parentNode
// 			var cws = chatWindow.style;
// 				cws.display='block';
// 				cws.position='absolute';
// 				cws.width='250%';
// 				cws.height='400%';
// 				cws.top='-350%';
// 				cws.right='10px';
// 				cws.backgroundColor='tomato';

// 				//get/give a name to this person
// 				var uNameInputContainer = dce('div')
// 				var span = dce('span');
// 				span.innerText = 'Please select a name, or enter as a guest '
// 				uNameInputContainer.id='_ChatUsernameInputContainer'
// 				var usernameInput = dce('input')
// 				usernameInput.id='_ChatUserNameInput'
// 				usernameInput.placeholder='{guest}'+Math.floor(Math.random()*(11111-11)+11)
// 				usernameInput.type = 'text'
// 				var submitBtn = dce('button')
// 				submitBtn.innerText = 'Begin Chat'
// 				uNameInputContainer.append(span)
// 				uNameInputContainer.append(usernameInput)
// 				uNameInputContainer.append(submitBtn)
// 				chatWindow.append(uNameInputContainer)
// 				submitBtn.addEventListener('click', function(){
// 					var uName = dgid('_ChatUserNameInput')
// 					if(uName.value.length>0){
// 						socket.emit('usernameInput', uName.value)

// 					}else{
// 						socket.emit('usernameInput', uName.placeholder)

// 					}
// 					uNameInputContainer.style.display='none'
// 					createChatterWindowWidgets(chatWindow)

// 				})



		
// 			chatBox.appendChild(chatWindow)
// 			chatWindow.addEventListener('mouseover', function(e){
// 				e.stopPropagation()
// 			// 	// chatBox.style.backgroundColor = 'tomato'
// 			// 	console.log('mouseover chatWindow')
// 			}, false)
// 			chatWindow.addEventListener('mouseleave', function(e){
// 				e.stopPropagation()
// 			// 	// chatBox.style.backgroundColor = 'white'
// 			// 	console.log('mouseleave chatWindow')
// 			}, false)

// 			chatWindow.addEventListener('click', function(e){
// 				//prevents windwo from closing 
// 				e.stopPropagation()
// 			}, false)
// 		}


// 	}, false)

// }


// 	function adminLogo(adminBox){
// 		var talkBubble = document.createElement('div')
// 		talkBubble.innerText = 'Admin Register'
// 		var tbs = talkBubble.style
// 					tbs.padding='15%';
// 					tbs.fontFamily= 'Rock Salt, cursive';
// 					tbs.textAlign='center';
// 					tbs.position='absolute';
// 					tbs.top='0px';
// 					tbs.bottom='0px';
// 					tbs.left='0px';
// 					tbs.right='0px';
// 					tbs.border='3px solid green';
// 					tbs.background='linear-gradient(to right, white, grey)';
// 					tbs.borderRadius='50%';
// 					tbs.marginTop='15px';
// 					tbs.marginBottom='15px';	

// 		var chatTriangle = document.createElement('div')
// 		var cts= chatTriangle.style
// 					cts.position='absolute';
// 					cts.right='9%';
// 					cts.bottom='-11%';
// 					cts.width='44px';
// 					cts.height='15px';
// 					cts.borderWidth='10px 5px 5px 15px';
// 					// cts.borderColor='transparent green red transparent';
// 					cts.borderStyle='solid';
// 					cts.transform='rotate(17deg)';
// 					// cts.background='linear-gradient(green, red)';
// 					cts.zIndex='-1';
			


// 		talkBubble.appendChild(chatTriangle)
// 		adminBox.appendChild(talkBubble)
// 	}


// 	function createcornerBox(){
// 		var chatBox = document.createElement('div')
// 		chatBox.classList.add('chatter')
// 		var cbs = chatBox.style;
// 				cbs.width='100px';
// 				cbs.height='100px';
// 				cbs.position='absolute';
// 				cbs.bottom='10%';
// 				cbs.right='0px';
// 				cbs.margin='10px';
// 				cbs.borderRadius='10px';
// 				cbs.overflow='visible';
// 				cbs.zIndex='100';
// 				cbs.border='1px solid red';

// 				return chatBox
// 	}

// 	function addIO(){
// 		var script = document.createElement('script')
// 		// console.log(window.location)
// 		// script.src = 'http://66.8.168.178:8081/socket.io/socket.io.js'
// 		script.src = 'http://192.168.0.93:8081/socket.io/socket.io.js'
// 		document.getElementsByTagName('head')[0].appendChild(script)

			
// 	}

// 	addIO()
// 	var adminBox = createcornerBox()
// 	adminLogo(adminBox)
// 	clickHandlerOpenBox(adminBox)
// 	document.body.append(adminBox)