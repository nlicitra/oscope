const React = require("react")
const AudioFileSelector = require("./AudioFileSelector")
const Controls = require("./Controls")
const OscopeContext = require("./OscopeContext")
const Oscilloscope = require("./Oscilloscope")
const Spectrum = require("./Spectrum")

module.exports = class Analyser extends OscopeContext {
    constructor(props) {
        super(props)
        this.InputComponent = this.setUpInput(AudioFileSelector)
        this.stream().setBands(64)
    }
    componentDidMount() {
        const bandInput = this.$element.querySelector("#band-input")
        bandInput.addEventListener("input", (event) => {
            this.stream().setBands(event.target.value)
        })
    }
    render() {
        return (
            <div ref={(e) => this.$element = e}>
                <this.InputComponent />
                <Spectrum stream={this.stream()} />
                <label className="control-label" htmlFor="band-input">Bands</label>
                <input id="band-input" name="band-input" defaultValue="64" type="range" min="1" max="1024" />
                <button onClick={this.source().togglePlay.bind(this.source())}>❯||</button>
                <Oscilloscope stream={this.stream()} />
                <Controls source={this.source()} />
            </div>
        )
    }
}
