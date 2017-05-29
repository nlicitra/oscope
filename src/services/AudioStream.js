const lodash = require("lodash")

const avg = (data) => lodash.sum(data) / data.length

const parse = (buffer, bands) => {
    // const interval = buffer.length / ((bands - buffer.length) || 1)
    const interval = buffer.length / (bands || 1)
    return lodash.chunk(buffer, interval).map(avg)
}

module.exports = class AudioStream {
    constructor(ctx, source) {
        this.ctx = ctx
        this.bands = 1024
        this.buffer = new Uint8Array(1024)

        this.analyser = this.ctx.createAnalyser()
        this.analyser.fftSize = 2048

        source.connect(this.analyser)
    }

    setBands(val) {
        this.bands = val
    }

    data() {
        this.analyser.getByteFrequencyData(this.buffer)
        return parse(this.buffer, this.bands)
    }
}
