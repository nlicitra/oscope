const React = require("react")
// const AudioSelector = require("./AudioSelector")
const BeatMatcher = require("./BeatMatcher")

module.exports = class App extends React.Component {
    render() {
        // return <AudioSelector />
        return <BeatMatcher />
    }
}
