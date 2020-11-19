musics = ["music1.mp3","music2.mp3","music3.mp3"]
let play_btn = document.getElementById("play");
let prev_btn = document.getElementById("pre");
let next_btn = document.getElementById("next");
let range = document.getElementById("range");
let play_img = document.getElementById("play_img")
let currentTime = document.getElementById("time")
let total_time = 0;
let song = new Audio();
let currentSong = 0;
window.onload = playSong;

function playSong(){
    song.src = musics[currentSong];
    song.play();
    range.max = total_time;
}

function playButton() {
    if (song.paused) {
      song.play();
      play_img.src = "pause.png";
    } else {
      song.pause();
      play_img.src = "play.png";
    }
}

range.addEventListener("change",function(){
    song.currentTime = range.value;
})

song.addEventListener("timeupdate", function() {
    convertTime(Math.round(song.currentTime));

    range.value = song.currentTime;
    range.max = song.duration;
});

song.addEventListener('ended',function(){
    nextSong();
})



function convertTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;

    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    currentTime.textContent = min + ":" + sec;
  

    totalTime(Math.round(song.duration));

}

function totalTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
  
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    currentTime.textContent += "  |  " + min + ":" + sec;
}

function nextSong() {
    currentSong++
    if (currentSong > musics.length-1){
        currentSong = 0
    }

    playSong();
    play_img.src = "pause.png";
    }

function prevSong() {
    currentSong--
    if (currentSong < 0){
        currentSong = musics.length-1;
    }

    playSong();
    play_img.src = "pause.png";
}