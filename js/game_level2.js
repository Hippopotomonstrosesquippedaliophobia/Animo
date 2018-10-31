var float, fall;
var pos = 0;
const FALL_DISTANCE = 60;
const MAX_HEIGHT = 620;
const UP_SPEED = 20;//smaller = faster
const DOWN_SPEED = 15;//smaller = faster
var music2 = "../music/game2BackgroundMusic.mp3";
//var fallFX = new Audio("../music/game2/fall.wav");

var mathQuestion = {
	operator:'',
	x:0,
	y:0,
	answer:0,
}

function gameTwoLoad(){	
	document.getElementById(`game_container`).style.backgroundImage ="url(../img/game2Background.gif)"
	document.getElementById("moveBalloon").style.transform="translateY(600px)";
	setBackgroundMusic(music2);
	newMathQuestion();
}

function gameTwoReset(){
	document.getElementById(`overlay2`).style.display = "block";
	document.getElementById(`gameContainer2`).style.display = "none";
	document.getElementById(`game_container`).style.backgroundImage ="url(../img/background_waterfall.gif)";
	resetBackgroundMusic();
	
	document.getElementById("background_music").muted = false; 

	balloonReset();
}

function offOverlay2(){
	document.getElementById(`overlay2`).style.display = "none";
	document.getElementById(`gameContainer2`).style.display = "block";
	document.getElementById("containerBalloon").style.display = "block"; 
	document.getElementById("home_button").style.display = "block";
	startCountDown();
}

function startCountDown(){
	var timeleft = 4;
    var downloadTimer = setInterval(function(){
	timeleft--;
	document.getElementById("countDownTimer").style.display = "block";
	document.getElementById("countDownTimer").textContent = timeleft;
    if(timeleft <= 0){
		clearInterval(downloadTimer);
		document.getElementById("countDownTimer").style.display="none";
		balloonFloat();
	}
    },1000);
}

//Question Logic----------------------------------------------------------------------
function newMathQuestion(){
	generateMathQuestion();
	injectMathQuestion(mathQuestion);

}

function injectMathQuestion(question){
	document.getElementById(`mathX`).innerHTML = `&nbsp${question.x}`;
	document.getElementById(`mathYO`).innerHTML = `${question.operator}${question.y}`;
}

function generateMathQuestion(){
	var question = mathQuestion;

	question.x =  Math.floor(Math.random() * Math.floor(10));
	question.y =  Math.floor(Math.random() * Math.floor(10));
	if(question.x<question.y) {
		var tmp;
		tmp = question.y, question.y = question.x, question.x = tmp;
	}
	var i =  Math.floor(Math.random() * Math.floor(2));
	switch(i){
		case 0:
			question.operator='+';
			question.answer = question.x + question.y;
			break;
		case 1:
			question.operator='-';			
			question.answer = question.x - question.y;
			break;
	}
	mathQuestion = question;
}

function checkMathAnswer(){
	var question = mathQuestion;
	var userAnswer = document.getElementById("userMathAnswer").value;
	document.getElementById("userMathAnswer").value ='';
	if(userAnswer==question.answer) {
		//fallFX.play();
		balloonFall();
	}
	return false;
}

//Balloon Logic----------------------------------------------------------------------
function balloonReset(){	
	balloonStop();
	pos = 0;
	document.getElementById("moveBalloon").style.top = pos + 'px';
	newMathQuestion();
}

function balloonStop() {
	clearInterval(float);
	clearInterval(fall);
}

function balloonFloat() {		
	balloonStop();
	float = setInterval(upAnimation, UP_SPEED);	
}

function balloonFall(){
	newMathQuestion();
	balloonStop();
	var i = 0;
	fall = setInterval(function(){
		i++;
		downAnimation(i);
	}, DOWN_SPEED);
}

function downAnimation(i){
	
	if (i > FALL_DISTANCE) {
		balloonStop();
		balloonFloat();
	} 
	else{
		pos++;
		document.getElementById("moveBalloon").style.top = pos + 'px';
	}
}

function upAnimation() {	
	if (pos < -MAX_HEIGHT) {
		balloonStop();
		//mathGameOver();
		balloonReset();
	} 
	else{
		pos--; 
		document.getElementById("moveBalloon").style.top = pos + 'px'; 
	}
}