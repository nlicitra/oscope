const React = require("react")

module.exports = class Oscilloscope extends React.Component {
    constructor(props) {
        super(props)
        this.color = "#CCFFFF"
        this.lineWidth = 2

        this.setLineWidth = this.setLineWidth.bind(this)
    }

    setLineWidth(width) {
        this.lineWidth = width
    }

    componentDidMount() {
        this.stream = this.props.stream
        const container = this.$element.querySelector("canvas")
        const {height, width} = this.$element.getBoundingClientRect()
        container.width = width
        container.height = height
        const canvas = container.getContext("2d")
        canvas.shadowBlur = 7
        canvas.shadowColor = this.color


        const render = () => {
            const data = this.stream.timeDomainData()
            const scale = width / data.length
            canvas.lineWidth = this.lineWidth
            canvas.fillStyle = "#222"
            canvas.clearRect(0, 0, container.width, container.height)
            canvas.strokeStyle = this.color
            canvas.beginPath()
            for (let i = 0; i < data.length; i++) {
                const x = i * scale
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

        const colorPicker = this.$element.querySelector("input[type='color']")
        colorPicker.value = this.color
        colorPicker.addEventListener("input", (event) => {
            this.color = event.target.value
        })

        const lineWidth = this.$element.querySelector("input[type='range'].line-width")
        lineWidth.addEventListener("input", (event) => {
            this.lineWidth = event.target.value
        })
    }

    render() {
        return (
            <div className={this.props.className} ref={(e) => this.$element = e}>
                <div className="controls">
                    <input type="color" />
                    <input className="line-width" type="range" min="1" max="5" step="0.1" defaultValue="2" />
                </div>
                <canvas></canvas>
            </div>
        )
    }
}
