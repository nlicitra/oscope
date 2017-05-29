const React = require("react")
const AudioDeck = require("../components/AudioDeck")

module.exports = class BeatMatcher extends React.Component {
    render() {
        return (
            <div className="beatmatcher">
                <AudioDeck />
                <AudioDeck />
            </div>
        )
    }
}
