/* jshint esversion: 6 */
class VideoPlayer {
    constructor(playerNumber) {
        this.player = document.querySelector(`.${playerNumber}`);
        this.video = this.player.querySelector('video');
        this.playButton = this.player.querySelector('.play');
        this.toggle = this.player.querySelector('.toggle');
        this.bottomPanel = this.player.querySelector('.bottom-panel');
        this.bigPlayButton = this.player.querySelector('.big-play');
        this.speedBox = this.player.querySelector('.speed');
        this.skipForward = this.player.querySelector('.skip-forward');
        this.skipBack = this.player.querySelector('.skip-back');
        this.start = this.player.querySelector('.start');
        this.pointFiveX = this.player.querySelector('.pointFiveX');
        this.oneX = this.player.querySelector('.oneX');
        this.onePointFiveX = this.player.querySelector('.onePointFiveX');
        this.twoX = this.player.querySelector('.twoX');
        this.speeds = this.player.querySelectorAll('.speed-size');
        this.fullScreen = this.player.querySelector('.full-screen');
        this.progressBar = this.player.querySelector('progress');
        this.progressButton = this.player.querySelector('.progress-button');
        this.currentPosition = this.player.querySelector('.current-position');
        this.timeRemaining = this.player.querySelector('.time-remaining');
        this.volumeBar = this.player.querySelector('.volume-bar');
        this.volumeFill = this.player.querySelector('.volume-fill');
        this.volumeSlider = this.player.querySelector('.volume-slider');
        this.volumeImage = this.player.querySelector('.volume-image');
        this.volume = this.player.querySelector('.volume');
        this.hoverAction = this.player.querySelector('.player:hover .bottom-panel');
        this.lights = this.player.querySelector('.lights');
        this.body = this.player.querySelector('body');
        this.timeData = this.player.querySelector('.time-data');
        this.bufferedProgress = this.player.querySelector('.buffered');
        this.body = document.querySelector('body');

    }

    initProgress() {
       this.player.onload = function () {
            this.video.onprogress = () => {
                let duration = this.video.duration;
                if (duration > 0) {
                    for (let i = 0; i < this.video.buffered.length; i++) {
                        if (this.video.buffered.start(this.video.buffered.length - 1 - i) < this.video.currentTime) {
                            bufferedProgress.value = (this.video.buffered.end(this.video.buffered.length - 1 - i) / duration) * 100;
                            break;
                        }
                    }
                }
            };
        };
    }

    getDuration() {
        let time = Math.floor(this.video.duration.toFixed(0)) - Math.floor(this.video.currentTime.toFixed(0));
        this.timeRemaining.innerHTML = Math.floor(time / 60) + ":" + (time < 10 ? `0${time}` : time % 60 < 10 ? `0${time % 60}` : time % 60 ? time % 60 : '00');
        if (this.video.duration - this.video.currentTime === 0) {
            this.playButton.src = 'images/Video-Play-Icon.svg';
        }

    }

    getTime() {
        this.currentPosition.innerHTML = Math.floor(this.video.currentTime.toFixed(0) / 60) + ":" + (this.video.currentTime.toFixed(0) < 10 ? `0${this.video.currentTime.toFixed(0)}` : this.video.currentTime.toFixed(0) % 60 < 10 ? `0${this.video.currentTime.toFixed(0) % 60}` : this.video.currentTime.toFixed(0) % 60 ? this.video.currentTime.toFixed(0) % 60 : '00');
        this.getDuration();
        this.progressBar.value = (this.video.currentTime / this.video.duration) * 100;
        this.progressButton.style.left = `${this.progressBar.value}%`;
    }

    playVideo(event) {
        let play = 'images/Video-Play-Icon.svg';
        let pause = 'images/Video-Pause-Icon.svg';
        if (event.target.src.includes(play)) {
            event.target.src = pause;
            this.video.play();
            this.bigPlayButton.style.display = 'none';

        } else {
            event.target.src = play;
            this.video.pause();

        }
    }

    togglePanel(event) {
        let toggleOn = 'images/toggleOn.svg';
        let toggleOff = 'images/toggleOff.svg';
        if (event.target.src.includes(toggleOn)) {
            this.bottomPanel.style.height = '12%';
            event.target.src = toggleOff;
            this.speedBox.style.width = '6%';
            this.speeds.forEach((speed) => {
                speed.style.width = '35%';
            });


        } else {
            event.target.src = toggleOn;
            this.bottomPanel.style.height = '8%';
            this.speedBox.style.width = '10%';
            this.speeds.forEach((speed) => {
                speed.style.width = '18%';
            });


        }
    }



    alternatePlay() {
        let play = 'images/Video-Play-Icon.svg';
        let pause = 'images/Video-Pause-Icon.svg';
        if (this.playButton.src.includes(play)) {
            this.playButton.src = pause;
            this.video.play();
            this.bigPlayButton.style.display = 'none';
        } else {
            this.playButton.src = play;
            this.video.pause();

        }
    }

    skipForward30() {
        this.video.currentTime += 30;
    }

    skipBack30() {
        this.video.currentTime -= 30;
    }

    toStart() {
        if (this.video.currentTime === this.video.duration) {
            this.playButton.src = 'images/Video-Play-Icon.svg';
        }
        this.video.currentTime = 0;
    }

