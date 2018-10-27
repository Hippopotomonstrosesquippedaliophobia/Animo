var float, fall;
var pos = 0;
const FALL_DISTANCE = 80;

function gameTwoLoad(){	
	document.getElementById(`overlay2`).style.marginTop = "-590px";
	document.getElementById(`gameContainer2`).style.marginTop = "-590px";	
	document.getElementById("moveBalloon").style.transform="translateY(400px)"; 
	var question = generateMathQuestion();
	injectMathQuestion(question);
}

function gameTwoReset(){
	document.getElementById(`overlay2`).style.display = "block";
	document.getElementById(`gameContainer2`).style.display = "none";
	balloonReset();
}

function offOverlay2(){
	document.getElementById(`overlay2`).style.display = "none";
	document.getElementById(`gameContainer2`).style.display = "block";
	document.getElementById("containerBalloon").style.display = "block"; 
}

function injectMathQuestion(question){
	document.getElementById(`mathX`).innerHTML = question.x;
	document.getElementById(`mathYO`).innerHTML = `${question.y}${question.operator}`;
}

function generateMathQuestion(){
	var question = {
		operator:'',
		x:0,
		y:0,
		answer:0,
	}

	question.x =  Math.floor(Math.random() * Math.floor(10));
	question.y =  Math.floor(Math.random() * Math.floor(10));
	if(question.x<question.y) {
		var tmp;
		tmp = question.y, question.y = question.x, question.x = tmp;
	}
	var i =  Math.floor(Math.random() * Math.floor(3));
	switch(i){
		case 0:
			question.operator='+';
			question.answer = question.x + question.y;
			break;
		case 1:
			question.operator='x';
			question.answer = question.x * question.y;
			break;
		case 2:
			question.operator='-';			
			question.answer = question.x - question.y;
			break;
	}
	console.log(question);
	return question;
}

//Balloon Logic----------------------------------------------------------------------
function balloonReset(){	
	pos = 0;
	document.getElementById("moveBalloon").style.top = pos + 'px'; 
}

function balloonStop() {
	clearInterval(float);
	clearInterval(fall);
}

function balloonFloat() {		
	balloonStop();
	float = setInterval(upAnimation, 20);	
}

function balloonFall(){
	balloonStop();
	var i = 0;
	fall = setInterval(function(){
		i++;
		downAnimation(i);
	}, 15);
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
	if (pos < -450) {
		balloonStop();
		balloonReset();
	} 
	else{
		pos--; 
		document.getElementById("moveBalloon").style.top = pos + 'px'; 
	}
}