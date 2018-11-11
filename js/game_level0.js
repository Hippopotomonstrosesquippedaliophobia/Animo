const NumberOfGameQuestions = 2;
const NumberOfAllQuestions = 10;
var currentQuestion;
var currentQCount;
var questionStore;
var rightOrWrong = [];
var chosenAnswer = [];
var answers =[];
var timeTaken = 0;
var overAllScore;
var caterpillars;

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
	document.getElementById("game_container").style.backgroundImage = "url('../img/phonics/sky.png')";
	document.getElementById("caterpillarHead").style.display = "block";
	setBackgroundMusic('../music/background0.mp3');

	currentQCount = 0;
	caterpillars= []; 
	getQuestions().forEach(function(response){
		caterpillars.push(new Caterpillar(response.word));
	})
	document.getElementById('question0Caterpillar').appendChild(makeUL(caterpillars[currentQCount].letters));
	var options = getOptions();
	options.push(caterpillars[0].answer);
	options=(shuffle(options));
	document.getElementById('question0Options').appendChild(makeOptions(options));
	//showResults();
	//Logical Setup
	clearInterval(timeTaken);//Reset clock everytime 
	// currentQCount = -1;
	resetcounters();

}

function incrementQuestions(){
	clearQuestion();
	//questionReset();
	if (currentQCount < NumberOfGameQuestions - 1) {
		//Ensuring Questions are not equal to the max set questions
		currentQCount++;
		nextQuestion(currentQCount);
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
		setTimeout(showResults, 300);
		
	}
}
function nextQuestion(currentQCount){	
	var options = getOptions();
	options.push(caterpillars[0].answer);
	options=(shuffle(options));
	document.getElementById('question0Options').appendChild(makeOptions(options));
	document.getElementById('question0Caterpillar').appendChild(makeUL(caterpillars[currentQCount].letters));
}

function clearQuestion(){
	document.getElementById('question0Caterpillar').firstChild.remove();
	document.getElementById('question0Options').firstChild.remove();
}

// Gets a list of questions from the database
function getQuestions(){
	var randomNums = getRandomNumbers(NumberOfAllQuestions,NumberOfGameQuestions);
	var questions = new Array();

	// Needs more questions to be added for now
	//---------------------------------------------------------------------------------
	randomNums.forEach(function(callNum){
		questions.push(getJson(`Phonics/${2}`));
	});
	//---------------------------------------------------------------------------------
	// Use this line instead when testing or LIVE to simulate random question calls 
	// 	questions.push(getJson(`Phonics/${callNum}`));
	//	questions.push(getJson(`Phonics/0`));
	//----------------------------------------------------------------------------------

	return questions;
}

function getOptions(){
	var callNums = getRandomNumbers(4,3);
	var options = new Array();
	callNums.forEach(function(callnum){
		options.push(getJson(`Options/${callnum}`));
	});
	return options;
}

