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
        this.width = () => D3.select(container).node().getBoundingClientRect().width
        this.stream = stream
        this.setUpData(this.stream.getData())
    }

    setUpData(data) {
        const space = 1 - (data.length / 1024)
        this.svg.selectAll("rect").remove()
        this.svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * (this.width() / data.length))
            .attr("width", Math.max((this.width() / data.length) - space, 0))
    }

    render() {
        const size = this.stream.getData().length
        this.svg.selectAll("rect")
            .data(this.stream.getData())
            .attr("y", (d) => this.height - d)
            .attr("height", (d) => d)
            .attr("fill", (d, i) => D3.interpolateCool(i/size))

        requestAnimationFrame(this.render.bind(this))
    }
}
