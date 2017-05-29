const React = require("react")
const Wavesurfer = require("../../../wavesurfer.js/dist/wavesurfer.min")

module.exports = class Waveform extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            source: this.props.source
        }
    }

    componentDidMount() {
        const wavesurfer = Wavesurfer.create({
            audioContext: this.state.source.ctx,
            backend: "MediaElement",
            container: this.$element,
            mediaControls: true,
            scrollParent: true,
            waveColor: "#4473ff",
            progressColor: "#44ff9b",
            barWidth: 2
        })
        this.setState({wavesurfer})
        this.setState((prev) => {
            prev.source.onNewSourceUrl = (audio) => wavesurfer.load(audio)
            return {source: prev.source}
        })
    }

    render() {
        return <div className="waveform" ref={(e) => this.$element = e}></div>
    }
}
