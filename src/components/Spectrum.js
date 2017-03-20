const React = require("react")
const OscopeSVG = require("../draw")
const OscopeAudioSource = require("../audio")

module.exports = class Spectrum extends React.Component {
    componentDidMount() {
        this.source = new OscopeAudioSource(document.querySelector("#audio"))
        this.svg = new OscopeSVG("div.spectrum", this.source)
        this.svg.render()

        document.querySelector("#bands").addEventListener('input', (event) => this.svg.setBands(Number(event.target.value)))
        document.querySelector("#cutoff").addEventListener('input', (event) => this.source.filter.frequency.value = (Number(event.target.value)))
    }

    render() {
        return <div className="spectrum"></div>
    }
}
