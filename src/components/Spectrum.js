const React = require("react")
const SpectrumSVG = require("../services/Spectrum")

module.exports = class Spectrum extends React.Component {
    componentDidMount() {
        this.svg = new SpectrumSVG(this.$element, this.props.source)
        this.svg.render()
    }

    render() {
        return <div ref={(e) => this.$element = e}></div>
    }
}
