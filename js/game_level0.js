const NumberOfGameQuestions = 5;
const NumberOfAllQuestions = 10;
var currentQuestion;
var currentQCount = 0;

function resetcounters(){
	var currentQuestion = null;
	var currentQCount = 0;
}

function offOverlay0(){
	document.getElementById(`overlay0`).style.display = "none";
	document.getElementById(`gameContainer0`).style.display = "block";	
	document.getElementById("home_button").style.display = "block";
}

function gameZeroLoad(){
	var questions = getQuestions();	
	currentQuestion = questions[currentQCount];
	incrementQuestions(questions);
}

function incrementQuestions(questions){
	currentQuestion = questions[currentQCount++];
	nextQuestion(currentQuestion);
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
	answer = document.getElementById(id).innerText;
}

function playPhoneticSound(bttnsID){
	var elem = document.getElementById(bttnsID);
	var txt =  elem.innerText;
	console.log(txt);
	switch(txt){
		case "a":
			console.log("AH");
			var audio = document.getElementById("ah");
			audio.play();
		break;
		case "e":
			console.log("EH");
			var audio = document.getElementById("eh");
			audio.play();
		break;
		case "th":
			console.log("TH");
			var audio = document.getElementById("th");
			audio.play();
		break;
		default:
			console.log("No response to hover");
	}
}

function gameZeroReset(){
	document.getElementById(`overlay0`).style.display = "block";
	document.getElementById(`gameContainer0`).style.display = "none";

	for (i = 0; i < NumberOfGameQuestions; i++){
		document.getElementById("question0Options").innerHTML = ""; //CHANGE TO i or the game will go blank when a question is called
	}
}

function removeElement(elementId) {
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}


