 var Chatter = (function(module){
   
 var css =  `
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

      `

module.shadowCSS=css

return module


 })(Chatter || {})
