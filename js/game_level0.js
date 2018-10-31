const NumberOfGameQuestions = 5;
const NumberOfAllQuestions = 10;
var currentQuestion;
var currentQCount;
var questionStore;
var rightAnswer
var idd = 0;

function resetcounters(){
	var currentQuestion = 0;
	var currentQCount = 0;
	console.log("Cleared currentQuestion: "+currentQuestion+ " and currentQCount: "+currentQCount);
}

function offOverlay0(){
	document.getElementById(`overlay0`).style.display = "none";
	document.getElementById(`gameContainer0`).style.display = "block";	
	document.getElementById("home_button").style.display = "block";
}

function gameZeroLoad(){
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
		console.log(currentQuestion);
		console.log(currentQCount); 
	}else{
		//Prepare Results area for text appending		
		document.getElementById("resultsText0").style.display = "block";
		document.getElementById("shortHR").style.display = "block";
		document.getElementById("resultsReview").style.display = "block"; 
		document.getElementById("resultsReview").style.opacity = 1;
		document.getElementById("resultsReview").style.overflowY = "scroll";
		
		//Clear text and show results
		setTimeout(showResults, 300);
		
	}
}
function nextQuestion(thequestion){	
	console.log(thequestion);
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
    for(var i = 0; i < array.length; i++) {
        // Create the list item:
		var item = document.createElement('li');

		// I'm putting in a button but depending on the mechanics we agree on this is subject to change
		// Feel free to experiment with flip cards and stuff
		var button = document.createElement('button');
		button.setAttribute("id", "btnID" + i); //Adds id to button for referencing
		button.classList.add('btnCLASS'+ i); //Adds class to button for referencing

		//Adds sound effect on hover buttons for the answers and on click for selection. (on click because buttons might change)
		//-------------------------------------------------
		bttnsID = "btnID" + i;
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
    }

    // Finally, return the constructed list:
    return list;
}
function checkAnswer(id){
	chosenAnswer = document.getElementById(id).innerText;
	console.log("Button clicked is " +chosenAnswer);	

	//get answer from global variable of current Question
	answer = currentQuestion.Answer;

	if (chosenAnswer == currentQuestion.Options[answer]) {
		//Correct Answer
		console.log("Ding!");
	}else{
		//Wrong Answer
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
			console.log("AH hovered");
			var audio = document.getElementById("ah");
			audio.play();
		break;
		case "e":
			console.log("EH hovered");
			var audio = document.getElementById("eh");
			audio.play();
		break;
		case "th":
			console.log("TH hovered");
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
	questionArea.style.width = "300px";
	questionArea.style.marginLeft = "32%";
	
	headerResults = document.getElementById("resultsText0");
	headerResults.innerHTML = "Results";
	headerResults.style.opacity = 1;

	document.getElementById("shortHR").style.width = "150px";

	//the area of results is resultsReview

}

function gameZeroReset(){
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
	review.style.display = "none"; 
	

	for (i = 0; i < NumberOfGameQuestions; i++){
		document.getElementById("question0Options").innerHTML = ""; 
	}
}

function removeElement(elementId) {
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}


