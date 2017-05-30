const React = require("react")

module.exports = class Controls extends React.Component {
    constructor(props) {
        super(props)
        this.source = this.props.source
    }
    componentDidMount() {
        const freqInput = this.$element.querySelector("#freq-input")
        freqInput.addEventListener("input", (event) => {
            this.source.setFilterFrequency(event.target.value)
        })
    }
    render() {
        return (
            <div ref={(e) => this.$element = e}>
                <label className="control-label" htmlFor="freq-input">Frequency Cutoff</label>
                <input id="freq-input" name="freq-input" defaultValue="16000" type="range" min="0" max="16000" />
            </div>
        )
    }
}
