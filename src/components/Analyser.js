const React = require("react")
// const AudioFileSelector = require("./AudioFileSelector")
const Controls = require("./Controls")
const OscopeComponentContext = require("./OscopeComponentContext")
const Oscilloscope = require("./Oscilloscope")
// const LevelMeter = require("./LevelMeter")
const Spectrum = require("./Spectrum")
const Waveform = require("./Waveform")

module.exports = class Analyser extends OscopeComponentContext {
    constructor(props) {
        super(props)
        //this.InputComponent = this.setUpInput(AudioFileSelector)
        this.source().setSourceUrl("/dist/audio/music.mp3")
    }
    render() {
        return (
            <div className="analyzer-container" ref={(e) => this.$element = e}>
                {/*<this.InputComponent />*/}
                <Controls source={this.source()} stream={this.stream()}/>
                <Waveform className="full" source={this.source()} />
                <Spectrum className="full" stream={this.stream()} />
                <Oscilloscope className="full" stream={this.stream()} />
                {/*<LevelMeter stream={this.stream()} />*/}
            </div>
        )
    }
}