    playbackRate(event) {
        this.speeds.forEach((speed) => {
            speed.style.backgroundColor = '';
        });
        if (event.target === this.pointFiveX) {
            this.video.playbackRate = 0.5;
            event.target.style.backgroundColor = 'green';
        } else if (event.target === this.oneX) {
            this.video.playbackRate = 1.0;
            event.target.style.backgroundColor = 'green';
        } else if (event.target === this.onePointFiveX) {
            this.video.playbackRate = 1.5;
            event.target.style.backgroundColor = 'green';
        } else {
            this.video.playbackRate = 2.0;
            event.target.style.backgroundColor = 'green';
        }
    }



    handleScreenChange() {
        let fullScreenIcon = 'images/Video-FullScreen-Icon.svg';
        let normalScreenIcon = 'images/Video-NormalScreen-Icon.svg';
        let playerFullscreen = 'player-fullscreen';
        let figComp = window.getComputedStyle(this.player);
        let allPlayers = document.querySelectorAll('.player');
        let fontHeight = figComp.getPropertyValue('height').split('p')[0];

        if ([...this.player.classList].includes(playerFullscreen)) {
            allPlayers.forEach((player) => {
                    player.style.display = 'flex';     
            })
            this.player.classList.remove('player-fullscreen');
            figComp = window.getComputedStyle(this.player);
            fontHeight = figComp.getPropertyValue('height').split('p')[0];
            this.fullScreen.src = fullScreenIcon;
            this.timeData.style.fontSize = fontHeight / 30 + 'px';
        } else {
            allPlayers.forEach((player) => {
                if(player !== this.player) {
                    player.style.display = 'none';
                }
            })
            this.player.classList.add('player-fullscreen');
            figComp = window.getComputedStyle(this.player);
            fontHeight = figComp.getPropertyValue('height').split('p')[0];
            this.timeData.style.fontSize = fontHeight / 30 + 'px';
            this.fullScreen.src = normalScreenIcon;
        }  
    }

    changeLocation(event) {
        let percent = event.offsetX / event.target.offsetWidth;
        event.target.value = percent * 100;
        this.video.currentTime = this.video.duration * percent;
        this.progressButton.style.left = `${event.target.value}%`;
    }


    clickHandle(event) {
        let percent = event.offsetX / volumeBar.offsetWidth;
        this.volumeFill.style.width = `${percent * 100}%`;
        this.video.volume = percent;
        this.volumeSlider.value = percent;

    }

    sliderVolume(event) {
        let percent = event.target.value;
        this.volumeFill.style.width = `${percent * 100}%`;
        this.video.volume = percent;
    }

    panelUp(event) {

        this.bottomPanel.classList.add('panel-up');
        let figComp = window.getComputedStyle(this.player);
        let fontHeight = figComp.getPropertyValue('height').split('p')[0];
        this.timeData.style.fontSize = fontHeight / 30 + 'px';

    }

    panelDown() {
        let toggleOff = 'images/toggleOff.svg';
        if (this.toggle.src.includes(toggleOff)) {
            this.bottomPanel.classList.remove('panel-up');
        }
    }

    lightSwitch(event) {
        let lightsOn = 'images/lightsOn.svg';
        let lightsOff = 'images/lights.svg';
       
        if (event.target.src.includes(lightsOn)) {
            this.lights.src = lightsOff;
            this.body.style.backgroundColor = 'black';
        } else {
            this.lights.src = lightsOn;
            this.body.style.backgroundColor = 'white';
        }

        this.updateLightBulb();
         
    }

    updateLightBulb() {
        let allBulbs =document.querySelectorAll('.lights');
        allBulbs.forEach((bulb) => {
           bulb.src = this.lights.src;
        });
    }

    muteVolume(event) {
        let muted = 'images/Video-Mute-Icon.svg';
        let unmuted = 'images/Video-Volume-Icon.svg';

        if (event.target.src.includes(unmuted)) {
            event.target.src = muted;
            this.video.muted = true;
            this.volumeBar.style.visibility = 'hidden';
            this.volumeSlider.style.visibility = 'hidden';
        } else {
            event.target.src = unmuted;
            this.video.muted = false;
            this.volumeBar.style.visibility = 'visible';
            this.volumeSlider.style.visibility = 'visible';
        }
    }


    initHandlers() {
        console.log(this.player)
        this.video.controls = false;
        this.oneX.style.backgroundColor = 'green';
        

        this.playButton.onclick = () => this.playVideo(event);

        this.toggle.onclick = () => this.togglePanel(event);
        this.bigPlayButton.onclick = () => this.alternatePlay();
        this.video.onclick = () => this.alternatePlay();
        this.video.ontimeupdate = () => this.getTime();
        this.skipForward.onclick = () => this.skipForward30();
        this.skipBack.onclick = () => this.skipBack30();
        this.start.onclick = () => this.toStart();
        this.speeds.forEach((speed) => {
            speed.onclick = () => this.playbackRate(event);
        });
        this.fullScreen.onclick = () => this.handleScreenChange(event);
        this.progressBar.onclick = () => this.changeLocation(event);
        this.volumeBar.onmousedown = () => this.clickHandle();
        this.volumeSlider.oninput = () => this.sliderVolume();
        this.player.onmouseenter = () => this.panelUp();
        this.player.onmouseleave = () => this.panelDown();
        this.lights.onclick = () => this.lightSwitch(event);
        this.volumeImage.onclick = () => this.muteVolume();
        
    }

}

let video1 = new VideoPlayer('one');
video1.initHandlers();

let video2 = new VideoPlayer('two');
video2.initHandlers();








/*


Video window will be scalable by dragging over top or bottom corners. Elements will be 
scaled depending on window size (text will need special treatment)















*/