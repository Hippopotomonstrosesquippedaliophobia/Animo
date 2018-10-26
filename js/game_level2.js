function gameTwoLoad(){	
	
}

function gameTwoReset(){
    document.getElementById(`overlay2`).style.display = "block";
    document.getElementById(`gameContainer2`).style.display = "none";
    balloonReset();
}

function offOverlay2(){
	document.getElementById(`overlay2`).style.display = "none";
	document.getElementById(`gameContainer2`).style.display = "block";

}

function balloonReset(){
    var elem = document.getElementById("moveBalloon");   
    elem.style.top = 0;
    elem.style.display = "none";

}

function balloonPopup(){
	//document.getElementById("moveBalloon").style.display = "block";
	var elem = document.getElementById("moveBalloon");   
	var pos = 0;
	var id = setInterval(frame, 2);
	function frame() {
		if (pos == 350) {
		  clearInterval(id);
		} else {
		  pos--; 
		  elem.style.top = pos + 'px'; 
		  //elem.style.left = pos + 'px'; 
		}
	}
}