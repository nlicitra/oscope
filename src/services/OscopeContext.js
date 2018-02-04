const AudioStream = require("./AudioStream")
const OscopeAudioSource = require("./OscopeAudioSource")

module.exports = class OscopeContext {
    constructor(initParams) {
        this.ctx = new AudioContext()
        this.source = new OscopeAudioSource(this.ctx)
        this.stream = new AudioStream(this.ctx, this.source)
        if (initParams) {
            if (initParams.sourceUrl) {
                this.source.setSourceUrl(initParams.sourceUrl)
            }
        }
    }

    setSourceUrl(url) {
        this.source.setSourceUrl(url)
    }
}
