var Chatter = (function (module) {
    var css = `
  <style>
._chatUsersList{
  color:lime;
}

-_userListItem{
  color:lime;
}

._userListBoxMinimizeBtn{
  font-size:20px;
  background:red;
  color:white;
  cursor:pointer;
}


._userListBox{
  opacity:0;
  position:absolute;
  width:0px;
  height:0px;
  left:0px;
  bottom:0px;
  transition: all 0.5s ease;
}

  ._chatterUsersTab{
    position:absolute;
    bottom:-1em;
    border-radius:5px;
    border:1px solid goldenrod;
    padding:0em 0.25em 0em .25em;
    height:1em;
    background:white;


  }

._createRoomButton{
  
}
._createRoomButton:hover{
  cursor:pointer;
  
}

._topBarRow{
  width:0px;
  height:0px;
  position:absolute;
  top:1px;
  left:0px;
}

  ._chatterRoomTab{
    position:absolute;
    padding:0em 0.25em 0em .25em;
    height:1em;
    border-radius:0px 20px;
    border:1px solid white;
    background:white;
    top:-1em;
  }

  #_ChatUsernameInputContainer{
    align-content: center;
    position: absolute;
    top: 25%;
    padding: 10px;
  }

  #_ChatUserNameInput{
    height: 2em;
    margin: 10px;
    color: black;
    text-shadow: 0px 0px 10px rgba(0, 0, 100, 0.5);
    text-align: center;
  }

  #_ChatUserNameInput::-webkit-input-placeholder{
    color: black;
    text-shadow: 0px 0px 10px rgba(0, 0, 100, 0.5);
    text-align: center;
  }


  /*#_ChatUserNameInput::-ms-input-placeholder{
    color: black;
    text-shadow: 0px 0px 10px rgba(0, 0, 100, 0.1);
    text-align: center;
  }
  #_ChatUserNameInput::-moz-placeholder{
    color: black;
    text-shadow: 0px 0px 10px rgba(0, 0, 100, 0.1);
    text-align: center;
  }*/

  #_ChatLog{
    /*overflow-x: hidden;*/
    overflow-y: scroll;
    width : 100%;
    height : 50%;
    background : cyan;
    
  }
  #_ChatLog::-webkit-scrollbar{
    width:5px;
  }
  #_ChatLog::-webkit-scrollbar-track{
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 

    border-radius: 10px;
  }
  #_ChatLog::-webkit-scrollbar-thumb{
    background: rgba(255,0,0,0.8); 
    border-radius: 10px;
  }
  #_ChatLog:hover::-webkit-scrollbar-thumb {
    background: rgba(255,0,0,0.4); 
  }
  /*#_ChatUsernameInputContainer > *{
    margin:10px;

  }*/

  ._ChatSender{
    color: green;
    text-decoration: underline;
  }


  ._ChatWindowHeader{
    display: block;
    text-align: center;
  }

  ._ChatText{
    padding:5px 15px 5px 15px;
    display: block;
    text-align: center;
  }

  ._ChatTimestamp{
    text-align: right;
    font-size: 9px;
  }

  ._talkBubble{
      /*box-shadow:1px 1px 1px rgba(100, 100, 100, 0.5)*/
    padding :0px;
    font-family :Rock Salt, cursive;
    align-content :center;
    position :absolute;
    top :0px;
    bottom :0px;
    left :0px;
    right :0px;
    border :3px solid green;
    /*background='linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)';*/
    background :linear-gradient(to right, red, orange, yellow, green);
    border-radius :50%;
    margin-top :15px;
    margin-bottom :15px;
  }

  ._talkTriangle{
    position :absolute;
    right :9%;
    bottom :-11%;
    width :44px;
    height :15px;
    border-width :10px 5px 5px 15px;
    border-color :transparent green red transparent;
    border-style :solid;
    transform :rotate(17deg);
    background :linear-gradient(green, red);
    z-index :-1;
  }
   #chatterChatWindow{
    display :block;
    position :absolute;
    width :250%;
    height :400%;
    top :-350%;
    right :10px;
    background-color :tomato;
    border-radius:5px;
    border:1px solid black;
    box-shadow:10px 10px 1px 1px rgba(100, 100, 100, 0.5)
   }

   #_listOfChatters{
    transition: all 1s ease;

    position:relative;
    display:inline-block;
    margin-left:0.5em;
    width:1em;
    height:1em;
    border:1px solid aqua;
   }
   #_listOfChatters:hover{
      transition: all 1s ease;

  background:white;
   }

    #_listOfChatters:hover:before{
      transition: all 1s ease;

  background:red;
  content:'Click';

  left:-0.75em;;
   }

    #_listOfChatters:hover:after{
      transition: all 1s ease;

      content:'Chatters';
      left:1em;
  background:black;
   }

    #_listOfChatters:before{
      transition: all 1s ease;

      content: '';
      display:inline-block;

      width: 0.75em;
      position: absolute;
      top: 0.25em;
      border-top: 1px solid blue;
      left: 0.125em;
      align-items: center;
      border-bottom: 1px solid green;
      height: 0.5em;
   }

     #_listOfChatters:after{
      transition: all 1s ease;

      content: '';
      display:inline-block;

      width: 0.65em;
      position: absolute;
      top: 0.30em;
      left:0.125em;
      border-left: 1px solid gold;
      align-items: center;
      border-right: 1px solid red;
      height: 0.5em;
   }

  </style>

      `;

    module.shadowCSS = css;

    return module;
})(Chatter || {});

