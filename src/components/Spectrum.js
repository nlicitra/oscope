const D3 = require("d3")
const React = require("react")

module.exports = class Spectrum extends React.Component {
    constructor(props) {
        super(props)
        this.stream = this.props.stream
        this.stream.setBands(64)
    }

    componentDidMount() {
        const container = D3.select(this.$element)
        const {height, width} = container.node().getBoundingClientRect()
        const scale = height/255
        this.svg = container.insert("svg")
                            .attr("height", height)
                            .attr("width", width)

        const render = () => {
            const data = this.stream.data()
            const size = data.length
            const space = (1 - (size / 1024))
            const selection = this.svg.selectAll("rect").data(data)
                .attr("y", (d) => (255 - d) * scale)
                .attr("height", (d) => d*scale)
                .attr("width", Math.max((width / size) - space, 0))
                .attr("fill", (d, i) => D3.interpolateCool(i/size))
                .attr("x", (d, i) => i * (width / size))

            selection.exit().remove()
            selection.enter().append("rect")
            requestAnimationFrame(render.bind(this))
        }
        render.bind(this)()

        const bandInput = this.$element.querySelector(".band-input")
        bandInput.addEventListener("input", (event) => {
            this.stream.setBands(event.target.value)
            this.forceUpdate()
        })
    }

    render() {
        return (
            <div className={this.props.className} ref={(e) => this.$element = e}>
                <div className="controls">
                    <fieldset>
                        <label className="control-label" htmlFor="band-input">Bands</label>
                        <span style={{color: "white", margin: "10px"}}>{this.stream.getBands()}</span>
                        <input className="band-input" name="band-input" defaultValue="64" type="range" min="1" max="1024" />
                    </fieldset>
                </div>
            </div>
        )
    }
}
