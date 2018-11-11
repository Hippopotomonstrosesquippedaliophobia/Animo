class gameArea2 {
	constructor(){
		this.score = 0;
		this.float;
		this.wasFloating = false;
		this.pos = 0;
		this.FALL_DISTANCE = 60;
		this.MAX_HEIGHT = 620;
		this.UP_SPEED = 20;//smaller = faster
		this.DOWN_SPEED = 15;//smaller = faster
		this.music2 = "../music/game2BackgroundMusic.mp3";
		this.mathQuestion = {
			operator:'',
			x:0,
			y:0,
			answer:0,
		}
		//var fallFX = new Audio("../music/game2/fall.wav");		
	}

	load(){	
		document.getElementById(`game_container`).style.backgroundImage ="url(../img/game2Background.gif)"
		document.getElementById("moveBalloon").style.transform="translateY(600px)";
		setBackgroundMusic(this.music2);
		document.getElementById("gameScore2").innerHTML=this.score;
		this.newMathQuestion();
	}

	reset(){
		document.getElementById(`instructionsOverlay2`).style.display = "block";
		document.getElementById(`gameContainer2`).style.display = "none";
		document.getElementById(`game_container`).style.backgroundImage ="url(../img/background_waterfall.gif)";
		document.getElementById(`gameOverOverlay2`).style.display ="none";

		resetBackgroundMusic();		
		//document.getElementById("background_music").muted = false; 

		this.score = 0;
		this.balloonReset();
	}

	pause(){
		this.balloonStop();
		document.getElementById(`gameContainer2`).style.display = "none";
	}

	resume(){		
		document.getElementById(`gameContainer2`).style.display = "block";		
		//document.getElementById("userMathAnswer").focus();		
		if (this.wasFloating) this.balloonFloat();
	}

	gameOver(){
		playSFX("../music/game2/GameOver.wav");
		document.getElementById(`gameContainer2`).style.display = "none";
		document.getElementById("home_button").style.display = "none";
		document.getElementById("pause_button").style.display = "none";
		document.getElementById("gameOverOverlay2").style.display="block";
		document.getElementById("gameOverScore2").innerHTML = `Score: ${this.score}`;
	}

	offOverlay(){		
		document.getElementById("gameOverOverlay2").style.display="none";
		document.getElementById(`instructionsOverlay2`).style.display = "none";
		document.getElementById(`gameContainer2`).style.display = "block";
		document.getElementById("containerBalloon").style.display = "block"; 
		this.startCountDown();
	}

	startCountDown(){
		document.getElementById("countDownOverlay2").style.display = "block";
		
		document.getElementById(`gameContainer2`).style.display = "none";
		var timeleft = 4;
		var downloadTimer = setInterval(function(){
			timeleft--;
			document.getElementById("countDownTimer").style.display = "block";
			document.getElementById("countDownTimer").textContent = timeleft;
			
			if(timeleft <= 0){
				clearInterval(downloadTimer);
				document.getElementById("countDownTimer").style.display="none";
				document.getElementById("countDownOverlay2").style.display = "none";
				document.getElementById(`gameContainer2`).style.display = "block";
				document.getElementById("userMathAnswer").focus = true;
				document.getElementById("home_button").style.display = "block";
				document.getElementById("pause_button").style.display = "block";
				//document.getElementById(`userMathAnswer`).focus();
				playSFX("../music/game2/go.wav");
				game2.balloonFloat();
			}
			else{
				playSFX("../music/game2/tick.wav");
			}
		},1000);
	}

//Question Logic----------------------------------------------------------------------
	newMathQuestion(){
		this.generateMathQuestion();
		this.injectMathQuestion(this.mathQuestion);

	}

	injectMathQuestion(question){
		document.getElementById(`mathX`).innerHTML = `&nbsp${question.x}`;
		document.getElementById(`mathYO`).innerHTML = `${question.operator}${question.y}`;
	}

	generateMathQuestion(){
		var question = this.mathQuestion;

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
		this.mathQuestion = question;
	}

	checkAnswer(){
		var question = this.mathQuestion;		
		var userAnswer = document.getElementById("userMathAnswer").value;
		document.getElementById("userMathAnswer").value ='';
		if(userAnswer==question.answer) {
			//fallFX.play();			
			this.score++;
			document.getElementById("gameScore2").innerHTML=this.score;
			this.balloonFall();
		}
		return false;
	}

//Balloon Logic----------------------------------------------------------------------
	balloonReset(){	
		this.balloonStop();
		this.wasFloating = false;
		this.pos = 0;
		document.getElementById("moveBalloon").style.top = this.pos + 'px';
		this.newMathQuestion();
	}

	balloonStop() {
		clearInterval(this.float);
		clearInterval(this.fall);
	}

	balloonFloat() {		
		this.balloonStop();
		this.wasFloating = true;
		this.float = setInterval(gameArea2.upAnimation, this.UP_SPEED, this);
	}

	balloonFall(){
		this.newMathQuestion();
		this.balloonStop();
		this.animationIndex = 0;
		this.wasFloating = false;
		this.fall = setInterval(gameArea2.downAnimation, this.DOWN_SPEED,this);
	}

	static downAnimation(game2){
		game2.animationIndex++;
		if (game2.animationIndex > game2.FALL_DISTANCE) {
			game2.balloonStop();
			game2.balloonFloat();
		} 
		else{
			game2.pos++;
			document.getElementById("moveBalloon").style.top = game2.pos + 'px';
		}
	}

	static upAnimation(game2) {	
		if (game2.pos < -game2.MAX_HEIGHT) {
			game2.balloonStop();
			game2.gameOver();
			game2.balloonReset();
			game2.score = 0;
			document.getElementById("gameScore2").innerHTML=game2.score;
		} 
		else{
			game2.pos--;
			document.getElementById("moveBalloon").style.top = game2.pos + 'px'; 
		}
	}
}