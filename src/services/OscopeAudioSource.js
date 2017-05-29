module.exports = class OscopeAudioSource {
    constructor(ctx) {
        this.ctx = ctx

        this.audio = new Audio()
        this.audio.autoplay = false

        this.element = this.ctx.createMediaElementSource(this.audio)
        this.filter = this.ctx.createBiquadFilter()
        this.filter.type = "lowpass"
        this.element.connect(this.filter)
        this.filter.connect(this.ctx.destination)

        this.cuePoint = 0
    }

    setSourceUrl(url) {
        this.audio.src = url
        if (this.onNewSourceUrl) {
            this.onNewSourceUrl(this.audio)
        }
    }

    connect(node) {
        this.filter.connect(node)
    }

    play() {
        this.audio.play()
    }

    togglePlay() {
        this.audio.paused ? this.play() : this.pause()
    }

    pause() {
        this.audio.pause()
    }

    paused() {
        this.audio.paused
    }

    seek(time) {
        this.audio.currentTime = time
    }

    currentTime() {
        return this.audio.currentTime
    }

    stop() {
        this.pause()
        this.seek(0)
    }

    setPlaybackRate(rate) {
        this.audio.playbackRate = rate
    }

    resetToCuePoint() {
        this.source.seek(this.cuePoint)
        this.pause()
    }

    cue() {
        if (this.audio.paused && this.readyForCue) {
            this.cuePoint = this.audio.currentTime
            this.readyForCue = false
            this.onCue(this.cuePoint)
        } else {
            this.seek(this.cuePoint)
            this.play()
        }
    }

    setFilterFrequency(freq) {
        this.filter.frequency.value = freq
    }
}
