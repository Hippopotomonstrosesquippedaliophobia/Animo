const NumberOfGameQuestions = 5;
const NumberOfAllQuestions = 10;
var currentQuestion;
var currentQCount;
var questionStore;
var rightOrWrong = [];
var chosenAnswer = [];
var timeTaken = 0;
var overAllScore;

function resetcounters(){
	var currentQuestion = 0;
	var currentQCount = 0;
}

function offOverlay0(){
	document.getElementById(`overlay0`).style.display = "none";
	document.getElementById(`gameContainer0`).style.display = "block";	
	document.getElementById("home_button").style.display = "block";	

	clearInterval(timeTaken);//Reset clock everytime 
	timeTaken = window.setInterval((function(){
						start = Date.now();
						secondsCounter = document.getElementById('seconds');
						return function() {
							secondsCounter.innerHTML = Math.floor((Date.now()-start)/1000);
						};
					}()), 1000);	
}

function gameZeroLoad(){
	//Aesthetic Setup
	document.getElementById("game_container").style.backgroundImage = "url('../img/phonics/grassy3.gif')";
	//musicChange = new Audio('../music/grassyZelda.mp3').play();

	//Logical Setup
	clearInterval(timeTaken);//Reset clock everytime 
	currentQCount = -1;
	resetcounters();
	questionStore = getQuestions();	
	currentQuestion = questionStore[currentQCount];
	incrementQuestions();
}

function incrementQuestions(){
	questionReset();
	if (currentQCount < NumberOfGameQuestions - 1) {
		//Ensuring Questions are equal to the max set
		currentQuestion = questionStore[++currentQCount];
		nextQuestion(currentQuestion);
	}else{
		//Prepare Results area for text appending		
		document.getElementById("resultsText0").style.display = "block";
		document.getElementById("shortHR").style.display = "block";
		document.getElementById("resultsReview").style.display = "block"; 
		document.getElementById("resultsReview").style.opacity = 1;
		document.getElementById("resultsReview").style.overflowY = "auto";
		document.getElementById("resultsReview").style.overflowX = "hidden";
		//Clear text and show results
		setTimeout(showResults, 300);
		
	}
}
function nextQuestion(thequestion){	
	document.getElementById(`questionText0`).innerHTML = thequestion.Question.replace('{_}', '___');
	document.getElementById('question0Options').appendChild(makeUL(thequestion.Options));
	//When the person answers the question, the array could be incremented but I'm tired.
	//Imma tag you in Brons
}

