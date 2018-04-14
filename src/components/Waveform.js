const React = require("react")
const Wavesurfer = require("wavesurfer")

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
            fillParent: true,
            barWidth: 2,
            barHeight: 1.5
        })
        if (this.state.source.hasSourceUrl()) {
            wavesurfer.load(this.state.source.audio)
        }
        this.setState({wavesurfer})
        this.setState((prev) => {
            prev.source.onNewSourceUrl = (audio) => wavesurfer.load(audio)
            return {source: prev.source}
        })
    }

    render() {
        return <div className={`waveform ${this.props.className || ""}`} ref={(e) => this.$element = e}></div>
    }
}

// const React = require("react")
// // const Wavesurfer = require("wavesurfer.js")
// const Wavesurfer = require("react-wavesurfer")

// module.exports = class Waveform extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             source: this.props.source
//         }
//         this.config = {
//             audioContext: this.state.source.ctx,
//             backend: "MediaElement",
//             container: this.$element,
//             mediaControls: true,
//             scrollParent: true,
//             waveColor: "#4473ff",
//             progressColor: "#44ff9b",
//             fillParent: true,
//             barWidth: 2,
//             barHeight: 1.4
//         }
//     }

//     render() {
//         return (
//             <div className={`waveform ${this.props.className || ""}`} ref={(e) => this.$element = e}>
//                 <Wavesurfer mediaElt={this.state.source.audio} options={this.config}/>
//             </div>
//         )
//     }
// }
