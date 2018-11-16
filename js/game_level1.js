class Fraction{

	constructor(denominator=null, numerator=null){
		if(numerator!=null && denominator!= null){
			this.numerator = numerator;
			this.denominator = denominator;
		}
		else if(denominator!=null){			
			this.denominator = denominator;
			this.numerator = generateRandomNumber(1, this.denominator);
	
		}
		else{
			this.denominator;
			this.numerator;		
		}
	}

	lcm(a, b) 
    { 
        return (a*b)/this.gcd(a, b); 
	} 
	
	gcd(a, b) 
	{ 
		if (b == 0) 
			return a; 
		return this.gcd(b, a % b);  		
	} 

	isEqualTo(that){
		if(this.numerator/this.denominator == that.numerator/that.denominator) return true;
		return false;
	}

	generateAnswer(){
		var answer = new Fraction();
		var hcf = this.gcd(this.numerator, this.denominator)
		if(hcf == 1){
			answer.denominator = this.denominator;
			answer.numerator = this.denominator - this.numerator;
			return answer;
		}
		answer.denominator = this.denominator / hcf;
		answer.numerator = (this.denominator - this.numerator)/hcf;
		return answer;
	}
}

class gameArea1{	

	constructor(){
		this.line = 0;
		this.wall = 0;
		this.correct = 0;
		this.subRound = 0;
		this.id;
		this.spos;
		this.lpos;
		this.cpos;
		this.talk;
	}
	

	offOverlay(){
		document.getElementById(`overlay1`).style.display = "none";
		document.getElementById(`gameContainer1`).style.display = "block";	
		document.getElementById("home_button").style.display = "block";
			
		document.getElementById("sand").style.display = "grid";
		
		document.getElementById("sand-drop").style.display="inline";
	}	

	static convo(game){
		game.line+=1;
		var ronaldo = document.getElementById('ronaldo-talk');
		var stumpy = document.getElementById('stumpy-talk');
		if(game.line==1)
		{
			setTimeout(function(){
				document.getElementById('ronaldo').style.display="initial";
				ronaldo.style.display="initial";
				ronaldo.innerHTML="Hey!";

			},1500);
		}
		if(game.line==2)
		{
			setTimeout(function(){
				ronaldo.style.display="none";
				stumpy.innerHTML="OH! boss i didn't see you there";
				stumpy.style.display="initial";
			},1500)
		}
		if(game.line==3)
		{
			setTimeout(function(){
				stumpy.style.display="none";
				ronaldo.style.display="initial";
				ronaldo.innerHTML="I thought you were to finish this wall";

			},1500);
		}
		if(game.line==4)
		{
			setTimeout(function(){
				ronaldo.style.display="none";
				stumpy.innerHTML="Yes, but i now got that help here they are";
				stumpy.style.display="initial";
			},1500)
		}
		if(game.line==5)
		{
			setTimeout(function(){
				stumpy.style.display="none";
				ronaldo.style.display="initial";
				ronaldo.innerHTML="Get it done now!!";

			},1500);
		}
		if(game.line==6)
		{
			setTimeout(function(){
				ronaldo.style.display="none";
				stumpy.innerHTML="right away";
				stumpy.style.display="initial";
			},1500)
		}
		if(game.line==7)
		{
			setTimeout(function(){
				ronaldo.style.display="none";
				document.getElementById('ronaldo').style.display="none";
				stumpy.innerHTML=".....";
				stumpy.style.display="initial";
			},1500)
		}
		if(game.line==8)
		{
			setTimeout(function(){
				stumpy.innerHTML="well you heard him, thanks for the help";
				stumpy.style.display="initial";
			},1500)
		}
		if(game.line==9)
		{
			setTimeout(function(){
				stumpy.innerHTML="just drag the right amount of sand,lime or stone into the wheel barrow";
				
			},3000)
		}
		if(game.line==10)
		{
			setTimeout(function(){
				stumpy.innerHTML="if all three are right, then a brick will be put down";
				
			},1500)
		}
		if(game.line==11)
		{
			setTimeout(function(){
				stumpy.innerHTML="if one of the three is wrong, a brick will be lost";
				
			},1500)
		}
		if(game.line==11)
		{
			setTimeout(function(){
				stumpy.style.display="none";
				
			},1500)
		}
	}

	//stop the interval from repeating in the gameload after the dialog is complete
	static stopFunction(text) {
		clearInterval(text);
		document.getElementById('ronaldo').style.display="none";
		document.getElementById('ronaldo-talk').style.display="none";
		document.getElementById('stumpy-talk').style.display="none";
		document.getElementById("gameContainer1").removeEventListener("click", function(){});
	}

	pause(){
		clearInterval(this.talk);
	}

	resume(){
		if(this.line<=11);		
		this.talk=setInterval(gameArea1.convo,3000, this);
	}

