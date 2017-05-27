module.exports = class OscopeAudioSource {
    constructor(ctx) {
        this.ctx = ctx
        this.data = new Uint8Array(1024)

        this.audio = new Audio()
        this.audio.autoplay = false
        this.mediaSource = this.ctx.createMediaElementSource(this.audio)

        this.analyser = this.ctx.createAnalyser()
        this.analyser.fftSize = 2048;

        this.mediaSource.connect(this.analyser)
        this.analyser.connect(this.ctx.destination)

        this.cuePoint = 0
    }

    setSourceUrl(url) {
        this.audio.src = url
        if (this.onNewSourceUrl) {
            this.onNewSourceUrl(url)
        }
    }

    getData() {
        this.analyser.getByteFrequencyData(this.data)
        return this.data
    }

    play() {
        this.audio.play()
    }

    togglePlay() {
        this.audio.paused ? this.play() : this.pause()
    }

    pause() {
        this.audio.pause()
        this.readyForCue = true
    }

    stop() {
        this.audio.pause()
        this.audio.currentTime = 0
    }

    cue() {
        if (this.audio.paused && this.readyForCue) {
            this.cuePoint = this.audio.currentTime
            this.readyForCue = false
            this.onCue(this.cuePoint)
        } else {
            this.audio.currentTime = this.cuePoint
            this.play()
        }
    }

    resetToCuePoint() {
        this.currentTime = this.cuePoint
        this.audio.pause()
    }
}