var $Util = (function () {
    "use strict";
    var dgcn = function (el) {
        return document.querySelectorAll(el);
    };
    var dgid = function (el) {
        return document.querySelector(el);
    };

    function query(dom, el) {
        return dom.querySelector(el);
    }
    var getShadowEl = function (el) {
        console.log(arguments.length);
        console.log("we run this " + arguments.length + " times");
        var shadowRoot = getChatterRoot();
        var first = query(shadowRoot, arguments[0]);
        if (arguments.length > 1) {
            console.log("greater than 1");
            var count = 1;
            while (count < arguments.length) {
                console.log(arguments[count]);
                first = query(first, arguments[count]);
                count++;
                console.log("count is " + count);
                if (count == arguments.length) {
                    console.log("is this really worth is?");
                    console.log(first);
                    return first;
                }
            }
        } else {
            console.log("just one thing ran");
            return first;
        }
    };
    function queryShadowDom(el) {
        var root = getChatterRoot();
        return root.querySelector(el);
    }
    function getChatterRoot() {
        return document.querySelector("._cornerChatBox").shadowRoot;
    }
    var dce = function (el) {
        return document.createElement(el);
    };

    function geid(el) {
        return document.getElementById(el);
    }
    function gecn(el) {
        return document.getElementsByClassName(el);
    }
    function dce(el) {
        return docuemnt.createElement(el);
    }
    function request(URL, method, data, callback) {
        var request = new XMLHttpRequest();
        var resp = {};
        request.open(method, URL, true);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                resp.response = request.responseText;
                callback(resp.response);
            } else {
                // We reached our target server, but it returned an error
                resp.err = "err";
                callback(resp.err);
            }
        };

        request.onerror = function () {
            // There was a connection error of some sort
        };

        request.send();
    }

    function serialize(obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    }

    return {
        geid: geid,
        dgcn: gecn,
        dce: dce,
        request: request,
        serialize: serialize,
        queryShadowDom: queryShadowDom,
    };
})();

$Util.geid("one");

//Data
var Chatter = (function (module) {
    "use strict";
    var dataObj = {};

    function setUsername(username) {
        dataObj.username = username;
    }
    function getUsername() {
        return dataObj.username;
    }

    module.setUsername = setUsername;
    module.getUsername = getUsername;

    return module;
})(Chatter || {});