	load(fisrtLoad=true){
		
		
		setTimeout(this.convo,2000);
		if(fisrtLoad){
			var talk = this.talk=setInterval(gameArea1.convo,3000, this);
			document.getElementById("gameContainer1").addEventListener("click", function(){
				gameArea1.stopFunction(talk)});
			setTimeout(gameArea1.stopFunction,40000,this.talk);
			setBackgroundMusic("../music/background_music2.mp3");
			setBackgorundImage("../img/christopher/wall.png");
		}

		var sandQuestion = new Fraction(generateRandomNumber(2,10));
		var sandAnswer = sandQuestion.generateAnswer();
		var s_denominator = sandAnswer.denominator > sandQuestion.denominator ? sandAnswer.denominator : sandQuestion.denominator;

		var limeQuestion = new Fraction(generateRandomNumber(2,10));
		var limeAnswer = limeQuestion.generateAnswer();
		var l_denominator = limeAnswer.denominator > limeQuestion.denominator ? limeAnswer.denominator : limeQuestion.denominator;

		var cementQuestion = new Fraction(Math.floor(generateRandomNumber(2,10)));
		var cementAnswer = cementQuestion.generateAnswer();
		var c_denominator = cementAnswer.denominator > cementQuestion.denominator ? cementAnswer.denominator : cementQuestion.denominator;
		
		var s_L,c_L,l_L,s_U,l_U,c_U;

		//sand denominators
		document.getElementById("sand-known-d").innerHTML = sandQuestion.denominator;
		document.getElementById("sand-unknown-d").innerHTML="?";
		document.getElementById("sand-answer-d").innerHTML = s_denominator;

		//lime denominators
		document.getElementById("lime-known-d").innerHTML=limeQuestion.denominator;
		document.getElementById("lime-unknown-d").innerHTML="?";
		document.getElementById("lime-answer-d").innerHTML=l_denominator;

		
		//cement denominators
		document.getElementById("cement-known-d").innerHTML=cementQuestion.denominator;
		document.getElementById("cement-unknown-d").innerHTML="?";
		document.getElementById("cement-answer-d").innerHTML=c_denominator;

		//Assinging question denominators
		document.getElementById("sand-known-n").innerHTML= sandQuestion.numerator;
		document.getElementById("lime-known-n").innerHTML= limeQuestion.numerator;
		document.getElementById("cement-known-n").innerHTML= cementQuestion.numerator;

		//Assinging denominator of final fraction
		document.getElementById("sand-answer-n").innerHTML= s_denominator;
		document.getElementById("lime-answer-n").innerHTML= l_denominator;
		document.getElementById("cement-answer-n").innerHTML= c_denominator;

		document.getElementById("sand-unknown-n").innerHTML="?";
		document.getElementById("lime-unknown-n").innerHTML="?";
		document.getElementById("cement-unknown-n").innerHTML="?";

		//s -> sand , l -> lime , c -> cement
		// _L  -> denominator , _U -> numerator
		this.spos = Math.floor(generateRandomNumber(1,4));
		this.lpos = Math.floor(generateRandomNumber(1,4));
		this.cpos =  Math.floor(generateRandomNumber(1,4));
		for (var i=1;i<5;i++){
			
			var j = (2*i)-1;
			
			s_L=document.getElementById("sand").childNodes[j].childNodes[3].childNodes[2];
			l_L=document.getElementById("lime").childNodes[j].childNodes[3].childNodes[2];
			c_L=document.getElementById("cement").childNodes[j].childNodes[3].childNodes[2];

			s_U=document.getElementById("sn"+i);
			l_U=document.getElementById("ln"+i);
			c_U=document.getElementById("cn"+i);
			
			var sandRando;
			var limeRando;
			var cementRando;
			do{
				sandRando = new Fraction(generateRandomNumber(2,10));
			}while(sandRando.isEqualTo(sandAnswer));
			do{
				limeRando = new Fraction(generateRandomNumber(2,10));
			}while(limeRando.isEqualTo(limeAnswer));	
			do{
				cementRando = new Fraction(generateRandomNumber(2,10));
			}while(cementRando.isEqualTo(cementAnswer));

			//denominator assignment
			s_L.innerHTML = i==this.spos? sandAnswer.denominator : sandRando.denominator;			
			l_L.innerHTML = i==this.lpos? limeAnswer.denominator : limeRando.denominator;
			c_L.innerHTML = i==this.cpos? cementAnswer.denominator : cementRando.denominator;

			s_U.innerHTML = i==this.spos? sandAnswer.numerator : sandRando.numerator;
			l_U.innerHTML = i==this.lpos? limeAnswer.numerator : limeRando.numerator;
			c_U.innerHTML = i==this.cpos? cementAnswer.numerator : cementRando.numerator;
		}
		return;
	}		

	AllowDrop(ev){
		ev.preventDefault();
	}

