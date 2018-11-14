var activeDivId;
var game2 = new gameArea2();
var game1 = new gameArea1();
var game0 = new gameArea0();

function startGame(){
	var divCount = 2; //Set this to the amount of divs there are (levels) (-1 because starts at 0)
	autoplay(); // start music
	hideAll(divCount); //Clear all from screen		
	//document.getElementById("home_button").style.display = "none"; // Hides Home button 
	// muteAudio();

	var myVar;
	myVar = setTimeout(showPage, 0000);	//Set delay to show loader about 3000 = 3secs
		
}

function offGameOverlay(){
	game2.offOverlay();
}

function playGame(index){
	playSFX("../music/select.wav");
	document.getElementById(`home_page`).style.display = "none";	
	document.getElementById(`gameArea${index}`).style.display = "block";
	document.getElementById(`home_button`).style.display = "block";	
	openFullscreen();

	activeDivId = index;
	switch (activeDivId){
		case 0:
			game0.load();
			break;
		case 1:
			game1.load();
			break;
		case 2:
			game2.load();
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

function setBackgorundImage(src){
	document.getElementById("game_container").style.backgroundImage = `url(${src})`;
}
	
function continueGame(){
	//If music isnt playing already, play music
	var audio = document.getElementById("background_music");
	//openFullscreen();
	audio.play();

	openFullscreen();

	document.getElementById("start_page").style.display = "none";
	document.getElementById("home_page").style.display = "block";	
}



function reset(id){
	switch(id){
		case 0:
			game0.reset();
			break;
		case 1:
			game1.reset();
			break;
		case 2:
			game2.reset();
			break;
	}
}

//Hides active div and goes to home page
function goHome(){
	hide(activeDivId); //Hides gameArea0-2 
	reset(activeDivId); // Resets overlay to block and hides gameContainer0-2
	activeDivId = null;
	resetBackgroundMusic();
	continueGame();
	document.getElementById("game_container").style.backgroundImage = "url(../img/background_waterfall.gif)";
	document.getElementById("home_button").style.display = "none"; //Hide home button since you are now home
	document.getElementById("pause_button").style.display = "none";
}

function openFullscreen() {
	var elem = document.getElementById("game_container"); 
	if (elem.requestFullscreen) {
	  elem.requestFullscreen();
	} else if (elem.mozRequestFullScreen) { /* Firefox */
	  elem.mozRequestFullScreen();
	} else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
	  elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) { /* IE/Edge */
	  elem.msRequestFullscreen();
	}
}

function pauseGame(fullscreen=true) {
	lowerBackgroundMusic();
	//document.getElementById("game_container").style.zIndex = 1;
	var menu = fullscreen ? "menu2" : "menu"
	if(activeDivId==2) game2.pause();
	if(activeDivId==1) game1.pause();
	document.getElementById(menu).style.display = "block";
}

if (document.addEventListener)
{
	document.addEventListener('webkitfullscreenchange', exitHandler, false);
	document.addEventListener('mozfullscreenchange', exitHandler, false);
	document.addEventListener('fullscreenchange', exitHandler, false);
	document.addEventListener('MSFullscreenChange', exitHandler, false);
}

function continueBtnClick(fullscreen=true){	
	btnClick(fullscreen);
	switch(activeDivId){
		case 0:
			
			break;
		case 1:
			game1.resume();
			break;
		case 2:
			game2.resume();
			break;
	}
	
}

function homeBtnClick(fullscreen=true){	
	btnClick(fullscreen);
	//continueBtnClick(fullscreen);
	goHome();
}

function btnClick(fullscreen){
	playSFX("../music/game2/fall.wav");
	var menu = fullscreen ? "menu2" : "menu";	
	document.getElementById(menu).style.display ="none";
	document.getElementById(`game_container`).style.display = "block";
	resetVolume();
	openFullscreen();
}
function exitHandler()
{
	if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement)
	{
		document.getElementById("game_container").style.display = "none";
		pauseGame(fullscreen = false);			
	}
}

function displayTitle(gameId){
	var title = document.getElementById("gameTitle");
	switch(gameId){
		case 0:
			title.innerHTML = "Cataphonics";
			break;
		case 1:
			title.innerHTML = "Build Blast";
			break;
		case 2:
			title.innerHTML = "Balloon Catcher";
			break;
			
	}
	
	title.style.display = "block";
}

function removeTitle(){
	document.getElementById("gameTitle").style.display="none";
}

function generateRandomNumber(min, max) {
    
	var random_number = Math.random() * (max-min) + min;
	return Math.floor(random_number);
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function getRandomNumberUpTo(max) {
	return Math.floor(Math.random() * Math.floor(max));
  }
  
//Functions to load before HTML loads
window.onload = function() {
	
}