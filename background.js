console.log("background running wooo")

var background = {
    theNum: 0,
    breakNum: 0,
    init: function(){
        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
            console.log("message received", request)
            if (request.fn in background){
                background[request.fn](request, sender, sendResponse)
            }
        })
    },

    // count clicker
    countUp: function(request, sender, sendResponse){
        this.theNum = parseInt(request.theNum) + 1
    },
    getWorkNum: function(request, sender, sendResponse){
        sendResponse(this.theNum)
    },
    
    countUpBreak: function(request, sender, sendResponse){
        this.breakNum = parseInt(request.theNum) + 1
    },
    getBreakNum: function(request, sender, sendResponse){
        sendResponse(this.breakNum)
    },

    // pomodoro
    work: function(request, sender, sendResponse){
        console.log("work activated ")
        setTimeout(function(){
            alert("25 Minutes Done ~")
        }, 1500000) 
    },

    break: function(request, sender, sendResponse){
        console.log("break activated")
        setTimeout(function(){
            alert("5 Minutes Done ~")
        }, 300000)
    },

    restart: function(request, sender, sendResponse){
        console.log("restart activated")
        this.theNum = 0
        this.breakNum = 0
    }

}

//start background
background.init()