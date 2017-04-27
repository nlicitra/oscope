const React = require("react")

module.exports = class BeatMatcher extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            source:
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
            </div>
        )
    }
}
