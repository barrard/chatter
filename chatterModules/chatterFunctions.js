//chatter functions
var Chatter = (function(module){
	'use strict'
	console.log('Chatter functions module is here')

	var chattersList = []

	function createUserList(socketObjList){
		socketObjList.forEach(function(socketObj){
			chattersList.push(socketObj)
		})
		Chatter.createUsersTab()
	}

	function insertUserInList(socketDataObj){
		chattersList.push(socketDataObj)
		console.log('new chatter added to list')
		console.log(chattersList)
		console.log(getChatterList())
		if(Chatter.queryShadowDom('._userListBox')){
			Chatter.renderUserList()

		}


	}
	function insertNameInSocketObject(socketId, socketName){
		console.log(socketId)
		console.log(socketName)
		var socketArray = getChatterList()
		var pos = socketArray.map(function(i) { return i.socketid; }).indexOf(socketId);
		console.log(pos)
		console.log(socketArray[pos])
		socketArray[pos]['username'] = socketName


	}
	function removeSocketObjInList(id){
		var socketArray = getChatterList()

		var pos = socketArray.map(function(i) { return i.socketId; }).indexOf(id);
		console.log(pos+' is not negative???')


		if (pos > -1) {
			console.log('remove this socket ' + id + ' from socketArray')
			socketArray.splice(pos, 1)
		} else {
			console.log('this socket is lost...? ' + id)
		}

	}
	function getChatterList(){
		return chattersList
	}
	function ShowChattersList(){
		console.log('show the list! of Chaters')
		// $Util.queryShadowDom('')
		
	}


	module.createUserList = createUserList
	module.ShowChattersList = ShowChattersList
	module.insertUserInList = insertUserInList
	module.getChatterList = getChatterList
	module.insertNameInSocketObject=insertNameInSocketObject
	module.removeSocketObjInList = removeSocketObjInList

	return module
})(Chatter || {})

