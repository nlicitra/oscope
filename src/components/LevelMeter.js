const D3 = require("d3")
const React = require("react")

module.exports = class LevelMeter extends React.Component {
    componentDidMount() {
        const container = D3.select(this.$element)
        const {height, width} = container.node().getBoundingClientRect()
        this.svg = container.append("svg")
                            .attr("height", height)
                            .attr("width", width)
                            .style("border-style", "solid")

        this.stream = this.props.stream

        const render = () => {
            const data = this.stream.getLevel()
            const selection = this.svg.selectAll("rect").data(data)
                .attr("y", (d) => height - d)
                .attr("height", (d) => d)
                .attr("width", width)
                .attr("fill", () => "#fcb85f")
                .attr("x", (d, i) => i * width)

            selection.exit().remove()
            selection.enter().append("rect")
            requestAnimationFrame(render.bind(this))
        }
        render.bind(this)()

    }

    render() {
        return <div ref={(e) => this.$element = e}></div>
    }
}
