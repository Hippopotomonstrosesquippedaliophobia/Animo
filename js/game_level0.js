class Caterpillar{
	constructor(word){
		this.word = word;
		var manipArray = word.split('{');
		var splitArray = manipArray[1].split('}');
		manipArray.pop();			
		this.answer = (splitArray[0]);
		
		var  manipArray = manipArray.concat(splitArray);
		var letters = [];
		for (var i = 0; i < manipArray.length; i++) {
			if(manipArray[i]==this.answer){
				letters.push(" ");
				continue;
			}
			for(var j=0; j<manipArray[i].length; j++){
				letters.push(manipArray[i].charAt(j));
			}
		}
		this.letters = letters;

		for(var i=0; i<letters.length; i++){
			if(letters[i]==' '){
				this.missingPos = i;
			}
		}

	}
}

class gameArea0{
	constructor(){
		this.NumberOfGameQuestions = 2;
		this.NumberOfAllQuestions = 10;
		this.currentQuestion;
		this.currentQCount = 0;
		this.questionStore;
		this.rightOrWrong = [];
		this.chosenAnswer = [];
		this.answers =[];
		this.timeTaken = 0;
		this.overAllScore;
		this.caterpillars = [];
	}

	resetcounters(){
		var currentQuestion = 0;
		var currentQCount = 0;
	}

	offOverlay(){
		document.getElementById(`overlay0`).style.display = "none";
		document.getElementById(`gameContainer0`).style.display = "block";	
		document.getElementById("home_button").style.display = "block";	

		clearInterval(this.timeTaken);//Reset clock everytime 
		this.timeTaken = window.setInterval((function(){
			var start = Date.now();
			var secondsCounter = document.getElementById('seconds');
			return function() {
				secondsCounter.innerHTML = Math.floor((Date.now()-start)/1000);
			};
		}()), 1000);	
	}

	load(){
		//Aesthetic Setup
		document.getElementById("game_container").style.backgroundImage = "url('../img/phonics/sky.png')";
		document.getElementById("caterpillarHead").style.display = "block";

		//Change music
		setBackgroundMusic('../music/background0.mp3'); 

		var tempPillars =[];
		this.getQuestions().forEach(function(response){			
			tempPillars.push(new Caterpillar(response.word));
		});
		this.caterpillars = tempPillars;

		//Add Options to Caterpillar etc: Set up question
		document.getElementById('question0Caterpillar').appendChild(this.makeUL(this.caterpillars[this.currentQCount].letters));
		var options = this.getOptions();
		options.push(this.caterpillars[this.currentQCount].answer);
		console.log(options);
		options=(shuffle(options));
		document.getElementById('question0Options').appendChild(this.makeOptions(options));

		//Display it to screen		
		document.getElementById('question0Options').style.display="block";
	
		clearInterval(this.timeTaken);//Reset clock everytime 
		this.resetcounters();
	}

	incrementQuestions(){		
		this.clearQuestion();
		//questionReset();
		if (this.currentQCount < this.NumberOfGameQuestions - 1) {
			//Ensuring Questions are not equal to the max set questions
			this.currentQCount++;
			this.nextQuestion(this.currentQCount);
		}else{
			//Prepare Results area for text appending	
			document.getElementById("caterpillarHead").style.display = "none";	
			document.getElementById("resultsText0").style.display = "block";
			document.getElementById("shortHR").style.display = "block";
			document.getElementById("resultsReview").style.display = "block"; 
			document.getElementById("resultsReview").style.opacity = 1;
			document.getElementById("resultsReview").style.overflowY = "auto";
			document.getElementById("resultsReview").style.overflowX = "hidden";
			//Clear text and show results
			setTimeout(gameArea0.showResults, 300, this);
			
		}
	}

	nextQuestion(currentQCount){	
		var options = this.getOptions();
		options.push(this.caterpillars[this.currentQCount].answer);
		options=(shuffle(options));
		document.getElementById('question0Options').appendChild(this.makeOptions(options));
		document.getElementById('question0Caterpillar').appendChild(this.makeUL(this.caterpillars[currentQCount].letters));
	}

