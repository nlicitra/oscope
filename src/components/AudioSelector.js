const React = require("react")
const OscopeAudioSource = require("../audio")
const Spectrum = require("./Spectrum")

module.exports = class AudioSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            source: new OscopeAudioSource()
        }
    }
    componentDidMount() {
        this.state.source.bindToElement(
            document.querySelector("#audio")
        )
    }
    render() {
        return (
            <div>
                <input type="file" id="file" name="file" />
                <audio id="audio" controls />
                <Spectrum source={this.state.source} />
            </div>
        )
    }
}
