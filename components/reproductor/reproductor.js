

export const reproductor = class Reproductor {
    constructor() {
        //PLAYER INFO
        this.playerClose = $('.player__icon--close')
        this.playerContaier = $('.player-container');
        this.mainSection = $('.main-section');
        this.reproductorImg = $('.img--player-bg')
        this.playerTitle = $('.player__text--title')
        this.playerSubtitle = $('.player__text--subtitle')


        //AUDIO
        this.playerAudio = $('.player__audio')
        this.playerAudioDuration = $('.audio-end')
        this.playerAudioCurrent = $('.audio-start')
        this.audioDuration = this.playerAudio[0].duration
        //BAR DURATION
        this.barDuration = $('.duration__input')

        //RELOJ
        this.minutes = 0
        this.seconds = 0

        //BUTTONS
        this.playButton = $('.player__icon--play')
        this.hideReproductor()
        this.buttons()
    }
    controlTimeBar() {
        this.barDuration[0].max = this.audioDuration

        this.barDuration[0].addEventListener('change', () => {
            this.playerAudio[0].currentTime = this.barDuration[0].value
        })
    }

    reproducirCancion(song) {
        this.showReproductor()
        this.cambiarInfoReproductor(song)
        this.playAudio()
    }

    showReproductor() {
        this.mainSection[0].style.display = 'none';
        this.playerContaier[0].style.display = 'flex'
    }

    hideReproductor() {
        this.playerClose.on('click', () => {
            this.mainSection[0].style.display = 'block';
            this.playerContaier[0].style.display = 'none'
        })
    }

    cambiarInfoReproductor(song) {
        this.reproductorImg.attr('src', song.src)
        this.playerTitle.text(song.name)
        this.playerSubtitle.text(song.autor)
        this.playerAudio[0].src = `./audios/${song.song}`
        this.getData(this.playerAudio)
        this.changeBarTime()
    }
    getData(data) {
        let intervalId = setInterval(() => {
            if (data[0].duration) {
                this.audioDuration = data[0].duration
                this.secondsToMinutes(this.audioDuration)
                this.playerAudioDuration.text(this.secondsToMinutes(this.audioDuration))
                this.controlTimeBar()
            }
            if (this.audioDuration) {
                clearInterval(intervalId)
            }
        }, 100);

    }

    changeBarTime() {
        setInterval(() => {
            const currentTime = Math.ceil(this.playerAudio[0].currentTime)
            this.barDuration[0].value = currentTime
            this.secondsToMinutes(currentTime)
            this.playerAudioCurrent.text(`${this.minutes}:${this.seconds}`)
        }, 1000);
    }

    secondsToMinutes(time) {
        if (time >= 60) {
            this.minutes = time / 60
            this.minutes = `${this.minutes}`
            this.minutes = this.minutes.substr(0, 1)
            this.minutes = parseInt(this.minutes)

            this.seconds = time - (60 * this.minutes)
            this.seconds = `${this.seconds}`.substr(0, 2)
            this.seconds = parseInt(this.seconds)
        }
        else {
            this.minutes = 0
            this.seconds = time
        }

        if (this.seconds < 10) {
            this.seconds = `0${this.seconds}`
        } else {
            this.seconds = this.seconds
        }

        const minutes = this.minutes, seconds = this.seconds
        return `${minutes}:${seconds}`
    }
    playAudio() {
        this.playerAudio[0].play()
    }

    buttons() {
        this.playButton.on('click', () => {
            if (this.playerAudio[0].paused) {
                this.playerAudio[0].play()
                console.log('playing');
                this.playButton.attr('class', 'fas fa-play player__icon player__icon--play')
            } else {
                this.playerAudio[0].pause()
                this.playButton.attr('class', 'fas fa-pause-circle player__icon player__icon--play')
            }
        })
    }
}