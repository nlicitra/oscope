const lodash = require("lodash")

const avg = (data) => lodash.sum(data) / data.length //eslint-disable-line
const max = (data) => Math.max(...data)

const parse = (buffer, bands) => {
    const interval = buffer.length / (bands || 1)
    return lodash.chunk(buffer, interval).map(max)
}

module.exports = class AudioStream {
    constructor(ctx, source) {
        this.ctx = ctx
        this.bands = 1024

        this.analyser = this.ctx.createAnalyser()
        this.analyser.fftSize = 2048

        this.buffer = new Uint8Array(this.analyser.frequencyBinCount)
        this.timeDomainBuffer = new Float32Array(this.analyser.frequencyBinCount)

        source.connect(this.analyser)
    }

    setBands(val) {
        this.bands = val
    }

    getBands() {
        return this.bands
    }

    data() {
        this.analyser.getByteFrequencyData(this.buffer)
        return parse(this.buffer, this.bands)
    }

    timeDomainData() {
        this.analyser.getFloatTimeDomainData(this.timeDomainBuffer)
        return this.timeDomainBuffer
    }

    getLevel() {
        this.analyser.getByteFrequencyData(this.buffer)
        return parse(this.buffer, 1)
    }
}
