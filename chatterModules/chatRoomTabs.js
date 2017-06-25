var Chatter = (function(module){
	var queryShadowDom = Chatter.queryShadowDom
	var dce = function(el) {
	    return document.createElement(el)
	}
	var initTabsFlag = false


function initTabs(){
	//add a create room button? sure why not
	//make a top bar div to attack it all too
	var chatWindow = queryShadowDom('#chatterChatWindow')

	var topBarRow = dce('div')
	topBarRow.classList.add('_topBarRow')
	chatWindow.append(topBarRow)
	var createRoom = dce('div')
	createRoom.classList.add('_createRoomButton')
	createRoom.innerText = '+'
	topBarRow.append(createRoom)
	console.log('init the tabs')
	initTabsFlag = true
	//also init the users tab
}


function createRoomTab(roomName){
	if(!initTabsFlag)initTabs()

	console.log('need to make a tab for the room '+roomName)
	var topBarRow = queryShadowDom('._topBarRow')

	var tab = dce('div')
	tab.classList.add('_chatterRoomTab')
	tab.id=roomName+'_Tab'
	tab.innerText=roomName
	topBarRow.append(tab)

}

function createUsersTab(){

	var chatWindow = queryShadowDom('#chatterChatWindow')
	var usersTab = dce('div')
	usersTab.classList.add('_chatterUsersTab')
	usersTab.id='_chatterUsersTab'
	usersTab.innerText='Users List'
	//add span eleemnt for the count
	var span = dce('span')
	span.id="_ChatUserCount"
	usersTab.append(span)
	chatWindow.append(usersTab)
	addHoverShowUsersList(usersTab)

}



function addHoverShowUsersList(el){
	el.addEventListener('mouseover', showUsersList, true)
	el.addEventListener('click', showUsersList, true)
	createUserListBox()
}

function createUserListBox(){
	var userListBox = dce('div')
	var chatWindow = queryShadowDom('#chatterChatWindow')
	addWidgets(userListBox)

	userListBox.classList.add('_userListBox')
	chatWindow.append(userListBox)
}

function showUsersList(e){
	e.target.addEventListener('mouseleave', closeUserList, true)
	e.target.addEventListener('click', closeUserList, true)
	var userListBox = queryShadowDom('._userListBox')
	console.log('show users list')
	var uls = userListBox.style
	uls.opacity = '1'
	uls.border = "1px solid red"
	uls.width = '200px'
	uls.height = '300px'
	uls.left = '-200px'

	//actual list of users....
renderUserList()

}

function renderUserList(){
	var userListBox = queryShadowDom('._userListBox')
	var userListArray = Chatter.getChatterList()
	if(queryShadowDom('._chatUsersList')){
		var list = queryShadowDom('._chatUsersList')
		list.innerHTML = '';
	}else{
		var list = dce('ul')
		list.classList.add('_chatUsersList')
		userListBox.append(list)

	}

	userListArray.forEach(function(i){
		var userListItem = dce('li')
		userListItem.classList.add('_userListItem')
		userListItem.innerText=i.username
		list.append(userListItem)
	})
	queryShadowDom('#_ChatUserCount').innerText = userListArray.length

}

function addWidgets(userListBox){
	var userListBox = userListBox
	var minimizeBtn = dce('button')
	minimizeBtn.innerText='-'
	minimizeBtn.classList.add('_userListBoxMinimizeBtn')
	userListBox.append(minimizeBtn)


}




function closeUserList(e){
	if(e.type === 'click'){
		e.target.removeEventListener('click', closeUserList, true)
		var userListBox = queryShadowDom('._userListBox')
		var uls = userListBox.style
		uls.width = '0px'
		uls.height = '0px'
		uls.left = '0px'
		uls.bottom = '0px'
		uls.opacity ='0'

	}else{

	}

}

	module.closeUserList=closeUserList
	module.createRoomTab=createRoomTab
	module.renderUserList=renderUserList
	module.createUsersTab = createUsersTab

	return module
	
})(Chatter || {})