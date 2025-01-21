const playContrContainer = document.getElementById('play-controls');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const pasueBtn = document.getElementById('pause-btn');
const video = document.querySelector('video');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');

let isPLaying = false;
// Play & Pause ----------------------------------- //
function showPlayBtn() {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play');
}
function playVideo() {
    if (video.paused) {
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'pause');
    } else {
        video.pause();
        showPlayBtn();
    }
}

// Calculate time format
function displayTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
}

// Progress Bar ---------------------------------- //
function updateProgressBarAndTime() {
    progressBar.style.width = `${(video.currentTime / video.duration) * 100 }%`;
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    duration.textContent = `${displayTime(video.duration)}`;
}

function skipTimeOnProgresBar (event) {
    const updatedTime = event.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${updatedTime * 100}%`
    video.currentTime = updatedTime * video.duration;
};

// Volume Controls --------------------------- //



// Change Playback Speed -------------------- //



// Fullscreen ------------------------------- //

playBtn.addEventListener('click', playVideo)
video.addEventListener('click', playVideo);
video.addEventListener('ended', showPlayBtn);
video.addEventListener('timeupdate', updateProgressBarAndTime);
progressRange.addEventListener('click', skipTimeOnProgresBar);