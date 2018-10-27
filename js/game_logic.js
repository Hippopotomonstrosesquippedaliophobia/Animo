var activeDivId;

function startGame(){
	var divCount = 2; //Set this to the amount of divs there are (levels)
	autoplay(); // start music
	
	hideAll(divCount); //Clear all from screen
	
	var myVar;
	myVar = setTimeout(showPage, 0000);	//Set delay to show loader about 3000 = 3secs
		
}

function playGame(index){
	document.getElementById(`home_page`).style.display = "none";	
	document.getElementById(`gameArea${index}`).style.display = "block";

	activeDivId = index;
	switch (activeDivId){
		case 0:
			gameZeroLoad();
			break;
		case 1:
			gameOneLoad();
			break;
		case 2:
			gameTwoLoad();
			break;
	}
}

function getJson(link){
	//Http Request HERE
	//=============================================================
	url = `https://test-project-3d104.firebaseio.com/${link}.json`;
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); 
	xmlHttp.send( null );
	//--------------------------------------------------------------
	return  JSON.parse (xmlHttp.responseText);
}

//hides everything in game area
function hideAll(divCount){
	//hides start and home page
	document.getElementById("home_page").style.display = "none";	
}

//function hides based on element id
function hide(id){
	id-1; //Fix Offset to the counter
	var divNames = "gameArea" + id;
	document.getElementById(divNames).style.display = "none";
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("start_page").style.display = "block";
}

	
function continueGame(){
	//If music isnt playing already, play music
	var audio = document.getElementById("background_music");
	audio.play();
	
	document.getElementById("start_page").style.display = "none";
	document.getElementById("home_page").style.display = "block";	
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function reset(id){
	switch(id){
		case 0:
			gameZeroReset();
			break;
		case 1:
			gameOneReset();
			break;
		case 2:
			gameTwoReset();
			break;
	}
}

//Hides active div and goes to home page
function goHome(){
	var divName = "gameArea" + activeDivId;
	document.getElementById(divName).style.display = "none";
	reset(activeDivId);
	continueGame();
}

//Functions to load before HTML loads
window.onload = function() {
	
}