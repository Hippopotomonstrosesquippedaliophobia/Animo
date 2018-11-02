function autoplay(){  
	var audio = document.getElementById("background_music");

	audio.addEventListener("canplay", function() {
	  setTimeout(function() {
		audio.play();
	  }, 2000);
	});
} 
 
function changeAudioImage(){  
	document.getElementById('background_music').muted=!document.getElementById('background_music').muted;	
	if (document.getElementById('background_music').muted){
		document.getElementById('muted_audio').src="../img/mute.png";
	}else{
		document.getElementById('muted_audio').src="../img/audio.png";
	}
}

function flipSound(){
	var flip = document.getElementById("flipcardSound");	
	flip.play();	
}