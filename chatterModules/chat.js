
  document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    Chatter.createChatter()

    Chatter.verifyAccount()
  });

// console.log(Chatter.socket)
// console.log('log')

// setTimeout(function(){
// 	Chatter.simulateClick(Chatter.getChatBox())
// }, 300)

