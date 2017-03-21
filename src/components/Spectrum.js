const React = require("react")
const OscopeAudioSource = require("../audio")
const OscopeSVG = require("../draw")

module.exports = class Spectrum extends React.Component {
    componentDidMount() {
        this.svg = new OscopeSVG("div.spectrum", this.props.source)
        this.svg.render()

        // Hook up the controls
        document.querySelector("#bands").addEventListener('input', (event) => this.svg.setBands(Number(event.target.value)))
        document.querySelector("#cutoff").addEventListener('input', (event) => this.props.source.filter.frequency.value = (Number(event.target.value)))
    }

    render() {
        const bands = this.svg ? this.svg.bands : 1024
        const freq = this.props.source.filter.frequency.value
        return (
            <div className="spectrum">
                <fieldset>
                    <label>Bands: {bands}</label>
                    <input label="Bands" id="bands" defaultValue="1024" type="range" min="1" max="1024" />

                    <label>Cutoff: {freq}</label>
                    <input label="Cutoff" id="cutoff" defaultValue="22050" type="range" min="0" max="22050" />
                </fieldset>
            </div>
        )
    }
}
