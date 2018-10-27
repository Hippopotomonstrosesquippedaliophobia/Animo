

function autoplay(){  
	var audio = document.getElementById("background_music");

	audio.addEventListener("canplay", function() {
	  setTimeout(function() {
		audio.play();
	  }, 2000);
	});

	audio.volume = 0.3;
}  
function changeAudioImage(){  
	document.getElementById('background_music').muted=!document.getElementById('background_music').muted;	
	if (document.getElementById('background_music').muted){
		document.getElementById('muted_audio').src="../img/mute.png";
	}else{
		document.getElementById('muted_audio').src="../img/audio.png";
	}
}

function setBackgroundMusic(newAudioSrc){
	var backgroundMusic = document.getElementById("background_music");
	backgroundMusic.currentTime = 0;
	backgroundMusic.src = newAudioSrc;
}

function resetBackgroundMusic(){
	setBackgroundMusic("../music/background_music2.mp3");
}

function flipSound(){
	var flip = document.getElementById("flipcardSound");
	flip.volume = 0.3;	
	flip.play();	
}