	clearQuestion(){
		if(document.getElementById('question0Caterpillar').firstChild!=null)
			document.getElementById('question0Caterpillar').firstChild.remove();
		if(document.getElementById('question0Options').firstChild!=null)
			document.getElementById('question0Options').firstChild.remove();
	}

	// Gets a list of questions from the database
	getQuestions(){
		var randomNums = this.getRandomNumbers(this.NumberOfAllQuestions, this.NumberOfGameQuestions);
		var questions = new Array();

		// Needs more questions to be added for now
		//---------------------------------------------------------------------------------
		randomNums.forEach(function(callNum){
			questions.push(getJson(`Phonics/${callNum}`));
		});
		//---------------------------------------------------------------------------------
		// Use this line instead when testing or LIVE to simulate random question calls 
		// 	questions.push(getJson(`Phonics/${callNum}`));
		//	questions.push(getJson(`Phonics/0`));
		//----------------------------------------------------------------------------------
		return questions;
	}

	getOptions(){
		var callNums = this.getRandomNumbers(4,3);
		var options = new Array();
		callNums.forEach(function(callnum){
			options.push(getJson(`Options/${callnum}`));
		});
		return options;
	}

	// Gets a list of random numbers. This'll be used to get the random questions from the DB.
	getRandomNumbers(max, amountOfNums){
		if(amountOfNums>max){
			console.log("Bad function call at: getRandomNumbers()");
			return;
		}
		var callNums = [getRandomNumberUpTo(max)];

		do{
			do {
				var callNum = getRandomNumberUpTo(max); 			
			}while(callNums.includes(callNum));// Making sure there isn't a duplicate
			callNums.push(callNum);
		}while(callNums.length!= amountOfNums);

		return callNums;
	}

	makeUL(array) {
		// Create the list element:
		var list = document.createElement('ul');
		list.style.marginTop = "70px";
		list.id = "question0CaterpillarBody";
		
		var randomizeColour = [];
		for(var i = 0; i < array.length; i++) {
			// Create the list item:
			var item = document.createElement('li');
			var body = document.createElement('div');
			body.style.marginleft = "-210px";
			body.style.marginRight = "-20px";
			body.setAttribute("id", "bodyID" + i); //Adds id to body for referencing
			//body.classList.add('body'+ i); //Adds class to body for referencing
			body.classList.add('object' + i);
			body.style.width='200px';
			body.style.height='200px';
			body.style.cssFloat = "left";	
			var index = 4000 - (100 + i);
			body.style.zIndex = index;
			// Add it to the list:
			list.appendChild(item);	
					
			randomizeColour[i] = getRandomNumberUpTo(2);
			
			//Randomize Caterpillar colour pallette 

			if (randomizeColour[i] == 1){
				//button.src = "../img/phonics/SegGrn.png";
				body.style.backgroundImage = 'url("../img/phonics/greenbody.png")';
			}else{
				//button.src = "../img/phonics/SegYel.png";
				body.style.backgroundImage = 'url("../img/phonics/yellowbody.png")';
			}	
			
			//button.style.backgroundColor= "red";
			body.style.backgroundSize = "100% 100%";

			
			var textNode = document.createElement('p');
			textNode.setAttribute('id','answerText'+i);
			textNode.innerHTML = array[i];
			textNode.style.marginLeft = "20px";
			textNode.style.marginTop = "76px";
			textNode.style.fontSize = "40px";
			// textNode.style.fontFamily="Press Start 2P, cursive";
			body.appendChild(textNode);
			//button.appendChild(document.createTextNode(array[i]));
			// Set the list item's contents:
			item.appendChild(body);
		}

		// Finally, return the constructed list:
		return list;
	}

