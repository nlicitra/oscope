const React = require("react")
const AudioDeck = require("../components/AudioDeck")
const OscopeAudioSource = require("../services/OscopeAudioSource")

module.exports = class BeatMatcher extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="beatmatcher">
                <AudioDeck />
            </div>
        )
    }
}