var Chatter = (function (coreModule) {
    "use strict";
    var dgcn = function (el) {
        return document.querySelectorAll(el);
    };
    var dgid = function (el) {
        return document.querySelector(el);
    };

    function query(dom, el) {
        return dom.querySelector(el);
    }
    var getShadowEl = function (el) {
        console.log(arguments.length);
        console.log("we run this " + arguments.length + " times");
        var shadowRoot = getChatterRoot();
        var first = query(shadowRoot, arguments[0]);
        if (arguments.length > 1) {
            console.log("greater than 1");
            var count = 1;
            while (count < arguments.length) {
                console.log(arguments[count]);
                first = query(first, arguments[count]);
                count++;
                console.log("count is " + count);
                if (count == arguments.length) {
                    console.log("is this really worth is?");
                    console.log(first);
                    return first;
                }
            }
        } else {
            console.log("just one thing ran");
            return first;
        }
    };

    function queryShadowDom(el) {
        var root = getChatterRoot();
        return root.querySelector(el);
    }

    function getChatterRoot() {
        return document.querySelector("._cornerChatBox").shadowRoot;
    }
    var dce = function (el) {
        return document.createElement(el);
    };

    function checkForChatterBox() {
        // if ($Util.dgcn('chatter').length > 0) {
        if ($Util.dgcn("_cornerChatBox").length > 0) {
            return false;
        } else {
            return true;
        }
    }
    var chatterCSS = Chatter.shadowCSS;
    //new
    var chatBox;

    function createChatLogo(chatBox) {
        var talkBubble = document.createElement("div");
        talkBubble.innerText = "CHAT!";
        talkBubble.classList.add("_talkBubble");
        //wouldnt work without this on my iphone
        talkBubble.addEventListener("click", openChatApp, false);

        var tbs = talkBubble.style;
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

        var chatTriangle = document.createElement("div");
        chatTriangle.classList.add("_talkTriangle");
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

        talkBubble.appendChild(chatTriangle);
        chatBox.shadowRoot.appendChild(talkBubble);

        console.log("chatBox.innerHTML after adding talkbubble");
        // console.log(chatBox.innerHTML)
    }

    //funcions

    function createcornerBox() {
        var chatBox = document.createElement("div");
        chatBox.classList.add("_cornerChatBox");
        var cbs = chatBox.style;
        cbs.width = "100px";
        cbs.height = "100px";
        cbs.position = "fixed";
        cbs.bottom = "10%";
        cbs.right = "0px";
        cbs.margin = "10px";
        cbs.borderRadius = "10px";
        cbs.overflow = "visible";
        cbs.zIndex = "00";
        cbs.border = "1px solid red";
        var chatBoxShadow = chatBox.attachShadow({
            mode: "open",
        });
        chatBox.shadowRoot.innerHTML += chatterCSS;

        console.log("Was root created?");
        console.log(chatBox.shadowRoot);

        return chatBox;
    }

    function createChatter() {
        if (!checkForChatterBox()) {
            console.log("done already");
            return;
        } else {
            console.log("createChatBox");
            addScript_And_Googlefont();
            chatBox = createcornerBox();
            createChatLogo(chatBox);
            document.body.appendChild(chatBox);
            // dgcn(_HTMLeleemnt)[0].appendChild(chatBox)

            chatBox.addEventListener(
                "mouseover",
                function (e) {
                    // e.stopPropagation()
                    chatBox.style.backgroundColor = "tomato";
                    // console.log('mouseover')
                },
                false
            );
            chatBox.addEventListener(
                "mouseleave",
                function (e) {
                    // e.stopPropagation()
                    chatBox.style.backgroundColor = "white";
                    // console.log('mouseleave')
                },
                false
            );

            chatBox.addEventListener("click", openChatApp, false);
        }
    }

    function openChatApp(e) {
        e.stopPropagation();
        if (queryShadowDom("#chatterChatWindow")) {
            var cw = queryShadowDom("#chatterChatWindow");
            console.log(cw.style);
            if (cw.style.display == "block") {
                console.log("its block, hide it now");
                cw.style.display = "none";
            } else if (cw.style.display == "none") {
                console.log("its hide make me see it now");
                cw.style.display = "block";
            } else {
                console.log("failback consol log clicking the chatter window shoudl disappear");
            }
        } else {
            console.log("creating chat window");
            Chatter.initSocket();
            Chatter.joinDomainChat();
            var chatWindow = createChatterChatWindow();
            dgcn("._cornerChatBox")[0].shadowRoot.appendChild(chatWindow);
            queryShadowDom("#_ChatUserNameInput").focus();
        } //else need to create first time
    }

    function createChatterChatWindow() {
        var chatWindow = document.createElement("div");
        chatWindow.id = "chatterChatWindow";
        var cws = chatWindow.style;
        cws.display = "block";
        // cws.position = 'absolute';
        // cws.width = '250%';
        // cws.height = '400%';
        // cws.top = '-350%';
        // cws.right = '10px';
        // cws.backgroundColor = 'tomato';

        var uNameInputContainer = createNameInputContainer();
        chatWindow.append(uNameInputContainer);

        console.log("Focus");
        chatWindow.addEventListener(
            "mouseover",
            function (e) {
                e.stopPropagation();
                //  // chatBox.style.backgroundColor = 'tomato'
                //  console.log('mouseover chatWindow')
            },
            false
        );
        chatWindow.addEventListener(
            "mouseleave",
            function (e) {
                e.stopPropagation();
                //  // chatBox.style.backgroundColor = 'white'
                //  console.log('mouseleave chatWindow')
            },
            false
        );

        chatWindow.addEventListener(
            "click",
            function (e) {
                //prevents windwo from closing
                e.stopPropagation();
            },
            false
        );
        return chatWindow;
    }

    function addScript_And_Googlefont() {
        var googlefontlink = document.createElement("link");
        googlefontlink.href = "https://fonts.googleapis.com/css?family=Rock+Salt";
        googlefontlink.rel = "stylesheet";
        document.getElementsByTagName("head")[0].appendChild(googlefontlink);
        var script = document.createElement("script");
        // script.src = 'http://66.8.168.178/socket.io/socket.io.js'
        // script.src = 'http://192.168.0.93:8081/socket.io/socket.io.js'
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js";
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    function createNameInputContainer() {
        var uNameInputContainer = dce("div");
        var span = dce("span");
        span.innerText = "Please select a name, or enter as a guest ";
        uNameInputContainer.id = "_ChatUsernameInputContainer";
        var usernameInput = dce("input");
        usernameInput.id = "_ChatUserNameInput";
        usernameInput.placeholder = "{guest}" + Math.floor(Math.random() * (11111 - 11) + 11);
        usernameInput.type = "text";

        var submitBtn = dce("button");
        submitBtn.innerText = "Begin the Chat";
        uNameInputContainer.append(span);
        uNameInputContainer.append(usernameInput);
        uNameInputContainer.append(submitBtn);

        usernameInput.addEventListener("keydown", isEventEnter, true);

        function isEventEnter(e) {
            if (e.key === "Enter" || e.keyCode === 13) {
                //which form?
                simulateClick(submitBtn);
            }
        }

        submitBtn.addEventListener("click", function () {
            console.log("click submit");
            var uName = usernameInput;
            var socketNameObj = { socketId: Chatter.getSocket().id, username: "" };
            if (uName.value.length > 0) {
                socketNameObj.username = uName.value;
            } else {
                socketNameObj.username = uName.placeholder;
            }
            Chatter.setUsername(socketNameObj.username);
            // Chatter.insertUserInList(socketNameObj)
            Chatter.emitNewChatter(socketNameObj);

            uNameInputContainer.style.display = "none";
            createChatterWindowWidgets(queryShadowDom("#chatterChatWindow"));
            queryShadowDom("#_ChatInputText").focus();
        });

        return uNameInputContainer;
    }

    var chatterComponentsArray = [createChatterHead, createChatLog, createChatterInputSend];

    function createChatterHead(chatWindow) {
        var head = dce("div");
        head.classList.add("_ChatWindowHeader");
        head.id = "_ChatHeader";
        head.innerHTML =
            `<p>Hello, <span id="_Chatterusername">` +
            Chatter.getUsername() +
            `</span></p><button id="_editNameBtn">Edit Name</button>
                            <br>
                        Total users: <span id="_ChatUserCount"></span><div id='_listOfChatters'></div>
                        `;
        chatWindow.append(head);
        queryShadowDom("#_listOfChatters").addEventListener("click", Chatter.ShowChattersList, true);

        queryShadowDom("#_editNameBtn").addEventListener("click", editUsernameFn, true);
        // getShadowEl('#chatterChatWindow','#_ChatHeader','#_editNameBtn').addEventListener('click', editUsernameFn, true)
    }

    function createChatLog(chatWindow) {
        var chatLog = dce("div");
        chatLog.id = "_ChatLog";
        var cs = chatLog.style;
        // cs.width = '100%'
        // cs.height = "50%"
        // cs.background = 'cyan'
        // cs.overflowY = "scroll"
        // cs.overflowX = "hidden"

        chatWindow.append(chatLog);
    }

    function createChatterInputSend(chatWindow) {
        var inputText = dce("input");
        inputText.type = "text";
        inputText.id = "_ChatInputText";
        var sendButton = dce("button");
        sendButton.innerText = "send";

        function isEventEnter(e) {
            if (e.key === "Enter" || e.keyCode === 13) {
                //which form?
                simulateClick(sendButton);
            }
        }

        inputText.addEventListener("keydown", isEventEnter, true);
        sendButton.addEventListener("click", sendChatToServer, false);
        chatWindow.append(inputText);
        chatWindow.append(sendButton);
    }

    function createChatterWindowWidgets(chatWindow) {
        chatterComponentsArray.forEach(function (fn) {
            fn(chatWindow);
        });
    }

    function editUsernameFn() {
        var flag = false;
        if (!queryShadowDom("#_editNameInput")) {
            console.log("edit name");
            console.log("curent name is ");
            var current_name = Chatter.getUsername();
            console.log(current_name);
            //create input box with current name inside
            var input = dce("input");
            input.id = "_editNameInput";
            input.type = "text";
            input.placeholder = current_name;
            queryShadowDom("#_editNameBtn").append(input);
            queryShadowDom("#_editNameInput").focus();
            flag = true;
        }
        // dgcn('_cornerChatBox')[0].append(input)
    }

    function sendChatToServer(e) {
        var textObj = {};
        console.log("sending inputText out");
        var input = queryShadowDom("#_ChatInputText");
        textObj.sender = Chatter.getUsername();
        textObj.text = input.value;
        Chatter.sendChatToServer("inputText", textObj);

        addInputTextToChatWindow(textObj);
        input.value = "";
    }

    function simulateClick(button) {
        var button;
        var event = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
        });

        button.dispatchEvent(event);
    }

    //this function adds a textObj to the #_ChatLog
    function addInputTextToChatWindow(textObj) {
        var chatLog = queryShadowDom("#_ChatLog");
        var newInputLine = dce("div");
        var sender = dce("span");
        sender.classList.add("_ChatSender");
        sender.innerText = textObj.sender;
        var text = dce("span");
        text.classList.add("_ChatText");
        text.innerText = textObj.text;
        var date = dce("div");
        date.classList.add("_ChatTimestamp");
        var d = new Date();
        // d.toString().split(' ')
        var day = d.getDate() + 1;
        var month = d.getMonth() + 1;
        var year = d.getYear() + 1900;
        var hour = d.getHours() + 1;
        var minute = d.getMinutes() + 1;
        date.innerText = month + "/" + day + "/" + year + "  -  " + hour + ":" + minute;
        newInputLine.append(sender);
        newInputLine.append(text);
        newInputLine.append(date);
        chatLog.append(newInputLine);
        console.log(textObj);
        //chat window scrolltop = scroll height
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    function getChatBox() {
        return chatBox;
    }

    coreModule.getChatBox = getChatBox;
    coreModule.createChatter = createChatter;
    coreModule.queryShadowDom = queryShadowDom;
    coreModule.addInputTextToChatWindow = addInputTextToChatWindow;

    coreModule.simulateClick = simulateClick;
    return coreModule;
})(Chatter || {});

