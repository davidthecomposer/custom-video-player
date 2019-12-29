/* jshint esversion: 6 */

const video = document.querySelector('video');
const playButton = document.querySelector('.play');
const toggle = document.querySelector('.toggle');
const bottomPanel = document.querySelector('.bottom-panel');
const bigPlayButton = document.querySelector('.big-play');
const speedBox = document.querySelector('.speed');
const skipForward = document.querySelector('.skip-forward');
const skipBack = document.querySelector('.skip-back');
const start = document.querySelector('.start');
const pointFiveX = document.querySelector('.pointFiveX');
const oneX = document.querySelector('.oneX');
const onePointFiveX = document.querySelector('.onePointFiveX');
const twoX = document.querySelector('.twoX');
const speeds = document.querySelectorAll('.speed-size');
const fullScreen = document.querySelector('.full-screen');
const figure = document.querySelector('.figure');
const progressBar = document.querySelector('progress');
const progressButton = document.querySelector('.progress-button');
const currentPosition = document.querySelector('.current-position');
const timeRemaining = document.querySelector('.time-remaining');
const volumeBar = document.querySelector('.volume-bar');
const volumeFill = document.querySelector('.volume-fill');
const volumeSlider = document.querySelector('.volume-slider');
const volumeImage = document.querySelector('.volume-image');
const volume = document.querySelector('.volume');
const hoverAction = document.querySelector('.figure:hover .bottom-panel');
const lights = document.querySelector('.lights');
const body = document.querySelector('body');
const timeData = document.querySelector('.time-data');
const bufferedProgress = document.querySelector('.buffered');

window.onload = function(){

  
    video.addEventListener('progress', function() {
      let duration =  video.duration;
      if (duration > 0) {
        for (let i = 0; i < video.buffered.length; i++) {
              if (video.buffered.start(video.buffered.length - 1 - i) < video.currentTime) {
                bufferedProgress.value = (video.buffered.end(video.buffered.length - 1 - i) / duration) * 100;
                  break;
              }
          }
      }
    });
  
  }


const getDuration = () => {
    let time = Math.floor(video.duration.toFixed(0)) - Math.floor(video.currentTime.toFixed(0));
    timeRemaining.innerHTML = Math.floor(time / 60) + ":" + (time < 10 ? `0${time}` : time % 60 < 10 ? `0${time % 60}` : time % 60 ? time % 60 : '00');
    if (video.duration - video.currentTime === 0) {
        playButton.src = 'images/Video-Play-Icon.svg';
    }

};

const getTime = () => {
    currentPosition.innerHTML = Math.floor(video.currentTime.toFixed(0) / 60) + ":" + (video.currentTime.toFixed(0) < 10 ? `0${video.currentTime.toFixed(0)}` : video.currentTime.toFixed(0) % 60 < 10 ? `0${video.currentTime.toFixed(0) % 60}` : video.currentTime.toFixed(0) % 60 ? video.currentTime.toFixed(0) % 60 : '00');
    getDuration();
    progressBar.value = (video.currentTime / video.duration) * 100;
    progressButton.style.left = `${progressBar.value}%`;
};

const playVideo = (event) => {
    let play = 'images/Video-Play-Icon.svg';
    let pause = 'images/Video-Pause-Icon.svg';
    if (event.target.src.includes(play)) {
        event.target.src = pause;
        video.play();
        bigPlayButton.style.display = 'none';

    } else {
        event.target.src = play;
        video.pause();

    }
};

const togglePanel = (event) => {
    let toggleOn = 'images/toggleOn.svg';
    let toggleOff = 'images/toggleOff.svg';
    if (event.target.src.includes(toggleOn)) {
        bottomPanel.style.height = '12%';
        event.target.src = toggleOff;
        speedBox.style.width = '6%';
        speeds.forEach((speed) => {
            speed.style.width = '35%';
        });


    } else {
        event.target.src = toggleOn;
        bottomPanel.style.height = '8%';
        speedBox.style.width = '10%';
        speeds.forEach((speed) => {
            speed.style.width = '18%';
        });


    }
};



const alternatePlay = () => {
    let play = 'images/Video-Play-Icon.svg';
    let pause = 'images/Video-Pause-Icon.svg';
    if (playButton.src.includes(play)) {
        playButton.src = pause;
        video.play();
        bigPlayButton.style.display = 'none';
    } else {
        playButton.src = play;
        video.pause();

    }
};

const skipForward30 = () => {
    video.currentTime += 30;
};

const skipBack30 = () => {
    video.currentTime -= 30;
};

const toStart = () => {
    if (video.currentTime === video.duration) {
        playButton.src = 'images/Video-Play-Icon.svg';
    }
    video.currentTime = 0;
};

