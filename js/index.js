const pvts = {
  pew: {
    name: "Felix",
    account: "UC-lHJZR3Gqxm24_Vd_AJ5Yw"
  },
  ts: {
    name: "T-Series",
    account: "UCq-Fj5jknLsUf-MWSy4_brA"
  }
}
const me = {
  pew: {
    name: "Felix",
    account: "UC-lHJZR3Gqxm24_Vd_AJ5Yw"
  },
  ts: {
    name: "theLMGN",
    account: "UC6ienhbxgv4vPmNDgJn6PgQ"
  }
}
var strings =  pvts
if (location.hash == "#me") {
  strings = me
}

var pewSub = 0
var oldPew = 0
var tSub = 0
var oldT = 0
var gotPew = false
var gotT = false

function checkChannel(channel,callback) {
  try {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        callback(this.responseText)
      }
    };
    xhttp.open("GET", `https://youtubeapis--thelmgn.repl.co/${channel}`, true);
    xhttp.send();
  } catch(e) {}
}
function checkPew() {
  document.querySelector("#pew").style.opacity = "0.6"
  
  checkChannel(strings.pew.account,function(subs) {
    pewSub = subs
    gotPew = true
    setTimeout(checkPew,5000)
    document.querySelector("#pew").style.opacity = "1"
  })
}
function checkT() {
  document.querySelector("#ts").style.opacity = "0.6"
  checkChannel(strings.ts.account,function(subs) {
    tSub = subs
    gotT = true
    setTimeout(checkT,5000)
    document.querySelector("#ts").style.opacity = "1"
  })
}

function checkSub() {
  checkPew()
  checkT()
}
checkSub()
setInterval(function() {
  if (gotT && gotPew) {
    render()
    gotT = false
    gotPew = false
  }
})


var oldDiff = 0;
function render() {
  respond.update()
  $("#pewSub").numerator({duration: "4900", rounding: "0", toValue: pewSub, easing: "linear"})
  $("#tSub").numerator({duration: "4900", rounding: "0", toValue: tSub, easing: "linear"})
  if (oldT < tSub) {
    document.querySelector("#tSub").className = "plus"
  } else if (tSub > tSub){
    document.querySelector("#tSub").className = "neg"
  } else {
    document.querySelector("#tSub").className = ""
  }
  if (oldPew < pewSub) {
    document.querySelector("#pewSub").className = "plus"
  } else if (oldPew > pewSub) {
    document.querySelector("#pewSub").className = "neg"
  } else {
    document.querySelector("#pewSub").className = ""
  }
  oldT = tSub
  oldPew = pewSub
  var diff = pewSub - tSub
  if (tSub > pewSub) {
    diff = tSub - pewSub
  }
  $("#subDiff").numerator({duration: "4900", rounding: "0", toValue: diff, easing: "linear"})
  var result = ((diff - Math.floor(oldDiff - diff)) * 5).toString().toHHMMSS();
  document.querySelector("#rate").innerText = result
  if (oldDiff < diff) {
    document.querySelector("#subDiff").className = "plus"
  } else if (diff < oldDiff) {
    document.querySelector("#subDiff").className = "neg"
  } else {
    document.querySelector("#subDiff").className = ""
  }
  oldDiff = diff
}

function switchPew() {
  strings = pvts
  checkSub()
}
function switchMe() {
  strings = me
  checkSub()
}