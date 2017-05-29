const React = require("react")
const AudioFileSelector = require("./AudioFileSelector")
const OscopeContext = require("./OscopeContext")
const Spectrum = require("./Spectrum")

module.exports = class Analyser extends OscopeContext {
    constructor(props) {
        super(props)
        this.InputComponent = this.setUpInput(AudioFileSelector)
        this.stream().setBands(512)
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
                <input id="band-input" defaultValue="512" type="range" min="1" max="1024" />
                <button onClick={this.source().togglePlay.bind(this.source())}>❯||</button>
            </div>
        )
    }
}
