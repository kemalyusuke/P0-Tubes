musics = ["music1.mp3","music2.mp3","music3.mp3"]
shuffledMusic = []
let play_btn = document.getElementById("play");
let prev_btn = document.getElementById("pre");
let next_btn = document.getElementById("next");
let range = document.getElementById("range");
let volume = document.getElementById("volume");
let play_img = document.getElementById("play_img")
let currentTime = document.getElementById("time")
let shuffle_btn = document.getElementById("shuffle")
let repeat_btn = document.getElementById("repeat")
let repeat_img = document.getElementById("repeat_img")
let song = new Audio();
let currentSong = 0;
window.onload = playSong;

function playSong(){
    if(isShuffled){
        song.src = shuffledMusic[currentSong];
        console.log(`play shuffle`)
    } else {
        song.src = musics[currentSong];
    }
    song.play();
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
    if (!isRepeated){
        nextSong();
    } else {
        playSong();
    }
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

function shuffleArray(array) {

    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

let isShuffled = false
function shuffle(){
    if(isShuffled){
        isShuffled = false
        shuffle_btn.className = ""
    } else {
        isShuffled = true
        shuffle_btn.className += "clicked"
        shuffledMusic = shuffleArray(musics)
        console.log(shuffledMusic)
    }
}
let isRepeated = false
function repeat(){
    if(isRepeated){
        isRepeated = false
        repeat_img.src = "repeat.png";
    } else {
        isRepeated = true
        repeat_img.src = "repeat1.png";
    }
}

function volumeDown() {
    song.volume -= 0.2;
}
  
function volumeUp() {
    song.volume += 0.2;
}
  
// fix the speaker muted button
  
// let volumeUp = document.querySelector(".volume-up");

volume.addEventListener("change",function(){
    song.volume = volume.value/100
    console.log(volume.value)
})

song.addEventListener("volumechange", function() {
    volume.value = 100 * song.volume
});
  