	makeOptions(array){
		var list = document.createElement('ul');
		list.style.marginTop = "70px";
		list.id = "question0OptionsList";
		
		for(var i = 0; i < array.length; i++) {
			// Create the list item:
			var item = document.createElement('li');
			item.style.width = "200px";
			var option = document.createElement('div');
			option.style.width='200px';
			option.style.height='200px';
			// Add it to the list:
			list.appendChild(item);	
					
			var randomizeColour = getRandomNumberUpTo(2);
			
			//Randomize Caterpillar colour pallette 

			if (randomizeColour == 1){
				option.style.backgroundImage = 'url("../img/phonics/greenbody.png")';
			}else{
				option.style.backgroundImage = 'url("../img/phonics/yellowbody.png")';
			}	
			
			option.style.backgroundSize = "100% 100%";
			
			var textNode = document.createElement('h1');
			textNode.innerHTML = array[i];
			textNode.style.fontSize = "40px";
			option.appendChild(textNode);
			// Set the list item's contents:
			//Adds sound effect on hover buttons for the answers and on click for selection. (on click because buttons might change)
			//-------------------------------------------------
			option.style.cursor= "pointer";
			option.id = "caterpillarAnswer"+i;			
			option.classList.add("caterpillarAnswer");
			option.addEventListener('mouseenter', function(){gameArea0.playPhoneticSound(this.childNodes[0].innerHTML);});
			var game = this;
			option.onclick = function(){game.checkAnswer(this.childNodes[0].innerHTML)};
			//Added sound effect on hover buttons for the answers and on click for selection. (on click because buttons might change)
			//-------------------------------------------------
			item.appendChild(option);
		}
		
		// Finally, return the constructed list:
		return list;
		
	}

	checkAnswer(userAnswer){
		this.chosenAnswer[this.currentQCount] = userAnswer;
		
		var answer = this.caterpillars[this.currentQCount].answer;
		this.answers[this.currentQCount] = answer;

		//get answer from global variable of current Question

		if (userAnswer== answer) {
			//Correct Answer
			this.rightOrWrong[this.currentQCount] = 1;
		}else{
			//Wrong Answer
			this.rightOrWrong[this.currentQCount] = 0;
		}
		//Next Question
		document.getElementById(`bodyID${this.caterpillars[this.currentQCount].missingPos}`).firstChild.innerHTML= userAnswer;
		this.animateNextQuestion();
	}

	animateNextQuestion(){
		//head = document.getElementById("testtttttttt"); //was testing why it was not moving
		document.getElementById('question0Options').firstChild.remove();
		var head = document.getElementById("caterpillarHead");
		var body = document.getElementById("question0Caterpillar");

		var posHead = -60;
		var posBody = 50;
		var id = setInterval(frame, 0.1,this);
		
		function frame(game) {
			if (posHead == -900) {
				clearInterval(id);
				
				//Reset head
				posHead = -60;
				head.style.marginLeft = posHead + 'px';
				game.incrementQuestions();
				
				body.style.marginLeft ='50px';
				//body.style.marginleft = posBody + 'px';
			} else {
				posHead--; 
				posBody--;
				head.style.marginLeft = posHead + 'px';
				body.style.marginLeft = posBody + 'px';
			}
		}
	}

	getOffset(el) {
		const rect = el.getBoundingClientRect();
		return {
			left: rect.left + window.scrollX,
			top: rect.top + window.scrollY
		};
	}

	static playPhoneticSound(sound, id){
		//play sound effect
		var src = `../music/phonics/${sound}.mp3`;
		playSFX(src);
	}

