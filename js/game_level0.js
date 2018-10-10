function offOverlay(){
	document.getElementById(`overlay`).style.display = "none";
	document.getElementById(`gameContainer0`).style.display = "block";

}

function gameZeroLoad(){
	var callNum = getRandomInt(2);
	console.log(`From database: Question`, callNum);
	
	var question = getJson(`Phonics`);	
	document.getElementById(`questionText0`).innerHTML = question[callNum].Question;	
	console.log(``, question[callNum].Question);	
}
