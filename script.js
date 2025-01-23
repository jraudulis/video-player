const playContrContainer = document.getElementById('play-controls');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const pasueBtn = document.getElementById('pause-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const player = document.querySelector('.player');
const video = document.querySelector('video');
const videoSpeed = document.querySelector('.player-speed');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.getElementById('fullscreen-btn');

let isPLaying = false;
let lastVolumeSet = 1;

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
function changeVolume(event) {
    let volume = event.offsetX / volumeRange.offsetWidth;
    if (volume < 0.1) {
        volume = 0;
    }
    if (volume > 0.9 ) {
        volume = 1;
    }
    volumeBar.style.width = `${volume * 100}%`;
    video.volume = volume;

    volumeIcon.className = '';
    if (volume > 0.5) {
        volumeIcon.classList.add('fas', 'fa-volume-up');
    } else if (volume < 0.5 && volume > 0.1) {
        volumeIcon.classList.add('fas', 'fa-volume-down');
    } else if (volume === 0) {
        volumeIcon.classList.add('fas', 'fa-volume-mute');
    }
    lastVolumeSet = volume;
}

function toggleMute() {
    volumeIcon.className = '';
   if (video.volume) {
    lastVolumeSet = video.volume;
    video.volume = 0;
    volumeIcon.classList.add('fas', 'fa-volume-mute')
    volumeBar.style.width = 0;
   } else {
    video.volume = lastVolumeSet;
    volumeBar.style.width = `${lastVolumeSet * 100}%`;
        if (video.volume > 0.1 && video.volume < 0.7) {
            volumeIcon.classList.add('fas', 'fa-volume-down');
        } else if (video.volume > 0.7) {
            volumeIcon.classList.add('fas', 'fa-volume-up');
        } else {
            volumeIcon.classList.add('fas', 'fa-volume-mute');
        }
   }
}

function setPlayingSpeed() {
   video.playbackRate = videoSpeed.value;
}

/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen');
  }
  
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen');
  }

let fullscreen = false;

function toggleFullScreen() {
    if(!fullscreen) {
        openFullscreen(player);
    } else {
        closeFullscreen();
    }
    fullscreen = !fullscreen;
}

playBtn.addEventListener('click', playVideo)
video.addEventListener('click', playVideo);
video.addEventListener('ended', showPlayBtn);
video.addEventListener('timeupdate', updateProgressBarAndTime);
progressRange.addEventListener('click', skipTimeOnProgresBar);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
videoSpeed.addEventListener('change', setPlayingSpeed);
fullscreenBtn.addEventListener('click', toggleFullScreen);

