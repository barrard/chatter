"use strict";var Chatter=function(e){var n={};return e.setUsername=function(e){n.username=e},e.getUsername=function(){return n.username},e}((Chatter=function(e){return e.shadowCSS="\n  <style>\n._chatUsersList{\n  color:lime;\n}\n\n-_userListItem{\n  color:lime;\n}\n\n._userListBoxMinimizeBtn{\n  font-size:20px;\n  background:red;\n  color:white;\n  cursor:pointer;\n}\n\n\n._userListBox{\n  opacity:0;\n  position:absolute;\n  width:0px;\n  height:0px;\n  left:0px;\n  bottom:0px;\n  transition: all 0.5s ease;\n}\n\n  ._chatterUsersTab{\n    position:absolute;\n    bottom:-1em;\n    border-radius:5px;\n    border:1px solid goldenrod;\n    padding:0em 0.25em 0em .25em;\n    height:1em;\n    background:white;\n\n\n  }\n\n._createRoomButton{\n  \n}\n._createRoomButton:hover{\n  cursor:pointer;\n  \n}\n\n._topBarRow{\n  width:0px;\n  height:0px;\n  position:absolute;\n  top:1px;\n  left:0px;\n}\n\n  ._chatterRoomTab{\n    position:absolute;\n    padding:0em 0.25em 0em .25em;\n    height:1em;\n    border-radius:0px 20px;\n    border:1px solid white;\n    background:white;\n    top:-1em;\n  }\n\n  #_ChatUsernameInputContainer{\n    align-content: center;\n    position: absolute;\n    top: 25%;\n    padding: 10px;\n  }\n\n  #_ChatUserNameInput{\n    height: 2em;\n    margin: 10px;\n    color: black;\n    text-shadow: 0px 0px 10px rgba(0, 0, 100, 0.5);\n    text-align: center;\n  }\n\n  #_ChatUserNameInput::-webkit-input-placeholder{\n    color: black;\n    text-shadow: 0px 0px 10px rgba(0, 0, 100, 0.5);\n    text-align: center;\n  }\n\n\n  /*#_ChatUserNameInput::-ms-input-placeholder{\n    color: black;\n    text-shadow: 0px 0px 10px rgba(0, 0, 100, 0.1);\n    text-align: center;\n  }\n  #_ChatUserNameInput::-moz-placeholder{\n    color: black;\n    text-shadow: 0px 0px 10px rgba(0, 0, 100, 0.1);\n    text-align: center;\n  }*/\n\n  #_ChatLog{\n    /*overflow-x: hidden;*/\n    overflow-y: scroll;\n    width : 100%;\n    height : 50%;\n    background : cyan;\n    \n  }\n  #_ChatLog::-webkit-scrollbar{\n    width:5px;\n  }\n  #_ChatLog::-webkit-scrollbar-track{\n    box-shadow: inset 0 0 6px rgba(0,0,0,0.3); \n\n    border-radius: 10px;\n  }\n  #_ChatLog::-webkit-scrollbar-thumb{\n    background: rgba(255,0,0,0.8); \n    border-radius: 10px;\n  }\n  #_ChatLog:hover::-webkit-scrollbar-thumb {\n    background: rgba(255,0,0,0.4); \n  }\n  /*#_ChatUsernameInputContainer > *{\n    margin:10px;\n\n  }*/\n\n  ._ChatSender{\n    color: green;\n    text-decoration: underline;\n  }\n\n\n  ._ChatWindowHeader{\n    display: block;\n    text-align: center;\n  }\n\n  ._ChatText{\n    padding:5px 15px 5px 15px;\n    display: block;\n    text-align: center;\n  }\n\n  ._ChatTimestamp{\n    text-align: right;\n    font-size: 9px;\n  }\n\n  ._talkBubble{\n      /*box-shadow:1px 1px 1px rgba(100, 100, 100, 0.5)*/\n    padding :0px;\n    font-family :Rock Salt, cursive;\n    align-content :center;\n    position :absolute;\n    top :0px;\n    bottom :0px;\n    left :0px;\n    right :0px;\n    border :3px solid green;\n    /*background='linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)';*/\n    background :linear-gradient(to right, red, orange, yellow, green);\n    border-radius :50%;\n    margin-top :15px;\n    margin-bottom :15px;\n  }\n\n  ._talkTriangle{\n    position :absolute;\n    right :9%;\n    bottom :-11%;\n    width :44px;\n    height :15px;\n    border-width :10px 5px 5px 15px;\n    border-color :transparent green red transparent;\n    border-style :solid;\n    transform :rotate(17deg);\n    background :linear-gradient(green, red);\n    z-index :-1;\n  }\n   #chatterChatWindow{\n    display :block;\n    position :absolute;\n    width :250%;\n    height :400%;\n    top :-350%;\n    right :10px;\n    background-color :tomato;\n    border-radius:5px;\n    border:1px solid black;\n    box-shadow:10px 10px 1px 1px rgba(100, 100, 100, 0.5)\n   }\n\n   #_listOfChatters{\n    transition: all 1s ease;\n\n    position:relative;\n    display:inline-block;\n    margin-left:0.5em;\n    width:1em;\n    height:1em;\n    border:1px solid aqua;\n   }\n   #_listOfChatters:hover{\n      transition: all 1s ease;\n\n  background:white;\n   }\n\n    #_listOfChatters:hover:before{\n      transition: all 1s ease;\n\n  background:red;\n  content:'Click';\n\n  left:-0.75em;;\n   }\n\n    #_listOfChatters:hover:after{\n      transition: all 1s ease;\n\n      content:'Chatters';\n      left:1em;\n  background:black;\n   }\n\n    #_listOfChatters:before{\n      transition: all 1s ease;\n\n      content: '';\n      display:inline-block;\n\n      width: 0.75em;\n      position: absolute;\n      top: 0.25em;\n      border-top: 1px solid blue;\n      left: 0.125em;\n      align-items: center;\n      border-bottom: 1px solid green;\n      height: 0.5em;\n   }\n\n     #_listOfChatters:after{\n      transition: all 1s ease;\n\n      content: '';\n      display:inline-block;\n\n      width: 0.65em;\n      position: absolute;\n      top: 0.30em;\n      left:0.125em;\n      border-left: 1px solid gold;\n      align-items: center;\n      border-right: 1px solid red;\n      height: 0.5em;\n   }\n\n  </style>\n\n      ",e}(Chatter||{}))||{}),$Util=function(){function e(){return document.querySelector("._cornerChatBox").shadowRoot}return{geid:function(e){return document.getElementById(e)},dgcn:function(e){return document.getElementsByClassName(e)},dce:function(e){return document.createElement(e)},request:function(e,n,t,o){var r=new XMLHttpRequest,a={};r.open(n,e,!0),r.onload=function(){r.status>=200&&r.status<400?(a.response=r.responseText,o(a.response)):(a.err="err",o(a.err))},r.onerror=function(){},r.send()},serialize:function(e){var n=[];for(var t in e)e.hasOwnProperty(t)&&n.push(encodeURIComponent(t)+"="+encodeURIComponent(e[t]));return n.join("&")},queryShadowDom:function(n){return e().querySelector(n)}}}();$Util.geid("one");var Chatter=function(e){function n(e){return t().querySelector(e)}function t(){return document.querySelector("._cornerChatBox").shadowRoot}function o(){return!($Util.dgcn("_cornerChatBox").length>0)}function r(e){var n=document.createElement("div");n.innerText="CHAT!",n.classList.add("_talkBubble"),n.addEventListener("click",i,!1);n.style;var t=document.createElement("div");t.classList.add("_talkTriangle"),n.appendChild(t),e.shadowRoot.appendChild(n),console.log("chatBox.innerHTML after adding talkbubble")}function a(){var e=document.createElement("div");e.classList.add("_cornerChatBox");var n=e.style;n.width="100px",n.height="100px",n.position="fixed",n.bottom="10%",n.right="0px",n.margin="10px",n.borderRadius="10px",n.overflow="visible",n.zIndex="00",n.border="1px solid red";e.attachShadow({mode:"open"});return e.shadowRoot.innerHTML+=C,console.log("Was root created?"),console.log(e.shadowRoot),e}function i(e){if(e.stopPropagation(),n("#chatterChatWindow")){var t=n("#chatterChatWindow");console.log(t.style),"block"==t.style.display?(console.log("its block, hide it now"),t.style.display="none"):"none"==t.style.display?(console.log("its hide make me see it now"),t.style.display="block"):console.log("failback consol log clicking the chatter window shoudl disappear")}else{console.log("creating chat window"),Chatter.initSocket(),Chatter.joinDomainChat();var o=s();x("._cornerChatBox")[0].shadowRoot.appendChild(o),n("#_ChatUserNameInput").focus()}}function s(){var e=document.createElement("div");e.id="chatterChatWindow",e.style.display="block";var n=l();return e.append(n),console.log("Focus"),e.addEventListener("mouseover",function(e){e.stopPropagation()},!1),e.addEventListener("mouseleave",function(e){e.stopPropagation()},!1),e.addEventListener("click",function(e){e.stopPropagation()},!1),e}function d(){var e=document.createElement("link");e.href="https://fonts.googleapis.com/css?family=Rock+Salt",e.rel="stylesheet",document.getElementsByTagName("head")[0].appendChild(e);var n=document.createElement("script");n.src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js",document.getElementsByTagName("head")[0].appendChild(n)}function l(){var e=f("div"),t=f("span");t.innerText="Please select a name, or enter as a guest ",e.id="_ChatUsernameInputContainer";var o=f("input");o.id="_ChatUserNameInput",o.placeholder="{guest}"+Math.floor(11100*Math.random()+11),o.type="text";var r=f("button");return r.innerText="Begin the Chat",e.append(t),e.append(o),e.append(r),o.addEventListener("keydown",function(e){"Enter"!==e.key&&13!==e.keyCode||p(r)},!0),r.addEventListener("click",function(){console.log("click submit");var t=o,r={socketId:Chatter.getSocket().id,username:""};t.value.length>0?r.username=t.value:r.username=t.placeholder,Chatter.setUsername(r.username),Chatter.emitNewChatter(r),e.style.display="none",c(n("#chatterChatWindow")),n("#_ChatInputText").focus()}),e}function c(e){b.forEach(function(n){n(e)})}function u(){if(!n("#_editNameInput")){console.log("edit name"),console.log("curent name is ");var e=Chatter.getUsername();console.log(e);var t=f("input");t.id="_editNameInput",t.type="text",t.placeholder=e,n("#_editNameBtn").append(t),n("#_editNameInput").focus(),!0}}function h(e){var t={};console.log("sending inputText out");var o=n("#_ChatInputText");t.sender=Chatter.getUsername(),t.text=o.value,Chatter.sendChatToServer("inputText",t),m(t),o.value=""}function p(e){var e,n=new MouseEvent("click",{view:window,bubbles:!0,cancelable:!0});e.dispatchEvent(n)}function m(e){var t=n("#_ChatLog"),o=f("div"),r=f("span");r.classList.add("_ChatSender"),r.innerText=e.sender;var a=f("span");a.classList.add("_ChatText"),a.innerText=e.text;var i=f("div");i.classList.add("_ChatTimestamp");var s=new Date,d=s.getDate()+1,l=s.getMonth()+1,c=s.getYear()+1900,u=s.getHours()+1,h=s.getMinutes()+1;i.innerText=l+"/"+d+"/"+c+"  -  "+u+":"+h,o.append(r),o.append(a),o.append(i),t.append(o),console.log(e),t.scrollTop=t.scrollHeight}var g,x=function(e){return document.querySelectorAll(e)},f=function(e){return document.createElement(e)},C=Chatter.shadowCSS,b=[function(e){var t=f("div");t.classList.add("_ChatWindowHeader"),t.id="_ChatHeader",t.innerHTML='<p>Hello, <span id="_Chatterusername">'+Chatter.getUsername()+'</span></p><button id="_editNameBtn">Edit Name</button>\n                            <br>\n                        Total users: <span id="_ChatUserCount"></span><div id=\'_listOfChatters\'></div>\n                        ',e.append(t),n("#_listOfChatters").addEventListener("click",Chatter.ShowChattersList,!0),n("#_editNameBtn").addEventListener("click",u,!0)},function(e){var n=f("div");n.id="_ChatLog";n.style;e.append(n)},function(e){var n=f("input");n.type="text",n.id="_ChatInputText";var t=f("button");t.innerText="send",n.addEventListener("keydown",function(e){"Enter"!==e.key&&13!==e.keyCode||p(t)},!0),t.addEventListener("click",h,!1),e.append(n),e.append(t)}];return e.getChatBox=function(){return g},e.createChatter=function(){o()?(console.log("createChatBox"),d(),r(g=a()),document.body.appendChild(g),g.addEventListener("mouseover",function(e){g.style.backgroundColor="tomato"},!1),g.addEventListener("mouseleave",function(e){g.style.backgroundColor="white"},!1),g.addEventListener("click",i,!1)):console.log("done already")},e.queryShadowDom=n,e.addInputTextToChatWindow=m,e.simulateClick=p,e}(Chatter||{}),Chatter=function(e){return console.log("adminChatter is here"),window.onload=function(){console.log("loaded")},e.verifyAccount=function(){},e}((Chatter=function(e){var n;Chatter.queryShadowDom;return e.emitNewChatter=function(e){n.emit("newChatter",e)},e.sendChatToServer=function(e,t){n.emit(e,t)},e.socket=n,e.getSocket=function(){return n},e.initSocket=function(){(n=io.connect("http://192.168.0.93:8081")).on("connection",function(e){void 0!==Chatter.getUsername()?n.emit("newChatter",{username:Chatter.getUsername(),socketId:n.id}):n.emit("usernameTest",{username:Chatter.getUsername(),socketId:n.id})}),n.on("test",function(){console.log("socket test")}),n.on("newChatter",function(e){console.log("newChatter emited"),console.log(e),Chatter.insertUserInList(e)}),n.on("newChatterInit",function(e){console.log("user has selected a name, and the server acknowledge by sending the userlist array to build the display"),console.log(e),Chatter.createUserList(e)}),n.on("inputText",function(e){Chatter.addInputTextToChatWindow(e)}),n.on("roomJoined",function(e){console.log("you joined "+e),Chatter.createRoomTab(e)}),n.on("userDisconnected",function(e){console.log("remove"),console.log(e);var n=e.id;Chatter.removeSocketObjInList(n),Chatter.renderUserList()})},e.joinDomainChat=function(){var e=document.location.hostname;console.log(e+" is the room i like join "),n.emit("requestingRoom",e)},e}(Chatter||{}))||{}),Chatter=function(e){function n(){var e=d("#chatterChatWindow"),n=l("div");n.classList.add("_topBarRow"),e.append(n);var t=l("div");t.classList.add("_createRoomButton"),t.innerText="+",n.append(t),console.log("init the tabs"),c=!0}function t(e){e.addEventListener("mouseover",r,!0),e.addEventListener("click",r,!0),o()}function o(){var e=l("div"),n=d("#chatterChatWindow");i(e),e.classList.add("_userListBox"),n.append(e)}function r(e){e.target.addEventListener("mouseleave",s,!0),e.target.addEventListener("click",s,!0);var n=d("._userListBox");console.log("show users list");var t=n.style;t.opacity="1",t.border="1px solid red",t.width="200px",t.height="300px",t.left="-200px",a()}function a(){var e=d("._userListBox"),n=Chatter.getChatterList();if(d("._chatUsersList"))(t=d("._chatUsersList")).innerHTML="";else{var t=l("ul");t.classList.add("_chatUsersList"),e.append(t)}n.forEach(function(e){var n=l("li");n.classList.add("_userListItem"),n.innerText=e.username,t.append(n)}),d("#_ChatUserCount").innerText=n.length}function i(e){var e=e,n=l("button");n.innerText="-",n.classList.add("_userListBoxMinimizeBtn"),e.append(n)}function s(e){if("click"===e.type){e.target.removeEventListener("click",s,!0);var n=d("._userListBox").style;n.width="0px",n.height="0px",n.left="0px",n.bottom="0px",n.opacity="0"}}var d=Chatter.queryShadowDom,l=function(e){return document.createElement(e)},c=!1;return e.closeUserList=s,e.createRoomTab=function(e){c||n(),console.log("need to make a tab for the room "+e);var t=d("._topBarRow"),o=l("div");o.classList.add("_chatterRoomTab"),o.id=e+"_Tab",o.innerText=e,t.append(o)},e.renderUserList=a,e.createUsersTab=function(){var e=d("#chatterChatWindow"),n=l("div");n.classList.add("_chatterUsersTab"),n.id="_chatterUsersTab",n.innerText="Users List";var o=l("span");o.id="_ChatUserCount",n.append(o),e.append(n),t(n)},e}((Chatter=function(e){function n(){return t}console.log("Chatter functions module is here");var t=[];return e.createUserList=function(e){e.forEach(function(e){t.push(e)}),Chatter.createUsersTab()},e.ShowChattersList=function(){console.log("show the list! of Chaters")},e.insertUserInList=function(e){t.push(e),console.log("new chatter added to list"),console.log(t),console.log(n()),Chatter.queryShadowDom("._userListBox")&&Chatter.renderUserList()},e.getChatterList=n,e.insertNameInSocketObject=function(e,t){console.log(e),console.log(t);var o=n(),r=o.map(function(e){return e.socketid}).indexOf(e);console.log(r),console.log(o[r]),o[r].username=t},e.removeSocketObjInList=function(e){var t=n(),o=t.map(function(e){return e.socketId}).indexOf(e);console.log(o+" is not negative???"),o>-1?(console.log("remove this socket "+e+" from socketArray"),t.splice(o,1)):console.log("this socket is lost...? "+e)},e}(Chatter||{}))||{});document.addEventListener("DOMContentLoaded",function(e){console.log("DOM fully loaded and parsed"),Chatter.createChatter(),Chatter.verifyAccount()});