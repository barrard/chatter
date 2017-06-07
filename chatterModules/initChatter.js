var Chatter = (function(coreModule){
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

function checkForChatterBox(){
	if($Util.dgcn('chatter').length > 0){
		return false
	}else{
		return true
	}
}

var socket={};

function createChatLogo(chatBox){
	var talkBubble = document.createElement('div')
	talkBubble.innerText = 'CHAT'
	var tbs = talkBubble.style
				tbs.padding='15%';
				tbs.fontFamily= 'Rock Salt, cursive';
				tbs.textAlign='center';
				tbs.position='absolute';
				tbs.top='0px';
				tbs.bottom='0px';
				tbs.left='0px';
				tbs.right='0px';
				tbs.border='3px solid green';
				// tbs.background='linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)';
				tbs.background='linear-gradient(to right, red, orange, yellow, green)';
				tbs.borderRadius='50%';
				tbs.marginTop='15px';
				tbs.marginBottom='15px';	

	var chatTriangle = document.createElement('div')
	var cts= chatTriangle.style
				cts.position='absolute';
				cts.right='9%';
				cts.bottom='-11%';
				cts.width='44px';
				cts.height='15px';
				cts.borderWidth='10px 5px 5px 15px';
				cts.borderColor='transparent green red transparent';
				cts.borderStyle='solid';
				cts.transform='rotate(17deg)';
				cts.background='linear-gradient(green, red)';
				cts.zIndex='-1';
		


	talkBubble.appendChild(chatTriangle)
	chatBox.appendChild(talkBubble)
}

//funcions

function joinDomainChat(socket){
	var hostname = document.location.hostname;
	console.log(hostname+' is the room i like join ')
	socket.emit('requestingRoom', hostname)
}

	

function createcornerBox(){
	var chatBox = document.createElement('div')
	chatBox.classList.add('chatter')
	var cbs = chatBox.style;
			cbs.width='100px';
			cbs.height='100px';
			cbs.position='fixed';
			cbs.bottom='10%';
			cbs.right='0px';
			cbs.margin='10px';
			cbs.borderRadius='10px';
			cbs.overflow='visible';
			cbs.zIndex='100';
			cbs.border='1px solid red';

			return chatBox
}
function createChatter(){

	coreModule.original = 'this is the original'
	if(!checkForChatterBox()) {
		console.log('done already');
		return
	}else{
		console.log('first')

			var chatBox = createcornerBox()
			createChatLogo(chatBox)
			document.body.appendChild(chatBox)
			// dgcn(_HTMLeleemnt)[0].appendChild(chatBox)

			chatBox.addEventListener('mouseover', function(e){
				// e.stopPropagation()
				chatBox.style.backgroundColor = 'tomato'
				// console.log('mouseover')
			}, false)
			chatBox.addEventListener('mouseleave', function(e){
				// e.stopPropagation()
				chatBox.style.backgroundColor = 'white'
				// console.log('mouseleave')
			}, false)

			chatBox.addEventListener('click', function openChatApp(e){
				e.stopPropagation()
				if(dgid('chatterChatWindow')){
					var cw = dgid('chatterChatWindow')
					if(cw.style.display == "block"){
						console.log('its block, hide it now')
						cw.style.display='none'
					}else if(cw.style.display == "none"){
						console.log('its hide make me see it now')
						cw.style.display='block'

					}
				}else{
					// socket = io.connect('http://192.168.0.93:7777');
					socket = io.connect('http://66.8.168.178');

					console.log('got a socket object?')
					console.log(socket)
					socket.on('socketCount', function(d){
						dgid('_ChatUserCount').innerText=d
					})
					socket.on('serverID', function(d){
						console.log(d)
						
						dgid('_ChatteruserID').innerText=d

					})
					socket.on('inputText', function(d){
						addInputTextToChatWindow(d)

					})

					joinDomainChat(socket)

					socket.on('roomJoined', function(roomJoined){
						console.log('you joined '+roomJoined)
					})




					
					var chatWindow = document.createElement('div')
					chatWindow.id = 'chatterChatWindow'
					var container = chatBox.parentNode
					var cws = chatWindow.style;
						cws.display='block';
						cws.position='absolute';
						cws.width='250%';
						cws.height='400%';
						cws.top='-350%';
						cws.right='10px';
						cws.backgroundColor='tomato';

						//get/give a name to this person
						var uNameInputContainer = dce('div')
						var span = dce('span');
						span.innerText = 'Please select a name, or enter as a guest '
						uNameInputContainer.id='_ChatUsernameInputContainer'
						var usernameInput = dce('input')
						usernameInput.id='_ChatUserNameInput'
						usernameInput.placeholder='{guest}'+Math.floor(Math.random()*(11111-11)+11)
						usernameInput.type = 'text'
						var submitBtn = dce('button')
						submitBtn.innerText = 'Begin Chat'
						uNameInputContainer.append(span)
						uNameInputContainer.append(usernameInput)
						uNameInputContainer.append(submitBtn)
						chatWindow.append(uNameInputContainer)
						submitBtn.addEventListener('click', function(){
							var uName = dgid('_ChatUserNameInput')
							if(uName.value.length>0){
								socket.emit('usernameInput', uName.value)

							}else{
								socket.emit('usernameInput', uName.placeholder)

							}
							uNameInputContainer.style.display='none'
							createChatterWindowWidgets(chatWindow)

						})



				
					chatBox.appendChild(chatWindow)
					chatWindow.addEventListener('mouseover', function(e){
						e.stopPropagation()
					// 	// chatBox.style.backgroundColor = 'tomato'
					// 	console.log('mouseover chatWindow')
					}, false)
					chatWindow.addEventListener('mouseleave', function(e){
						e.stopPropagation()
					// 	// chatBox.style.backgroundColor = 'white'
					// 	console.log('mouseleave chatWindow')
					}, false)

					chatWindow.addEventListener('click', function(e){
						//prevents windwo from closing 
						e.stopPropagation()
					}, false)
				}


			}, false)


			var googlefontlink = document.createElement('link')
			googlefontlink.href = 'https://fonts.googleapis.com/css?family=Rock+Salt'
			googlefontlink.rel="stylesheet"
			document.getElementsByTagName('head')[0].appendChild(googlefontlink)
			var chatterStyles = document.createElement('link')
			// chatterStyles.href = 'http://192.168.0.93:7777/chatter.css'
			chatterStyles.href = 'http://66.8.168.178/chatter.css'
			
			chatterStyles.rel="stylesheet"
			document.getElementsByTagName('head')[0].appendChild(chatterStyles)
			console.log('chater stlyes appeneded')

				var script = document.createElement('script')
				// console.log(window.location)
				script.src = 'http://66.8.168.178/socket.io/socket.io.js'
				// script.src = 'http://192.168.0.93:7777/socket.io/socket.io.js'
				document.getElementsByTagName('head')[0].appendChild(script)
}
	
		var chatterComponentsArray = [createChatterHead, createChatLog, createChatterInputSend]


		function createChatterHead(chatWindow){
			var head = dce('div')
			head.classList.add('_ChatWindowHeader')
			head.id='_ChatHeader'
			head.innerHTML = `Hello, <span id="_ChatteruserID"></span></p><a>Edit Name</a>
								<br>
							Total users: <span id="_ChatUserCount"></span>
							`
			chatWindow.append(head)
		}

		function createChatLog(chatWindow){
			var chatLog = dce('div')
			chatLog.id='_ChatLog'
			var cs = chatLog.style 
			cs.width = '100%'
			cs.height = "50%"
			cs.background = 'cyan'
			// cs.overflowY = "scroll"
			// cs.overflowX = "hidden"
			
			chatWindow.append(chatLog)
		}

		function createChatterInputSend(chatWindow){
			var inputText = dce('input')
			inputText.type='text'
			inputText.id='_ChatInputText'
			var sendButton = dce('button')
			sendButton.innerText='send'
			sendButton.addEventListener('click', sendChatToServer, false)
			chatWindow.append(inputText)
			chatWindow.append(sendButton)

			function sendChatToServer(e){
				var textObj ={}
				console.log('sending inputText out')
				var input = dgid('_ChatInputText')
				textObj.sender=dgid('_ChatteruserID').innerText
				textObj.text = input.value
				socket.emit('inputText', textObj)

				addInputTextToChatWindow(textObj)
				input.value = ''
			}

		}


		function createChatterWindowWidgets(chatWindow){
			chatterComponentsArray.forEach(function(fn){
				fn(chatWindow)
			})


		}

//this function adds a textObj to the #_ChatLog
		function addInputTextToChatWindow(textObj){
			var chatLog =dgid('_ChatLog')
			var newInputLine = dce('div')
			var sender = dce('span')
			sender.classList.add('_ChatSender')
			sender.innerText=textObj.sender
			var text = dce('span')
			text.classList.add('_ChatText')
			text.innerText = textObj.text
			var date = dce('div')
			date.classList.add('_ChatTimestamp')
			var d = new Date()
			// d.toString().split(' ')
			var day = d.getDate()+1
			var month = d.getMonth()+1
			var year = d.getYear()+1900
			var hour = d.getHours()+1
			var minute = d.getMinutes()+1
			date.innerText=month+'/'+day+'/'+year+'  -  '+hour+':'+minute
			newInputLine.append(sender)
			newInputLine.append(text)
			newInputLine.append(date)
			chatLog.append(newInputLine)
			console.log(textObj)
		}


		

	}



	coreModule.createChatter = createChatter
	coreModule.socket = socket
	return coreModule

}(Chatter || {}))



