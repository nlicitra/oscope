const React = require("react")

module.exports = class Oscilloscope extends React.Component {
    componentDidMount() {
        this.stream = this.props.stream
        const container = this.$element
        container.width = this.stream.timeDomainData().length
        container.height = 400
        const canvas = container.getContext("2d")
        canvas.shadowBlur = 7
        canvas.shadowColor = "#CFF"


        const render = () => {
            const data = this.stream.timeDomainData()
            canvas.fillStyle = "#222"
            canvas.clearRect(0, 0, container.width, container.height)
            canvas.strokeStyle = "#CFF"
            canvas.beginPath()
            for (let i = 0; i < data.length; i++) {
                const x = i
                const y = (0.5 + data[i] / 2) * container.height
                if (i === 0) {
                    canvas.moveTo(x, y)
                } else {
                    canvas.lineTo(x, y)
                }
            }
            canvas.stroke()
            requestAnimationFrame(render.bind(this))
        }
        render.bind(this)()

    }

    render() {
        return <canvas ref={(e) => this.$element = e}></canvas>
    }
}
