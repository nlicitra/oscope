const React = require("react")
const OscopeAudioSource = require("../audio")

module.exports = class BeatMatcher extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            source: new OscopeAudioSource()
        }
    }
    componentDidMount() {
        this.state.source.bindToElement(
            document.querySelector("#audio1")
        )
        this.state.source.bindToElement(
            document.querySelector("#audio2")
        )
    }
    render() {
        return (
            <div className="beatmatcher">
                <div className="track track-left">
                    <input type="file" id="file1" name="file" />
                    <audio id="audio1" />
                </div>
                <div className="track-bpm">
                    BPM
                </div>
                <div className="track track-right">
                    <input type="file" id="file2" name="file" />
                    <audio id="audio2" />
                </div>
            </div>
        )
    }
}