var Chatter = (function (module) {
    "use strict";
    var queryShadowDom = Chatter.queryShadowDom;
    var socket;
    var HOST = location.host;
    var PROTOCOL = location.protocol;
    function initSocket() {
        socket = io(PROTOCOL + "//" + HOST, { path: "/socket.io" });

        // socket = io.connect('http://192.168.0.93:8081');
        // socket = io.connect('http://66.8.168.178');
        socket.on("connection", function (msg) {
            console.log("connection");
            if (Chatter.getUsername() !== undefined) {
                socket.emit("newChatter", { username: Chatter.getUsername(), socketId: socket.id });
            } else {
                socket.emit("usernameTest", { username: Chatter.getUsername(), socketId: socket.id });
            }
        });

        // socket.on('connection', function(){
        // 	socket.emit('newConnection', Chatter.getUsername())
        // })
        socket.on("test", function () {
            console.log("socket test");
        });

        socket.on("newChatter", function (socketUsernameObj) {
            console.log("newChatter emitted");
            console.log(socketUsernameObj);
            Chatter.insertUserInList(socketUsernameObj);

            // getShadowEl('#chatterChatWindow','#_ChatHeader','#_ChatUserCount').innerText = d
        });
        socket.on("newChatterInit", function (socketObjArray) {
            console.log(
                "user has selected a name, and the server acknowledge by sending the user list array to build the display"
            );
            console.log(socketObjArray);

            Chatter.createUserList(socketObjArray);
        });
        socket.on("inputText", function (d) {
            Chatter.addInputTextToChatWindow(d);
        });

        socket.on("roomJoined", function (roomJoined) {
            console.log("you joined " + roomJoined);
            Chatter.createRoomTab(roomJoined);
        });

        socket.on("userDisconnected", function (obj) {
            console.log("remove");
            console.log(obj);
            var id = obj.id;
            Chatter.removeSocketObjInList(id);
            //reRender the chat list
            Chatter.renderUserList();
        });
    }

    function getSocket() {
        return socket;
    }

    function joinDomainChat() {
        var hostname = document.location.hostname;
        console.log(hostname + " is the room i like join ");
        socket.emit("requestingRoom", hostname);
    }

    function emitNewChatter(socketNameObj) {
        socket.emit("newChatter", socketNameObj);
    }

    function sendChatToServer(type, textObj) {
        socket.emit(type, textObj);
    }

    module.emitNewChatter = emitNewChatter;
    module.sendChatToServer = sendChatToServer;
    module.socket = socket;
    module.getSocket = getSocket;
    module.initSocket = initSocket;

    module.joinDomainChat = joinDomainChat;

    return module;
})(Chatter || {});

