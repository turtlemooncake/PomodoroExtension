var doro = {
    init: function(){
        console.log("heeyyyy")
        // variables
        var worknum = document.getElementById("worktime")
        var breaknum = document.getElementById("breaktime")
  
        var workbtn = document.getElementById("work")
        var breakbtn = document.getElementById("break")
        var restartbtn = document.getElementById("restart")

        workbtn.disabled = false
        breakbtn.disabled = false

        var workMsg = document.getElementById("work message")
        var breakMsg = document.getElementById("break message")

        // background messages
        chrome.runtime.sendMessage({fn: "getWorkNum"}, function(response){
            worknum.innerHTML = response
        })

        chrome.runtime.sendMessage({fn: "getBreakNum"}, function(response){
            breaknum.innerHTML = response
        })

        // buttons
        workbtn.addEventListener("click", function(){
            this.disabled = true
            breakbtn.disabled = true
            workMsg.innerHTML = "25 Minutes Activated"
            chrome.runtime.sendMessage({fn: "work"})
            
            chrome.runtime.sendMessage({fn: "countUp", theNum: worknum.innerHTML})
            chrome.runtime.sendMessage({fn: "getWorkNum"}, function(response){
                worknum.innerHTML = response
            }) 
        })

        breakbtn.addEventListener("click", function(){
            this.disabled = true
            workbtn.disabled = true
            breakMsg.innerHTML = "5 Minutes Activated"
            chrome.runtime.sendMessage({fn: "break"})
            
            chrome.runtime.sendMessage({fn: "countUpBreak", theNum: breaknum.innerHTML})
            chrome.runtime.sendMessage({fn: "getBreakNum"}, function(response){
                breaknum.innerHTML = response

            }) 
        })

        restartbtn.addEventListener("click", function(){
            chrome.runtime.sendMessage({fn: "restart"})
            chrome.runtime.sendMessage({fn: "getWorkNum"}, function(response){
                worknum.innerHTML = response
            }) 
            chrome.runtime.sendMessage({fn: "getBreakNum"}, function(response){
                breaknum.innerHTML = response
            })
        })

    }
}


// start app
document.addEventListener("DOMContentLoaded", function(){
    doro.init()
})


