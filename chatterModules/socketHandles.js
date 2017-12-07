var Chatter = (function(module){
	'use strict'
	var queryShadowDom = Chatter.queryShadowDom
	var socket;

	function initSocket(){
		 socket = io.connect('http://192.168.0.93:8081');
				// socket = io.connect('http://66.8.168.178');
				socket.on('connection', function(msg){
					if(Chatter.getUsername() !== undefined){
						socket.emit('newChatter', {username:Chatter.getUsername(), socketId:socket.id})

					}else{
						socket.emit('usernameTest', {username:Chatter.getUsername(), socketId:socket.id})

					}
				})

	// socket.on('connection', function(){
	// 	socket.emit('newConnection', Chatter.getUsername())
	// })
	socket.on('test', function(){
		console.log('socket test')
	})

	socket.on('newChatter', function(socketUsernameObj) {

		console.log('newChatter emited')
		console.log(socketUsernameObj)
		Chatter.insertUserInList(socketUsernameObj)

	    // getShadowEl('#chatterChatWindow','#_ChatHeader','#_ChatUserCount').innerText = d
	})
	socket.on('newChatterInit', function(socketObjArray) {
		console.log('user has selected a name, and the server acknowledge by sending the userlist array to build the display')
	    console.log(socketObjArray)

	    Chatter.createUserList(socketObjArray)


	})
	socket.on('inputText', function(d) {
	    Chatter.addInputTextToChatWindow(d)

	})


	socket.on('roomJoined', function(roomJoined) {
	    console.log('you joined ' + roomJoined)
	    Chatter.createRoomTab(roomJoined)
	})



	socket.on('userDisconnected', function(obj){
		console.log('remove')
		console.log(obj)
		var id = obj.id
		Chatter.removeSocketObjInList(id)
		//reRender the chat list
		Chatter.renderUserList()


	})





	}



			function getSocket() {
				return socket
			}


			function joinDomainChat() {
				var hostname = document.location.hostname;
				console.log(hostname + ' is the room i like join ')
				socket.emit('requestingRoom', hostname)
			}

			function emitNewChatter( socketNameObj){
				socket.emit('newChatter', socketNameObj)
			}


	


	function sendChatToServer(type, textObj){
				socket.emit(type, textObj)


			}


	module.emitNewChatter = emitNewChatter
	module.sendChatToServer = sendChatToServer
	module.socket = socket
	module.getSocket = getSocket;
	module.initSocket = initSocket;

	module.joinDomainChat = joinDomainChat


	return module
})(Chatter || {})



