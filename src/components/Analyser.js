const React = require("react")
const AudioFileSelector = require("./AudioFileSelector")
const OscopeContext = require("./OscopeContext")
const Spectrum = require("./Spectrum")

module.exports = class Analyser extends OscopeContext {
    constructor(props) {
        super(props)
        this.InputComponent = this.setUpInput(AudioFileSelector)
    }
    render() {
        return (
            <div>
                <this.InputComponent />
                <Spectrum source={this.source} />
            </div>
        )
    }
}