const playbackRate = (event) => {
    speeds.forEach((speed) => {
        speed.style.backgroundColor = '';
    });
    if (event.target === pointFiveX) {
        video.playbackRate = 0.5;
        event.target.style.backgroundColor = 'green';
    } else if (event.target === oneX) {
        video.playbackRate = 1.0;
        event.target.style.backgroundColor = 'green';
    } else if (event.target === onePointFiveX) {
        video.playbackRate = 1.5;
        event.target.style.backgroundColor = 'green';
    } else {
        video.playbackRate = 2.0;
        event.target.style.backgroundColor = 'green';
    }
};



const handleScreenChange = () => {
    let fullScreenIcon = 'images/Video-FullScreen-Icon.svg';
    let normalScreenIcon = 'images/Video-NormalScreen-Icon.svg';
    
    
    

    if (figure.classList.length === 1) {
        figure.classList.add('figure-fullscreen');
        let figComp = window.getComputedStyle(figure);
    let fontHeight = figComp.getPropertyValue('height').split('p')[0];
        timeData.style.fontSize = fontHeight/ 30 + 'px';
        fullScreen.src = normalScreenIcon;

    } else {
        figure.classList.remove('figure-fullscreen');
        figComp = window.getComputedStyle(figure);
        fontHeight = figComp.getPropertyValue('height').split('p')[0];
        fullScreen.src = fullScreenIcon;
        timeData.style.fontSize = fontHeight / 30 + 'px';
    }
};

const changeLocation = (event) => {
    let percent = event.offsetX / event.target.offsetWidth;
    event.target.value = percent * 100;
    video.currentTime = video.duration * percent;
    progressButton.style.left = `${event.target.value}%`;
};


const clickHandle = (event) => {
    let percent = event.offsetX / volumeBar.offsetWidth;
    volumeFill.style.width = `${percent * 100}%`;
    video.volume = percent;
    volumeSlider.value = percent;

};

const sliderVolume = (event) => {
    let percent = event.target.value;
    volumeFill.style.width = `${percent * 100}%`;
    video.volume = percent;
};

const panelUp = (event) => {

    bottomPanel.classList.add('panel-up');
    let figComp = window.getComputedStyle(figure);
    let fontHeight = figComp.getPropertyValue('height').split('p')[0];
    timeData.style.fontSize = fontHeight / 30 + 'px';

}

const panelDown = () => {
    let toggleOff = 'images/toggleOff.svg';
    if (toggle.src.includes(toggleOff)) {
        bottomPanel.classList.remove('panel-up');
    }
}

const lightSwitch = (event) => {
    let lightsOn = 'images/lightsOn.svg';
    let lightsOff = 'images/lights.svg';
    if (event.target.src.includes(lightsOn)) {
        lights.src = lightsOff;
        body.style.backgroundColor = 'black';
    } else {
        lights.src = lightsOn;
        body.style.backgroundColor = 'white';
    }
};

const muteVolume = (event) => {
    let muted = 'images/Video-Mute-Icon.svg';
    let unmuted = 'images/Video-Volume-Icon.svg';

    if (event.target.src.includes(unmuted)) {
        event.target.src = muted;
        video.muted = true;
        volumeBar.style.visibility = 'hidden';
        volumeSlider.style.visibility = 'hidden';
    } else {
        event.target.src = unmuted;
        video.muted = false;
        volumeBar.style.visibility = 'visible';
        volumeSlider.style.visibility = 'visible';
    }
}


video.controls = false;
oneX.style.backgroundColor = 'green';


playButton.addEventListener('click', playVideo);

toggle.addEventListener('click', togglePanel);
bigPlayButton.addEventListener('click', alternatePlay);
video.addEventListener('click', alternatePlay);
video.addEventListener('timeupdate', getTime);
skipForward.addEventListener('click', skipForward30);
skipBack.addEventListener('click', skipBack30);
start.addEventListener('click', toStart);
speeds.forEach((speed) => {
    speed.addEventListener('click', playbackRate);
});
fullScreen.addEventListener('click', handleScreenChange);
progressBar.addEventListener('click', changeLocation);
volumeBar.addEventListener('mousedown', clickHandle, true);
volumeSlider.addEventListener('input', sliderVolume);
figure.addEventListener('mouseenter', panelUp);
figure.addEventListener('mouseleave', panelDown);
lights.addEventListener('click', lightSwitch);
volumeImage.addEventListener('click', muteVolume);





/*


Video window will be scalable by dragging over top or bottom corners. Elements will be 
scaled depending on window size (text will need special treatment)















*/