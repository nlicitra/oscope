module.exports = class AudioStream {
    constructor(ctx, source) {
        this.ctx = ctx
        this.data = new Uint8Array(1024)

        this.analyser = this.ctx.createAnalyser()
        this.analyser.fftSize = 2048

        source.connect(this.analyser)

        this.cuePoint = 0
    }

    getData() {
        this.analyser.getByteFrequencyData(this.data)
        return this.data
    }
}
