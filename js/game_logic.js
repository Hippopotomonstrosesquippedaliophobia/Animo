function startGame(){
	var divCount = 2; //Set this to the amount of divs there are (levels)
	autoplay(); // start music
	
	hideAll(divCount); //Clear all from screen
	
	var myVar;
	myVar = setTimeout(showPage, 0000);	//Set delay to show loader about 3000 = 3secs
	
}

function playGame(index){	
	var gameName = getJson(`Users`);
	console.log(`Playing ${gameName[index].Name} game..`);
	document.getElementById(`home_page`).style.display = "none";	
	document.getElementById(`gameArea${index}`).style.display = "block";
	
	var gameInstruction = getJson(`Users`);
	console.log(`Instructions: ${gameInstruction[index].Instructions}`);
	
	document.getElementById(`instruction${index}`).innerHTML = gameInstruction[index].Instructions;
	gameZeroLoad();
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

//Functions to load before HTML loads
window.onload = function() {
	
}