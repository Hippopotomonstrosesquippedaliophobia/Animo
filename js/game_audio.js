var muted = false;
var volume = 0.3;

function autoplay(){  
	var audio = document.getElementById("background_music");

	audio.addEventListener("canplay", function() {
	  setTimeout(function() {
		audio.play();
	  }, 2000);
	});

	audio.volume = volume;
	audio.pause();
} 

function resetVolume(){
	document.getElementById("background_music").volume = volume;
} 

function toggleMute(){  
	document.getElementById('background_music').muted=!document.getElementById('background_music').muted;
	muted = !muted;	
	if (muted){
		document.getElementById('muted_audio').src="../img/mute.png";
	}else{
		document.getElementById('muted_audio').src="../img/audio.png";
	}
}

function setBackgroundMusic(newAudioSrc){
	var backgroundMusic = document.getElementById("background_music");
	backgroundMusic.currentTime = 0;
	backgroundMusic.src = newAudioSrc;
	backgroundMusic.muted = muted;
}

function resetBackgroundMusic(){
	setBackgroundMusic("../music/backdrop.mp3");
}

function lowerBackgroundMusic(){
	document.getElementById("background_music").volume = 0.15;
}

// function flipSound(){
// 	var flip = document.getElementById("flipcardSound");
// 	flip.volume = 0.3;	
// 	flip.play();	
// }

function playSFX(src, volume = 0.1){
	var audio = new Audio(src);
	if(!muted){
		audio.volume = volume;
		audio.play();
	}
}