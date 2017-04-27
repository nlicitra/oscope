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

                    <div className="track-tempo">
                        <input label="audioTempo1" id="audioTempo1" className="tempo" defaultValue="1024" type="range" min="1" max="1024" />
                        <p className="bpm">128</p>
                    </div>
                </div>
                <div className="track track-right">
                    <input type="file" id="file2" name="file" />
                    <audio id="audio2" />

                    <div className="track-tempo">
                        <input label="audioTempo2" id="audioTempo2" className="tempo" defaultValue="1024" type="range" min="1" max="1024" />
                        <p className="bpm">128</p>
                    </div>
                </div>
            </div>
        )
    }
}