//admin
var Chatter = (function (module) {
    "use strict";
    console.log("adminChatter is here");
    window.onload = function () {
        console.log("loaded");
    };

    function verifyAccount() {}

    module.verifyAccount = verifyAccount;

    return module;
})(Chatter || {});

var Chatter = (function (module) {
    var queryShadowDom = Chatter.queryShadowDom;
    var dce = function (el) {
        return document.createElement(el);
    };
    var initTabsFlag = false;

    function initTabs() {
        //add a create room button? sure why not
        //make a top bar div to attack it all too
        var chatWindow = queryShadowDom("#chatterChatWindow");

        var topBarRow = dce("div");
        topBarRow.classList.add("_topBarRow");
        chatWindow.append(topBarRow);
        var createRoom = dce("div");
        createRoom.classList.add("_createRoomButton");
        createRoom.innerText = "+";
        topBarRow.append(createRoom);
        console.log("init the tabs");
        initTabsFlag = true;
        //also init the users tab
    }

    function createRoomTab(roomName) {
        if (!initTabsFlag) initTabs();

        console.log("need to make a tab for the room " + roomName);
        var topBarRow = queryShadowDom("._topBarRow");

        var tab = dce("div");
        tab.classList.add("_chatterRoomTab");
        tab.id = roomName + "_Tab";
        tab.innerText = roomName;
        topBarRow.append(tab);
    }

    function createUsersTab() {
        var chatWindow = queryShadowDom("#chatterChatWindow");
        var usersTab = dce("div");
        usersTab.classList.add("_chatterUsersTab");
        usersTab.id = "_chatterUsersTab";
        usersTab.innerText = "Users List";
        //add span eleemnt for the count
        var span = dce("span");
        span.id = "_ChatUserCount";
        usersTab.append(span);
        chatWindow.append(usersTab);
        addHoverShowUsersList(usersTab);
    }

    function addHoverShowUsersList(el) {
        el.addEventListener("mouseover", showUsersList, true);
        el.addEventListener("click", showUsersList, true);
        createUserListBox();
    }

    function createUserListBox() {
        var userListBox = dce("div");
        var chatWindow = queryShadowDom("#chatterChatWindow");
        addWidgets(userListBox);

        userListBox.classList.add("_userListBox");
        chatWindow.append(userListBox);
    }

    function showUsersList(e) {
        e.target.addEventListener("mouseleave", closeUserList, true);
        e.target.addEventListener("click", closeUserList, true);
        var userListBox = queryShadowDom("._userListBox");
        console.log("show users list");
        var uls = userListBox.style;
        uls.opacity = "1";
        uls.border = "1px solid red";
        uls.width = "200px";
        uls.height = "300px";
        uls.left = "-200px";

        //actual list of users....
        renderUserList();
    }

    function renderUserList() {
        var userListBox = queryShadowDom("._userListBox");
        var userListArray = Chatter.getChatterList();
        if (queryShadowDom("._chatUsersList")) {
            var list = queryShadowDom("._chatUsersList");
            list.innerHTML = "";
        } else {
            var list = dce("ul");
            list.classList.add("_chatUsersList");
            userListBox.append(list);
        }

        userListArray.forEach(function (i) {
            var userListItem = dce("li");
            userListItem.classList.add("_userListItem");
            userListItem.innerText = i.username;
            list.append(userListItem);
        });
        queryShadowDom("#_ChatUserCount").innerText = userListArray.length;
    }

    function addWidgets(userListBox) {
        var userListBox = userListBox;
        var minimizeBtn = dce("button");
        minimizeBtn.innerText = "-";
        minimizeBtn.classList.add("_userListBoxMinimizeBtn");
        userListBox.append(minimizeBtn);
    }

    function closeUserList(e) {
        if (e.type === "click") {
            e.target.removeEventListener("click", closeUserList, true);
            var userListBox = queryShadowDom("._userListBox");
            var uls = userListBox.style;
            uls.width = "0px";
            uls.height = "0px";
            uls.left = "0px";
            uls.bottom = "0px";
            uls.opacity = "0";
        } else {
        }
    }

    module.closeUserList = closeUserList;
    module.createRoomTab = createRoomTab;
    module.renderUserList = renderUserList;
    module.createUsersTab = createUsersTab;

    return module;
})(Chatter || {});
//chatter functions
var Chatter = (function (module) {
    "use strict";
    console.log("Chatter functions module is here");

    var chattersList = [];

    function createUserList(socketObjList) {
        socketObjList.forEach(function (socketObj) {
            chattersList.push(socketObj);
        });
        Chatter.createUsersTab();
    }

    function insertUserInList(socketDataObj) {
        chattersList.push(socketDataObj);
        console.log("new chatter added to list");
        console.log(chattersList);
        console.log(getChatterList());
        if (Chatter.queryShadowDom("._userListBox")) {
            Chatter.renderUserList();
        }
    }
    function insertNameInSocketObject(socketId, socketName) {
        console.log(socketId);
        console.log(socketName);
        var socketArray = getChatterList();
        var pos = socketArray
            .map(function (i) {
                return i.socketid;
            })
            .indexOf(socketId);
        console.log(pos);
        console.log(socketArray[pos]);
        socketArray[pos]["username"] = socketName;
    }
    function removeSocketObjInList(id) {
        var socketArray = getChatterList();

        var pos = socketArray
            .map(function (i) {
                return i.socketId;
            })
            .indexOf(id);
        console.log(pos + " is not negative???");

        if (pos > -1) {
            console.log("remove this socket " + id + " from socketArray");
            socketArray.splice(pos, 1);
        } else {
            console.log("this socket is lost...? " + id);
        }
    }
    function getChatterList() {
        return chattersList;
    }
    function ShowChattersList() {
        console.log("show the list! of Chaters");
        // $Util.queryShadowDom('')
    }

    module.createUserList = createUserList;
    module.ShowChattersList = ShowChattersList;
    module.insertUserInList = insertUserInList;
    module.getChatterList = getChatterList;
    module.insertNameInSocketObject = insertNameInSocketObject;
    module.removeSocketObjInList = removeSocketObjInList;

    return module;
})(Chatter || {});

document.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM fully loaded and parsed");
    Chatter.createChatter();

    Chatter.verifyAccount();
});

// console.log(Chatter.socket)
// console.log('log')

// setTimeout(function(){
// 	Chatter.simulateClick(Chatter.getChatBox())
// }, 300)
