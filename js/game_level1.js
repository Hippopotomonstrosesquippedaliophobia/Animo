class gameArea1{

	constructor(){
		this.line = 0;
		this.wall = 0;
		this.correct = 0;
		this.subRound = 0;
		this.id;
	}

	offOverlay(){
		document.getElementById(`overlay1`).style.display = "none";
		document.getElementById(`gameContainer1`).style.display = "block";	
		document.getElementById("home_button").style.display = "block";
		
		setBackgroundMusic("../music/background_music2.mp3");
	}	

	static convo(game){
		game.line+=1;
		var ronaldo = document.getElementById('ronaldo-talk');
		var stumpy = document.getElementById('stumpy-talk');
		console.log(game);
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

	load(fisrtLoad=true){
		//setTimeout(convo,2000);
		// if(fisrtLoad){
		// 	var talk=setInterval(gameArea1.convo,3000, this);
		// 	document.getElementById("gameContainer1").addEventListener("click", function(){
		// 		gameArea1.stopFunction(talk)});
		// 	setTimeout(gameArea1.stopFunction,40000,talk);
		// }

		var s_denominator = Math.floor((Math.random()*10)+1);
		var l_denominator = Math.floor((Math.random()*10)+1);
		var c_denominator = Math.floor((Math.random()*10)+1);
		var s_numerator ;
		var l_numerator;
		var c_numerator;
		//
		var s_L,c_L,l_L,s_U,l_U,c_U;

		//sand denominators
		var sand_known = document.getElementById("sand-known-d").innerHTML=s_denominator;
		var sand_unknown= document.getElementById("sand-unknown-d").innerHTML=s_denominator;
		var sand_answer = document.getElementById("sand-answer-d").innerHTML=s_denominator;

		//lime denominators
		var lime_known = document.getElementById("lime-known-d").innerHTML=l_denominator;
		var lime_unknown= document.getElementById("lime-unknown-d").innerHTML=l_denominator;
		var lime_answer = document.getElementById("lime-answer-d").innerHTML=l_denominator;

		
		//cement denominators
		var cement_known = document.getElementById("cement-known-d").innerHTML=c_denominator;
		var cement_unknown= document.getElementById("cement-unknown-d").innerHTML=c_denominator;
		var cement_answer = document.getElementById("cement-answer-d").innerHTML=c_denominator;

		var sand_known_n = document.getElementById("sand-known-n").innerHTML= s_denominator-(Math.floor(Math.random()*s_denominator));
		var lime_known_n = document.getElementById("lime-known-n").innerHTML= l_denominator-(Math.floor(Math.random()*l_denominator));
		var cement_known_n = document.getElementById("cement-known-n").innerHTML= c_denominator-(Math.floor(Math.random()*c_denominator));

		var sand_ans_n = document.getElementById("sand-answer-n").innerHTML= s_denominator;
		var lime_ans_n = document.getElementById("lime-answer-n").innerHTML= l_denominator;
		var cement_ans_n = document.getElementById("cement-answer-n").innerHTML= c_denominator;

		var sand_unknown_n = document.getElementById("sand-unknown-n").innerHTML="?";
		var lime_unknown_n = document.getElementById("lime-unknown-n").innerHTML="?";
		var cement_unknown_n = document.getElementById("cement-unknown-n").innerHTML="?";

		//s -> sand , l -> lime , c -> cement
		// _L  -> denominator , _U -> numerator
		for (var i=1;i<8;i+=2){
			//denominator assignment
			s_L=document.getElementById("sand").childNodes[i].childNodes[3].childNodes[2];
			l_L=document.getElementById("lime").childNodes[i].childNodes[3].childNodes[2];
			c_L=document.getElementById("cement").childNodes[i].childNodes[3].childNodes[2];

			s_L.innerHTML=s_denominator;
			l_L.innerHTML=l_denominator;
			c_L.innerHTML=c_denominator;	
		}


		var sArray = [];
		var lArray = [];
		var cArray = [];
		var s_summation = false;
		var l_summation = false;
		var c_summation = false;

		for (var j = 1;j<5; j++)
		{
			
			s_numerator =s_denominator-(Math.floor((Math.random()*10)+1));
			l_numerator =l_denominator-(Math.floor((Math.random()*10)+1));
			c_numerator =c_denominator-(Math.floor((Math.random()*10)+1));

			s_U=document.getElementById("sn"+j);
			l_U=document.getElementById("ln"+j);
			c_U=document.getElementById("cn"+j);

			s_U.innerHTML=("\t"+Math.abs(s_numerator));
			l_U.innerHTML=Math.abs(l_numerator);
			c_U.innerHTML=Math.abs(c_numerator);

		////////////////////////////////////////////////////////////////////////////////////////////
		//
		//		logic to ensure there is at least one number that will make the sum correct
		//
		////////////////////////////////////////////////////////////////////////////////////////////

			if(s_numerator == (sand_ans_n-sand_known_n))
			{
				s_summation=true;
			}
			if(j==4&&s_summation==false)
			{
				var rand = Math.floor((Math.random()*4)+1);
				document.getElementById('sn'+rand).innerHTML=sand_ans_n-sand_known_n;
				console.log("there was no match for sand, match created and placed at "+rand+"\n");
			}	

			if(l_numerator == (lime_ans_n-lime_known_n))
			{
				l_summation=true;
			}
			if(j==4&&l_summation==false)
			{
				var rand = Math.floor((Math.random()*4)+1);
				document.getElementById('ln'+rand).innerHTML=lime_ans_n-lime_known_n;
				console.log("there was no match for lime, match created and placed at "+rand+"\n");
			}

			if(c_numerator == (cement_ans_n-cement_known_n))
			{
				c_summation=true;
			}
			if(j==4&&c_summation==false)
			{
				var rand = Math.floor((Math.random()*4)+1);
				document.getElementById('cn'+rand).innerHTML=cement_ans_n-cement_known_n;
				console.log("there was no match for cement, match created and placed at "+rand+"\n");
			}


		}


		return;
	}

	//global variable called id stores the id of the item being dragged
		

	AllowDrop(ev){
		ev.preventDefault();
	}

	DragStart(ev){
		this.id=ev.target.id;
		//alert(id+"hiiii");
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

			//changes the display of the unknown to newData, that being the dragged element's numerator 

			document.getElementById(id_p+"-unknown-n").innerHTML=newData;

			var known_numerator = parseInt(document.getElementById(id_p+"-known-n").innerHTML);
			var user_guess = parseInt(document.getElementById(id_p+"-unknown-n").innerHTML);
			var answer = document.getElementById(id_p+"-answer-n").innerHTML;


			if((known_numerator+user_guess)==answer)
			{
				output.style.display="initial"
				output.innerHTML="that is right";
				this.correct++;
				//console.log("correct = "+correct);
			}
			else
			{
				output.style.display="initial"
				output.innerHTML="hmm I don't know if thats right";
			}

			if (this.correct== 3 && this.wall<10)
			{ 
				this.UpdateBackground();
			}else if(this.subRound==3 && this.correct!=3 && this.wall>0  ){
				this.DestroyWallBackground();
				this.correct=0;
			}
			
			
			
			if(this.wall==9)
			{
				return setTimeout(gameArea1.transition,300,'finish',this);
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
			setTimeout(GameFinish,2000);
		}
	}

	UpdateBackground(){	
		this.wall++;
		document.getElementById('backwall').src="../img/christopher/Wall"+this.wall+".png";
	}

	DestroyWallBackground(){
		this.wall--;
		document.getElementById('backwall').src="../img/christopher/wall"+this.wall+".png";
	}

	GameFinish(){
		document.getElementById('stumpy-talk').style.display="initial";
		setTimeout(function(){
			document.getElementById("ronaldo-talk").innerHTML="I see you finally finished";
		},2000);
		setTimeout(function(){
			document.getElementById("stumpy-talk").innerHTML="Good job worker";
		},1000)		
	}

	reset(){		//Function will be ran when the home button is clicked
		this.line = 0;
		this.wall = 0;
		this.correct = 0;
		this.subRound = 0;
		return;
	}
}