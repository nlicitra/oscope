const D3 = require("d3")

const setUpSVG = (containerSelector) => {
    const container = D3.select(containerSelector)
    const svg = container.append("svg")
    svg.attr("height", 300)
        .attr("width", container.node().getBoundingClientRect().width)
        .style("border-style", "solid")

    return svg
}

module.exports = class SpectrumSVG {
    constructor(container, stream) {
        this.height = 300
        this.svg = setUpSVG(container)
        this.width = D3.select(container).node().getBoundingClientRect().width
        this.stream = stream
    }

    render() {
        const data = this.stream.data()
        const size = data.length
        const space = (1 - (size / 1024))
        const selection = this.svg.selectAll("rect").data(data)
            .attr("y", (d) => this.height - d)
            .attr("height", (d) => d)
            .attr("width", Math.max((this.width / size) - space, 0))
            .attr("fill", (d, i) => D3.interpolateCool(i/size))
            .attr("x", (d, i) => i * (this.width / size))

        selection.exit().remove()
        selection.enter().append("rect")

        requestAnimationFrame(this.render.bind(this))
    }
}
