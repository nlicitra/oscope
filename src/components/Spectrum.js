const D3 = require("d3")
const React = require("react")

module.exports = class Spectrum extends React.Component {
    componentDidMount() {
        const container = D3.select(this.$element)
        const height = 300
        const width = container.node().getBoundingClientRect().width
        this.svg = container.append("svg")
                            .attr("height", height)
                            .attr("width", width)
                            .style("border-style", "solid")

        this.stream = this.props.stream

        const render = () => {
            const data = this.stream.data()
            const size = data.length
            const space = (1 - (size / 1024))
            const selection = this.svg.selectAll("rect").data(data)
                .attr("y", (d) => height - d)
                .attr("height", (d) => d)
                .attr("width", Math.max((width / size) - space, 0))
                .attr("fill", (d, i) => D3.interpolateCool(i/size))
                .attr("x", (d, i) => i * (width / size))

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