// Gets a list of random numbers. This'll be used to get the random questions from the DB.
function getRandomNumbers(max, amountOfNums){
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

function makeUL(array) {
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
		index = 4000 - (100 + i);
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
		bodyID = "bodyID" + i;

		
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

function makeOptions(array){
	var list = document.createElement('ul');
	list.style.marginTop = "70px";
	list.id = "question0OptionsList";
	for(var i = 0; i < array.length; i++) {
        // Create the list item:
		var item = document.createElement('li');
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
	option.addEventListener('mouseenter', function(){playPhoneticSound(this.childNodes[0].innerHTML);});
	option.onclick = function(){checkAnswer(this.childNodes[0].innerHTML);};
	//Added sound effect on hover buttons for the answers and on click for selection. (on click because buttons might change)
	//-------------------------------------------------
		item.appendChild(option);
	}
	
    // Finally, return the constructed list:
	return list;
	
}

function checkAnswer(userAnswer){
	chosenAnswer[currentQCount] = userAnswer;
	
	answer = caterpillars[currentQCount].answer;
	answers[currentQCount] = answer;

	//get answer from global variable of current Question

	if (userAnswer== answer) {
		//Correct Answer
		rightOrWrong[currentQCount] = 1;
		console.log("Ding!");
	}else{
		//Wrong Answer
		rightOrWrong[currentQCount] = 0;
		console.log("bleeehh");
	}
	//Next Question
	document.getElementById(`bodyID${caterpillars[currentQCount].missingPos}`).firstChild.innerHTML=userAnswer;
	animateNextQuestion();
}

function animateNextQuestion(){
	//Stops Clicking
	// for (i = 0; i < currentQuestion.Options.length; i ++){
	// 	bodyID = "body" + i;
	// 	document.getElementById(bodyID).style.cursor = "initial";
	// 	document.getElementById(bodyID).onclick = function() {
	// 	return false;
	// }
	
	

	//head = document.getElementById("testtttttttt"); //was testing why it was not moving
	head = document.getElementById("caterpillarHead");
	body = document.getElementById("question0Caterpillar");

	var posHead = -60;
	var posBody = 50;
	var id = setInterval(frame, 0.1);
	
	function frame() {
		if (posHead == -900) {
			clearInterval(id);
			
			//Reset head
			posHead = -60;
			head.style.marginLeft = posHead + 'px';
			incrementQuestions();
			
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

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

function playPhoneticSound(sound){
	var src = `../music/phonics/${sound}.mp3`;
	playSFX(src);
}

function showResults(){	
	head = document.getElementById("caterpillarHead");
	head.style.display = "none";
	document.getElementById("question0Options").style.display = "none";
	
	
	headerResults = document.getElementById("resultsText0");
	headerResults.style.opacity = 1;
	document.getElementById("results").style.display ="block";

	document.getElementById("shortHR").style.width = "150px";

	//the area of results is resultsReview
	review = document.getElementById("resultsReview");
	review.style.display = "block"; 
	review.style.opacity = 1;


	//Display User's Score
	timeTaken = document.getElementById("seconds").textContent;

	overAllScore = 0; 

	for (i = 0; i < rightOrWrong.length; i++){
		if (rightOrWrong[i] == 1){
			overAllScore = overAllScore + 1;
		}
	}
	document.getElementById("score0").innerHTML=`${overAllScore}/${NumberOfGameQuestions}`;
	document.getElementById("timeTaken0").innerHTML=`${timeTaken} seconds`;

	var openReview = document.createElement('div');
	openReview.id="reviewAccordian";
	openReview.style.display="block";
	openReview.innerHTML = '<input type="checkbox" id="toggle" /><label for="toggle"><div class="expand" styele="margin-bottom:10px;"><div class="changeArrow arrow-up">↑</div><div class="changeArrow arrow-dn">↓</div><b>Click here to review your answers</b></div></label><div class="fieldsetContainer"><fieldset id="fdstLorem"></fieldset></div>';
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
		console.log(chosenAnswer[i])
		reviewQuestion.innerHTML = '<p>Question ' + questionNum + ': ' + pointGiven + '</p>';
		reviewableContent.innerHTML = '<p> ' + caterpillars[i].word + '</p> <br> Your answer: '+ chosenAnswer[i] +' <br> <p style="padding-bottom: 10px">Answer: ' + caterpillars[i].answer +' </p>';
		
		//Show easily right questions and wrong ones
		if (chosenAnswer[i] == caterpillars[i].answer){
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
	clearInterval(timeTaken);

	for (i = 0; i < NumberOfGameQuestions; i++){
		document.getElementById("question0Caterpillar").innerHTML = ""; //CHANGE TO i or the game will go blank when a question is called
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

	// questionArea = document.getElementById("question0");
	// questionArea.style.width = "900px"
	// questionArea.style.marginLeft= "4.7%";
		 	
	//document.getElementsByClassName("scoreInfo").innerHTML = ""; //Resets Result info

	for (i = 0; i < NumberOfGameQuestions; i++){
		document.getElementById("question0Options").innerHTML = ""; 
	}
}

function removeElement(elementId) {
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}


