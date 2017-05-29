const React = require("react")
const AudioFileSelector = require("./AudioFileSelector")
const OscopeContext = require("./OscopeContext")
const Spectrum = require("./Spectrum")
const Waveform = require("./Waveform")

module.exports = class AudioDeck extends OscopeContext {
    constructor(props) {
        super(props)
        this.DeckInput = this.setUpInput(AudioFileSelector)
        this.state = {change: 0}
    }
    componentDidMount() {
        const tempoInput = this.$element.querySelector("#audioTempo")
        tempoInput.addEventListener("input", (event) => {
            const val = Number(event.target.value)
            this.state.change = (val/1000)
            this.source().setPlaybackRate(1 - (val/1000))
            this.forceUpdate()
        })

        tempoInput.addEventListener("dblclick", () => {
            tempoInput.value = 0
            this.state.change = 0
            this.source().setPlaybackRate(1)
            this.forceUpdate()
        })

        this.$element.querySelector("button.cue-button").addEventListener("mousedown", () => {
            this.source().cue()
        })

        this.$element.querySelector("button.cue-button").addEventListener("mouseup", () => {
            this.source().resetToCuePoint()
        })
    }
    render() {
        return (
            <div className="track" ref={(e) => this.$element = e}>
                <div className="track-meta">
                    <this.DeckInput />
                    <label name="master">
                        <input type="radio" name="master" />
                        Master
                    </label>
                </div>

                <div className="track-tempo">
                    <input label="audioTempo" id="audioTempo" className="tempo" defaultValue="0" type="range" min="-100" max="100" />
                    <p className="bpm">{(this.state.change * -100).toFixed(2)}%</p>
                    <Waveform source={this.source()} />
                    <Spectrum stream={this.stream()} />
                    <button onClick={this.source().togglePlay.bind(this.source())}>❯||</button>
                    <button className="cue-button">CUE</button>
                </div>
            </div>
        )
    }
}
