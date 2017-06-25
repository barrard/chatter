var Chatter = (function(coreModule) {
	'use strict';
	var dgcn = function(el) {
		return document.querySelectorAll(el)
	}
	var dgid = function(el) {
		return document.querySelector(el)
	}

	function query(dom, el) {
		return dom.querySelector(el)
	}
	var getShadowEl = function(el) {
		console.log(arguments.length)
		console.log('we run this ' + arguments.length + ' times')
		var shadowRoot = getChatterRoot()
		var first = query(shadowRoot, arguments[0])
		if (arguments.length > 1) {
			console.log('greater than 1')
			var count = 1
			while (count < arguments.length) {
				console.log(arguments[count])
				first = query(first, arguments[count])
				count++
				console.log('count is ' + count)
				if (count == arguments.length) {
					console.log('is this really worth is?')
					console.log(first)
					return first
				}
			}

		} else {
			console.log('just one thing ran')
			return (first)
		}


	}

	function queryShadowDom(el) {
		var root = getChatterRoot()
		return root.querySelector(el)
	}

	function getChatterRoot() {
		return document.querySelector('._cornerChatBox').shadowRoot
	}
	var dce = function(el) {
		return document.createElement(el)
	}

	function checkForChatterBox() {
		// if ($Util.dgcn('chatter').length > 0) {
		if ($Util.dgcn('_cornerChatBox').length > 0) {
			return false
		} else {
			return true
		}
	}
	var chatterCSS = Chatter.shadowCSS;
	//new
	var chatBox;

	function createChatLogo(chatBox) {
		var talkBubble = document.createElement('div')
		talkBubble.innerText = 'CHAT!'
		talkBubble.classList.add('_talkBubble')
		//wouldnt work without this on my iphone
		talkBubble.addEventListener('click', openChatApp, false)

		var tbs = talkBubble.style
		// tbs.boxShadow='10px 10px 1px 1px rgba(100, 100, 100, 0.5)'
		// tbs.padding = '15%';
		// tbs.fontFamily = 'Rock Salt, cursive';
		// tbs.textAlign = 'center';
		// tbs.position = 'absolute';
		// tbs.top = '0px';
		// tbs.bottom = '0px';
		// tbs.left = '0px';
		// tbs.right = '0px';
		// tbs.border = '3px solid green';
		// // tbs.background='linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)';
		// tbs.background = 'linear-gradient(to right, red, orange, yellow, green)';
		// tbs.borderRadius = '50%';
		// tbs.marginTop = '15px';
		// tbs.marginBottom = '15px';

		var chatTriangle = document.createElement('div')
		chatTriangle.classList.add('_talkTriangle')
		// var cts = chatTriangle.style
		// cts.boxShadow='10px 10px 1px 1px rgba(100, 100, 100, 0.5)'

		// cts.position = 'absolute';
		// cts.right = '9%';
		// cts.bottom = '-11%';
		// cts.width = '44px';
		// cts.height = '15px';
		// cts.borderWidth = '10px 5px 5px 15px';
		// cts.borderColor = 'transparent green red transparent';
		// cts.borderStyle = 'solid';
		// cts.transform = 'rotate(17deg)';
		// cts.background = 'linear-gradient(green, red)';
		// cts.zIndex = '-1';

		// console.log('chatBox is this a shadow root?')
		// if(chatBox.attachShadow({mode:'open'}) ){
		//  console.log('has root')
		// }else{
		//  console.log('were broken')
		// }
		// console.log('chatBox')
		// console.log('chatBox')
		// console.log(chatBox.innerHTML)

		talkBubble.appendChild(chatTriangle)
		chatBox.shadowRoot.appendChild(talkBubble)

		console.log('chatBox.innerHTML after adding talkbubble')
		// console.log(chatBox.innerHTML)

	}

	//funcions




	function createcornerBox() {
		var chatBox = document.createElement('div')
		chatBox.classList.add('_cornerChatBox')
		var cbs = chatBox.style;
		cbs.width = '100px';
		cbs.height = '100px';
		cbs.position = 'fixed';
		cbs.bottom = '10%';
		cbs.right = '0px';
		cbs.margin = '10px';
		cbs.borderRadius = '10px';
		cbs.overflow = 'visible';
		cbs.zIndex = '00';
		cbs.border = '1px solid red';
		var chatBoxShadow = chatBox.attachShadow({
			mode: 'open'
		})
		chatBox.shadowRoot.innerHTML += chatterCSS

		console.log('Was root created?')
		console.log(chatBox.shadowRoot)


		return chatBox
	}

	function createChatter() {
		if (!checkForChatterBox()) {
			console.log('done already');
			return
		} else {
			console.log('createChatBox')
			addScript_And_Googlefont()
			chatBox = createcornerBox()
			createChatLogo(chatBox)
			document.body.appendChild(chatBox)
			// dgcn(_HTMLeleemnt)[0].appendChild(chatBox)

			chatBox.addEventListener('mouseover', function(e) {
				// e.stopPropagation()
				chatBox.style.backgroundColor = 'tomato'
				// console.log('mouseover')
			}, false)
			chatBox.addEventListener('mouseleave', function(e) {
				// e.stopPropagation()
				chatBox.style.backgroundColor = 'white'
				// console.log('mouseleave')
			}, false)

			chatBox.addEventListener('click', openChatApp, false)
		}

	}

	function openChatApp(e) {
		e.stopPropagation()
		if (queryShadowDom('#chatterChatWindow')) {
			var cw = queryShadowDom('#chatterChatWindow')
			console.log(cw.style)
			if (cw.style.display == "block") {
				console.log('its block, hide it now')
				cw.style.display = 'none'
			} else if (cw.style.display == "none") {
				console.log('its hide make me see it now')
				cw.style.display = 'block'

			} else {
				console.log('failback consol log clicking the chatter window shoudl disappear')
			}
		} else {
			console.log('creating chat window')
			Chatter.initSocket()
			Chatter.joinDomainChat()
			var chatWindow = createChatterChatWindow()
			dgcn('._cornerChatBox')[0].shadowRoot.appendChild(chatWindow)
			queryShadowDom('#_ChatUserNameInput').focus()


		} //else need to create first time
	}

	function createChatterChatWindow() {

		var chatWindow = document.createElement('div')
		chatWindow.id = 'chatterChatWindow'
		var cws = chatWindow.style;
		cws.display = 'block';
		// cws.position = 'absolute';
		// cws.width = '250%';
		// cws.height = '400%';
		// cws.top = '-350%';
		// cws.right = '10px';
		// cws.backgroundColor = 'tomato';

		var uNameInputContainer = createNameInputContainer()
		chatWindow.append(uNameInputContainer)

		console.log('Focus')
		chatWindow.addEventListener('mouseover', function(e) {
			e.stopPropagation()
			//  // chatBox.style.backgroundColor = 'tomato'
			//  console.log('mouseover chatWindow')
		}, false)
		chatWindow.addEventListener('mouseleave', function(e) {
			e.stopPropagation()
			//  // chatBox.style.backgroundColor = 'white'
			//  console.log('mouseleave chatWindow')
		}, false)

		chatWindow.addEventListener('click', function(e) {
			//prevents windwo from closing 
			e.stopPropagation()
		}, false)
		return chatWindow
	}

	function addScript_And_Googlefont() {
		var googlefontlink = document.createElement('link')
		googlefontlink.href = 'https://fonts.googleapis.com/css?family=Rock+Salt'
		googlefontlink.rel = "stylesheet"
		document.getElementsByTagName('head')[0].appendChild(googlefontlink)
		var script = document.createElement('script')
		// script.src = 'http://66.8.168.178/socket.io/socket.io.js'
		// script.src = 'http://192.168.0.93:8081/socket.io/socket.io.js'
		script.src = 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js'
		document.getElementsByTagName('head')[0].appendChild(script)
	}

	function createNameInputContainer() {
		var uNameInputContainer = dce('div')
		var span = dce('span');
		span.innerText = 'Please select a name, or enter as a guest '
		uNameInputContainer.id = '_ChatUsernameInputContainer'
		var usernameInput = dce('input')
		usernameInput.id = '_ChatUserNameInput'
		usernameInput.placeholder = '{guest}' + Math.floor(Math.random() * (11111 - 11) + 11)
		usernameInput.type = 'text'

		var submitBtn = dce('button')
		submitBtn.innerText = 'Begin the Chat'
		uNameInputContainer.append(span)
		uNameInputContainer.append(usernameInput)
		uNameInputContainer.append(submitBtn)

		usernameInput.addEventListener('keydown', isEventEnter, true)

		function isEventEnter(e) {
			if (e.key === "Enter" || e.keyCode === 13) {
				//which form?
				simulateClick(submitBtn)
			}

		}

		submitBtn.addEventListener('click', function() {
			console.log('click submit')
			var uName = usernameInput
			var socketNameObj = {socketId:Chatter.getSocket().id,
								username:''}
			if (uName.value.length > 0) {
				socketNameObj.username = uName.value

			} else {
				socketNameObj.username = uName.placeholder


			}
			Chatter.setUsername(socketNameObj.username)
			// Chatter.insertUserInList(socketNameObj)
			Chatter.emitNewChatter(socketNameObj)

			uNameInputContainer.style.display = 'none'
			createChatterWindowWidgets(queryShadowDom('#chatterChatWindow'))
			queryShadowDom('#_ChatInputText').focus()

		})



		return uNameInputContainer
	}


	var chatterComponentsArray = [createChatterHead, createChatLog, createChatterInputSend]

	function createChatterHead(chatWindow) {
		var head = dce('div')
		head.classList.add('_ChatWindowHeader')
		head.id = '_ChatHeader'
		head.innerHTML = `<p>Hello, <span id="_Chatterusername">`+Chatter.getUsername()+`</span></p><button id="_editNameBtn">Edit Name</button>
                            <br>
                        Total users: <span id="_ChatUserCount"></span><div id='_listOfChatters'></div>
                        `
		chatWindow.append(head)
		queryShadowDom('#_listOfChatters').addEventListener('click', Chatter.ShowChattersList, true)

		queryShadowDom('#_editNameBtn').addEventListener('click', editUsernameFn, true)
		// getShadowEl('#chatterChatWindow','#_ChatHeader','#_editNameBtn').addEventListener('click', editUsernameFn, true)

	}


	function createChatLog(chatWindow) {
		var chatLog = dce('div')
		chatLog.id = '_ChatLog'
		var cs = chatLog.style
		// cs.width = '100%'
		// cs.height = "50%"
		// cs.background = 'cyan'
		// cs.overflowY = "scroll"
		// cs.overflowX = "hidden"

		chatWindow.append(chatLog)
	}

	function createChatterInputSend(chatWindow) {
		var inputText = dce('input')
		inputText.type = 'text'
		inputText.id = '_ChatInputText'
		var sendButton = dce('button')
		sendButton.innerText = 'send'

		function isEventEnter(e) {
			if (e.key === "Enter" || e.keyCode === 13) {
				//which form?
				simulateClick(sendButton)
			}

		}

		inputText.addEventListener('keydown', isEventEnter, true)
		sendButton.addEventListener('click', sendChatToServer, false)
		chatWindow.append(inputText)
		chatWindow.append(sendButton)



	}

	function createChatterWindowWidgets(chatWindow) {

		chatterComponentsArray.forEach(function(fn) {
			fn(chatWindow)
		})
	}


	function editUsernameFn() {
		var flag = false
		if (!queryShadowDom('#_editNameInput')) {
			console.log('edit name')
			console.log('curent name is ')
			var current_name = Chatter.getUsername()
			console.log(current_name)
			//create input box with current name inside
			var input = dce('input')
			input.id = '_editNameInput'
			input.type = 'text'
			input.placeholder = current_name
			queryShadowDom('#_editNameBtn').append(input)
			queryShadowDom('#_editNameInput').focus()
			flag = true
		}
		// dgcn('_cornerChatBox')[0].append(input)
	}

	function sendChatToServer(e) {
		var textObj = {}
		console.log('sending inputText out')
		var input = queryShadowDom('#_ChatInputText')
		textObj.sender = Chatter.getUsername()
		textObj.text = input.value
		Chatter.sendChatToServer('inputText', textObj)

		addInputTextToChatWindow(textObj)
		input.value = ''


	}

	function simulateClick(button) {
		var button;
		var event = new MouseEvent('click', {
			'view': window,
			'bubbles': true,
			'cancelable': true
		});

		button.dispatchEvent(event);

	}

	//this function adds a textObj to the #_ChatLog
	function addInputTextToChatWindow(textObj) {
		var chatLog = queryShadowDom('#_ChatLog')
		var newInputLine = dce('div')
		var sender = dce('span')
		sender.classList.add('_ChatSender')
		sender.innerText = textObj.sender
		var text = dce('span')
		text.classList.add('_ChatText')
		text.innerText = textObj.text
		var date = dce('div')
		date.classList.add('_ChatTimestamp')
		var d = new Date()
		// d.toString().split(' ')
		var day = d.getDate() + 1
		var month = d.getMonth() + 1
		var year = d.getYear() + 1900
		var hour = d.getHours() + 1
		var minute = d.getMinutes() + 1
		date.innerText = month + '/' + day + '/' + year + '  -  ' + hour + ':' + minute
		newInputLine.append(sender)
		newInputLine.append(text)
		newInputLine.append(date)
		chatLog.append(newInputLine)
		console.log(textObj)
		//chat window scrolltop = scroll height
		chatLog.scrollTop = chatLog.scrollHeight
	}





	function getChatBox(){
		return chatBox
	}



	coreModule.getChatBox = getChatBox;
	coreModule.createChatter = createChatter;
	coreModule.queryShadowDom = queryShadowDom;
	coreModule.addInputTextToChatWindow = addInputTextToChatWindow

	coreModule.simulateClick = simulateClick
	return coreModule

}(Chatter || {}))