// Gets a list of questions from the database
function getQuestions(){
	var randomNums = getRandomNumbers();
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

// Gets a list of random numbers. This'll be used to get the random questions from the DB.
function getRandomNumbers(){
	var callNums = [getRandomInt(NumberOfAllQuestions)];

	do{
		do {
			var callNum = getRandomInt(NumberOfAllQuestions); 			
		}while(callNums.includes(callNum));// Making sure there isn't a duplicate
		callNums.push(callNum);
	}while(callNums.length!= NumberOfGameQuestions);

	console.log('CallNums:', callNums);	

	return callNums;
}

function makeUL(array) {
    // Create the list element:
	var list = document.createElement('ul');
	list.id = "question0AnsOptions"

	var item1 = document.createElement('li');
	var head = document.createElement('img');
	head.src= "../img/phonics/SegHead.png";
	head.setAttribute('width', '220px');
	head.style.marginTop = "-50px";
	head.style.marginLeft= "-132px";
	head.style.position= "absolute";
	head.setAttribute('z-index', '1');
	item1.appendChild(head);
	list.appendChild(item1);
	
    for(var i = 0; i < array.length; i++) {
        // Create the list item:
		var item = document.createElement('li');

		// I'm putting in a button but depending on the mechanics we agree on this is subject to change
		// Feel free to experiment with flip cards and stuff
		var button = document.createElement('img');
		button.setAttribute('margin-right', '-10px');
		button.setAttribute("id", "btnID" + i); //Adds id to button for referencing
		button.classList.add('btnCLASS'+ i); //Adds class to button for referencing
		button.style.width='200px';
		bttnsID = "btnID" + i;
		button.src = ""

		//Adds sound effect on hover buttons for the answers and on click for selection. (on click because buttons might change)
		//-------------------------------------------------
		
		button.addEventListener('mouseover', function(){
			playPhoneticSound(this.id);			
		});
		button.onclick = function(){ checkAnswer(this.id);};
		//Added sound effect on hover buttons for the answers and on click for selection. (on click because buttons might change)
		//-------------------------------------------------
		
		button.appendChild(document.createTextNode(array[i]));
		
        // Set the list item's contents:
		item.appendChild(button);
		
        // Add it to the list:
		list.appendChild(item);	

		if (i%2){
			button.src = "../img/phonics/SegGrn.png";
			//document.getElementById(bttnsID).style.backgroundImage = 'url("../img/phonics/SegGrn.png")';
		}else{
			button.src = "../img/phonics/SegYel.png";
			//document.getElementById(bttnsID).style.backgroundImage = 'url("../img/phonics/SegYel.png")';
		}	
		
    }

	
    // Finally, return the constructed list:
    return list;
}
function checkAnswer(id){
	chosenAnswer[currentQCount] = document.getElementById(id).innerText;

	//get answer from global variable of current Question
	answer = currentQuestion.Answer;

	if (chosenAnswer[currentQCount] == currentQuestion.Options[answer]) {
		//Correct Answer
		rightOrWrong[currentQCount] = 1;
		console.log("Ding!");
	}else{
		//Wrong Answer
		rightOrWrong[currentQCount] = 0;
		console.log("bleeehh");
	}
	//Next Question
	incrementQuestions();
}

function playPhoneticSound(bttnsID){
	var elem = document.getElementById(bttnsID);
	var txt =  elem.innerText;
	switch(txt){
		case "a":
			var audio = document.getElementById("ah");
			audio.play();
		break;
		case "e":
			var audio = document.getElementById("eh");
			audio.play();
		break;
		case "th":
			var audio = document.getElementById("th");
			audio.play();
		break;
		default:
			//console.log("No response to hover");
	}
}

function showResults(){	
	document.getElementById("questionText0").innerHTML = "";
	document.getElementById("question0Options").innerHTML = "";
	questionArea = document.getElementById("question0");
	questionArea.style.width = "400px";
	questionArea.style.marginLeft = "29%";
	
	headerResults = document.getElementById("resultsText0");
	headerResults.innerHTML = "Results";
	headerResults.style.opacity = 1;

	document.getElementById("shortHR").style.width = "150px";

	//the area of results is resultsReview
	review = document.getElementById("resultsReview");
	review.style.display = "block"; 
	review.style.opacity = 1;


	//Display User's Score
	var scoreReview = document.createElement('div');
	scoreReview.className += "scoreInfo";
	timeTaken = document.getElementById("seconds").textContent;

	overAllScore = 0; 

	for (i = 0; i < rightOrWrong.length; i++){
		if (rightOrWrong[i] == 1){
			overAllScore = overAllScore + 1;
		}
	}
	scoreReview.innerHTML = '<div style="padding-bottom: 10px; height: 33px;"><h4 style="float:left">Your score is:</h4> <p style="float:right; padding-right: 35px;">'+overAllScore+'/'+NumberOfGameQuestions+' </p></div><br><div style="padding-bottom: 10px;"><h4 style="float: left">Time Taken: </h4> <p style="float: right; padding-right:35px">' +timeTaken+' seconds</p></div>' ;

	review.appendChild(scoreReview);	

	var openReview = document.createElement('div');
	openReview.innerHTML = '<input type="checkbox" id="toggle" /><label for="toggle"><div class="expand" style="width: 100%; margin-top: 71px; margin-left: 19%; padding-bottom: 20px;"><div class="changeArrow arrow-up">↑</div><div class="changeArrow arrow-dn">↓</div><b>Click here to review your answers</b></div></label><div class="fieldsetContainer"><fieldset id="fdstLorem"></fieldset></div>';
	review.appendChild(openReview);
	
	for (i = 0; i < NumberOfGameQuestions; i++){
		var reviewQuestion = document.createElement('button'); //create reviewable node
		reviewQuestion.className += "accordion"

		var reviewableContent = document.createElement('div'); //create reviewable node
		reviewableContent.className += "panel"

		questionNum = i + 1;

		var pointGiven;

		if (rightOrWrong[i] == 1){
			pointGiven = "Correct";
		}else{
			pointGiven = "Incorrect";
		}		

		var acc = document.getElementsByClassName("accordion");

		reviewQuestion.innerHTML = '<p>Question ' + questionNum + ': ' + pointGiven + '</p>';
		reviewableContent.innerHTML = '<p> ' + questionStore[i].Question + '</p> <br> Your answer: '+ chosenAnswer[i] +' <br> <p style="padding-bottom: 10px">Answer: ' + questionStore[i].Options[[questionStore[i].Answer]] +' </p>';
		
		//Show easily right questions and wrong ones
		if (chosenAnswer[i] == questionStore[i].Options[[questionStore[i].Answer]]){
			reviewQuestion.style.backgroundColor = "#e6ffcc"; // green
		}else{
			reviewQuestion.style.backgroundColor = "#ffcccc"; //red
		}

		reviewOpen = document.getElementById("fdstLorem");
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

function gameZeroReset(){
	document.getElementById("game_container").style.backgroundImage = "url('../img/background_waterfall.gif')";
	document.getElementById(`overlay0`).style.display = "block";
	document.getElementById(`gameContainer0`).style.display = "none";

	for (i = 0; i < NumberOfGameQuestions; i++){
		document.getElementById("question0Options").innerHTML = ""; //CHANGE TO i or the game will go blank when a question is called
	}
}

function questionReset(){
	//Hide Results
	resultsText = document.getElementById("resultsText0");
	resultsText.style.opacity = 0;
	resultsText.style.display = "none";
	hr = document.getElementById("shortHR");
	hr.style.width = "0px";
	hr.style.display = "none";
	review = document.getElementById("resultsReview");
	review.style.opacity = 0;
	review.innerHTML = "";
	review.style.display = "none"; 

	questionArea = document.getElementById("question0");
	questionArea.style.width = "900px"
	questionArea.style.marginLeft= "4.7%";
		 	
	document.getElementsByClassName("scoreInfo").innerHTML = ""; //Resets Result info

	for (i = 0; i < NumberOfGameQuestions; i++){
		document.getElementById("question0Options").innerHTML = ""; 
	}
}

function removeElement(elementId) {
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}


