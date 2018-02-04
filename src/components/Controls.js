const React = require("react")

module.exports = class Controls extends React.Component {
    constructor(props) {
        super(props)
        this.source = this.props.source
        this.stream = this.props.stream
        this.styles = {
            display: "grid",
            gridTemplateColumns: "repeat(3, 200px)"
        }
    }
    componentDidMount() {
        const freqInput = this.$element.querySelector("#freq-input")
        freqInput.addEventListener("input", (event) => {
            this.source.setFilterFrequency(event.target.value)
        })
    }
    render() {
        return (
            <div style={this.styles} ref={(e) => this.$element = e}>
                <button onClick={this.source.togglePlay.bind(this.source)}>❯||</button>
                <fieldset>
                    <label className="control-label" htmlFor="freq-input">Frequency Cutoff</label>
                    <input id="freq-input" name="freq-input" defaultValue="16000" type="range" min="0" max="16000" />
                </fieldset>
            </div>
        )
    }
}
