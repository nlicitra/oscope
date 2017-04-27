const React = require("react")
const OscopeAudioSource = require("../audio")

module.exports = class BeatMatcher extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sourceA: new OscopeAudioSource(null, "file1"),
            sourceB: new OscopeAudioSource(null, "file2")
        }
    }
    componentDidMount() {
        this.state.sourceA.bindToElement(
            document.querySelector("#audio1")
        )
        this.state.sourceB.bindToElement(
            document.querySelector("#audio2")
        )
    }
    render() {
        return (
            <div className="beatmatcher">
                <div className="track track-left">
                    <input type="file" id="file1" name="file" />
                    <audio id="audio1" controls />
                </div>
                <div className="track-bpm">
                    BPM
                </div>
                <div className="track track-right">
                    <input type="file" id="file2" name="file" />
                    <audio id="audio2" controls />
                </div>
            </div>
        )
    }
}