	DragStart(ev){
		this.id=ev.target.id;
	}
	
	Drop(ev){
	// gets the parent of the element that is being dragged in the form of sand, lime or stone
		var id_p = document.getElementById(this.id).parentNode.parentNode.id;

		//gets the width and height of the drop area of the type : element being dropped
		var width = document.getElementById(id_p+"-drop").offsetWidth;
		var height= document.getElementById(id_p+"-drop").offsetHeight;
		var output = document.getElementById("stumpy-talk");
		//if the drop area has either height or width of 0 then the output gives a correction message
		if((width || height) != 0)
		{
			//reset correct
			if(this.correct==3){
				this.correct=0;
			}
			if(this.subRound==3)
			{
				this.subRound=0;
				document.getElementById('chris-cart').src="../img/christopher/wheel_barrow_cropped.png";
			}
			this.subRound+=1;
			
			var current = (id_p+"-drop");
			output.innerHTML="You're good to go buddy";
			output.style.display="none";
			//gets the id of the element whose picture is being dragged
			var dataId= document.getElementById(this.id).parentNode.childNodes[3].firstChild.id;
			
			
			//stores the data in the dataId inner html
			 var newData=document.getElementById(dataId).innerHTML;
			 var pos;
			 if(id_p == "sand") pos = this.spos;
			 if(id_p == "lime") pos = this.lpos;
			 if(id_p == "cement") pos = this.cpos;

			 var droppedId = document.getElementById(this.id).id.match(/\d+/)[0];
			 if (droppedId == pos){
				output.style.display="initial"
				output.innerHTML="that is right";
				this.correct++;
			}
			else
			{
				output.style.display="initial"
				output.innerHTML="hmm I don't know if thats right";
			}

			if (this.correct== 3 && this.wall<9)
			{ 
				this.UpdateBackground();
			}else if(this.subRound==3 && this.correct!=3 && this.wall>0  ){
				this.DestroyWallBackground();
				this.correct=0;
			}
			
			if(this.wall>=9)
			{
				setTimeout(gameArea1.transition,300,'finish',this);
				return;
			}

			setTimeout(gameArea1.transition,2000,current,this);
		}//if

		else
		{
			output.style.display="initial";
			output.innerHTML="That is not for there";
		}//else

	}//drop

	static transition(currentDisplay, game1){
		if(currentDisplay=="sand-drop")
		{
			document.getElementById(currentDisplay).style.display="none";

			document.getElementById("lime-drop").style.display="inline";

			document.getElementById('sand').style.display="none";

			document.getElementById("lime").style.display="grid";

			document.getElementById('chris-cart').src="../img/christopher/wheel_barrow_cropped_sand.png";
		}

		if(currentDisplay=="lime-drop")
		{
			document.getElementById(currentDisplay).style.display="none";

			document.getElementById("cement-drop").style.display="inline";

			document.getElementById('lime').style.display="none";

			document.getElementById("cement").style.display="grid";

			document.getElementById('chris-cart').src="../img/christopher/wheel_barrow_cropped_lime.png";
		}

		if(currentDisplay=="cement-drop")
		{
			document.getElementById(currentDisplay).style.display="none";

			document.getElementById("sand-drop").style.display="inline";

			document.getElementById('cement').style.display="none";

			document.getElementById("sand").style.display="grid";

			document.getElementById('chris-cart').src="../img/christopher/wheel_barrow_cropped_cement.png";

			game1.load(false);
		}

		if(currentDisplay == "finish")
		{
			document.getElementById("cement-drop").style.display="none";
			document.getElementById("cement").style.display="none";
			setTimeout(gameArea1.GameFinish, 1000);
			return;
		}
		document.getElementById("stumpy-talk").style.display="none";
	}

	UpdateBackground(){	
		this.wall++;
		if(this.wall<=0) return;
		setBackgorundImage("../img/christopher/Wall"+this.wall+".png");
	}

	DestroyWallBackground(){
		this.wall--;
		if(this.wall<=0) return;
		setBackgorundImage("../img/christopher/wall"+this.wall+".png");
	}

	static GameFinish(){
		document.getElementById('stumpy-talk').style.display="initial";
		setTimeout(function(){
			document.getElementById("stumpy-talk").innerHTML="Good job worker";
		},1000)	
		setTimeout(function(){
			document.getElementById("gameOverMenu1").style.display="block";	
		},2000);
		
	}

	reset(){		//Function will be ran when the home button is clicked
		this.line = 0;
		this.wall = 0;
		this.correct = 0;
		this.subRound = 0;
		gameArea1.stopFunction(this.talk);
		clearInterval(this.talk);
		document.getElementById(`overlay1`).style.display = "block";
		document.getElementById(`gameContainer1`).style.display = "none";
		document.getElementById("gameOverMenu1").style.display="none";	

		return;
	}

	restart(){
		this.reset();
		this.load(true);
	}
}

