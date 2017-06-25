//Data
var Chatter = (function(module){
	'use strict'
	var dataObj = {}


	function setUsername(username){
		dataObj.username = username
		
	}
	function getUsername(){
		return dataObj.username
	}



	module.setUsername = setUsername
	module.getUsername = getUsername


return module


})(Chatter || {})

