const NumberOfGameQuestions = 5;
const NumberOfAllQuestions = 10;

function offOverlay(){
	document.getElementById(`overlay`).style.display = "none";
	document.getElementById(`gameContainer0`).style.display = "block";

}

function gameZeroLoad(){
	var questions = getQuestions();		
	document.getElementById(`questionText0`).innerHTML = questions[0].Question;
	document.getElementById('question0Options').appendChild(makeUL(questions[0].Options));
	//When the person answers the question, the array could be incremented but I'm tired.
	//Imma tag you in Brons  
}

// Gets a list of questions from the database
function getQuestions(){
	var randomNums = getRandomNumbers();
	var questions = new Array();

	// May break program later depending on what questions we get from the DB.
	// Not all the questions on the DB have options yet
	//---------------------------------------------------------------------------------
	randomNums.forEach(function(callNum){
		questions.push(getJson(`Phonics/${callNum}`));
	});
	//---------------------------------------------------------------------------------
	// Use this line instead when testing because the question at index 0 definitely has 'Options' 
	// questions.push(getJson(`Phonics/0`));
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
		button.appendChild(document.createTextNode(array[i]));

        // Set the list item's contents:
        item.appendChild(button);

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}