	static showResults(game){	
		var head = document.getElementById("caterpillarHead");
		head.style.display = "none";
		document.getElementById("question0Options").style.display = "none";
		
		
		var headerResults = document.getElementById("resultsText0");
		headerResults.style.opacity = 1;
		document.getElementById("results").style.display ="block";

		document.getElementById("shortHR").style.width = "150px";

		//the area of results is resultsReview
		var review = document.getElementById("resultsReview");
		review.style.display = "block"; 
		review.style.opacity = 1;


		//Display User's Score
		var timeTaken = document.getElementById("seconds").textContent;

		var overAllScore = 0;
		for (var i = 0; i < game.rightOrWrong.length; i++){
			if (game.rightOrWrong[i] == 1){
				overAllScore = overAllScore + 1;
			}
		}
		document.getElementById("score0").innerHTML=`${overAllScore}/${game.NumberOfGameQuestions}`;
		document.getElementById("timeTaken0").innerHTML=`${timeTaken} seconds`;

		var openReview = document.createElement('div');
		openReview.id="reviewAccordian";
		openReview.style.display="block";
		openReview.innerHTML = '<input type="checkbox" id="toggle" /><label for="toggle"><div class="expand" style="margin-bottom:25px;"><div class="changeArrow arrow-up">↑</div><div class="changeArrow arrow-dn">↓</div><b id="changeFont">Click to review your answers</b></div></label><div class="fieldsetContainer"><fieldset id="fdstLorem"></fieldset></div>';
		review.appendChild(openReview);
		
		for (var i = 0; i < game.NumberOfGameQuestions; i++){
			var reviewQuestion = document.createElement('button'); //create reviewable node
			reviewQuestion.className += "accordion"

			var reviewableContent = document.createElement('div'); //create reviewable node
			reviewableContent.className += "panel"

			var questionNum = i + 1;

			var pointGiven;

			if (game.rightOrWrong[i] == 1){
				pointGiven = "Correct";
			}else{
				pointGiven = "Incorrect";
			}		

			var acc = document.getElementsByClassName("accordion");
			reviewQuestion.innerHTML = '<p>Question ' + questionNum + ': ' + pointGiven + '</p>';
			reviewableContent.innerHTML = '<p> ' + game.caterpillars[i].word + '</p> <br> Your answer: '+ game.chosenAnswer[i] +' <br> <p style="padding-bottom: 10px">Answer: ' + game.caterpillars[i].answer +' </p>';
			
			//Show easily right questions and wrong ones
			if (game.chosenAnswer[i] == game.caterpillars[i].answer){
				reviewQuestion.style.backgroundColor = "#e6ffcc"; // green
			}else{
				reviewQuestion.style.backgroundColor = "#ffcccc"; //red
			}

			var reviewOpen = document.getElementById("fdstLorem");
			//Add everything to list
			reviewOpen.appendChild(reviewQuestion);		
			reviewOpen.appendChild(reviewableContent);
		}

		//Create all the elements then append this to the accordion list
		var z;
		for (z = 0; z < acc.length; z++) {
			acc[z].addEventListener("click", function() {
			this.classList.toggle("active");
			var panel = this.nextElementSibling;
			
			if (panel.style.maxHeight){
				panel.style.maxHeight = null;
			} else {
				panel.style.maxHeight = panel.scrollHeight + "px";
			} 
		});
		}
	}

	reset(){
		document.getElementById("game_container").style.backgroundImage = "url('../img/background_waterfall.gif')";
		document.getElementById(`overlay0`).style.display = "block";
		document.getElementById(`gameContainer0`).style.display = "none";
		document.getElementById(`results`).style.display = "none";
		clearInterval(this.timeTaken);
		//this.questionReset();
		this.clearQuestion();
		this.resetcounters();
		for (var i = 0; i < this.NumberOfGameQuestions; i++){
			document.getElementById("question0Caterpillar").innerHTML = ""; //CHANGE TO i or the game will go blank when a question is called
		}
	}
	
	restart(){
		//Perform all resets and reload
		this.reset();
		this.load();
	}

	questionReset(){
		//Hide Results
		var resultsText = document.getElementById("resultsText0");
		resultsText.style.opacity = 0;
		resultsText.style.display = "none";
		var hr = document.getElementById("shortHR");
		hr.style.width = "0px";
		hr.style.display = "none";
		var review = document.getElementById("resultsReview");
		review.style.opacity = 0;
		review.innerHTML = "";
		review.style.display = "none"; 

		// questionArea = document.getElementById("question0");
		// questionArea.style.width = "900px"
		// questionArea.style.marginLeft= "4.7%";
				
		//document.getElementsByClassName("scoreInfo").innerHTML = ""; //Resets Result info

		for (var i = 0; i < this.NumberOfGameQuestions; i++){
			document.getElementById("question0Options").innerHTML = ""; 
		}
	}

	removeElement(elementId) {
		var element = document.getElementById(elementId);
		element.parentNode.removeChild(element);
	}
}


