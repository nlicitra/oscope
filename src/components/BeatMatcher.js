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
        document.querySelector("#audioTempo1").addEventListener('input', (event) => {
            const val = Number(event.target.value)
            document.querySelector("#audio1").playbackRate = 1 - (val/1000)
        })
        document.querySelector("#audioTempo2").addEventListener('input', (event) => {
            const val = Number(event.target.value)
            document.querySelector("#audio2").playbackRate = 1 - (val/1000)
        })
    }
    render() {
        return (
            <div className="beatmatcher">
                <div className="track">
                    <div className="track-meta">
                        <audio id="audio1" controls />
                        <input type="file" id="file1" name="file" />
                        <label name="master">
                            <input type="radio" name="master" />
                            Master
                        </label>
                    </div>

                    <div className="track-tempo">
                        <input label="audioTempo1" id="audioTempo1" className="tempo" defaultValue="0" type="range" min="-100" max="100" />
                        <p className="bpm">128</p>
                    </div>
                </div>

                <div className="track">
                    <div className="track-meta">
                        <audio id="audio2" controls />
                        <input type="file" id="file2" name="file" />
                        <label name="master">
                            <input type="radio" name="master" />
                            Master
                        </label>
                    </div>

                    <div className="track-tempo">
                        <input label="audioTempo2" id="audioTempo2" className="tempo" defaultValue="0" type="range" min="-100" max="100" />
                        <p className="bpm">128</p>
                    </div>
                </div>
            </div>
        )
    }
}
