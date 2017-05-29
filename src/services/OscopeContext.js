const AudioStream = require("./AudioStream")
const OscopeAudioSource = require("./OscopeAudioSource")

module.exports = class OscopeContext {
    constructor() {
        this.ctx = new AudioContext()
        this.source = new OscopeAudioSource(this.ctx)
        this.stream = new AudioStream(this.ctx, this.source)
    }

    setSourceUrl(url) {
        this.source.setSourceUrl(url)
    }
}
