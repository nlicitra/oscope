const D3 = require("d3")

const setUpSVG = (parentSelector) => {
    const parent = D3.select(parentSelector)
    const svg = parent.append("svg")
    svg.attr("height", 300)
        .attr("width", parent.node().getBoundingClientRect().width)
        .style("border-style", "solid")

    return svg
}

module.exports = class OscopeSVG {
    constructor(parent, source) {
        this.height = 300
        this.svg = setUpSVG(parent)
        this.width = () => D3.select(parent).node().getBoundingClientRect().width
        this.source = source
        this.setUpData(this.source.getData())
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
        const size = this.source.getData().length
        this.svg.selectAll('rect')
            .data(this.source.getData())
            .attr("y", (d) => this.height - d)
            .attr("height", (d) => d)
            .attr("fill", (d, i) => D3.interpolateCool(i/size))

        requestAnimationFrame(this.render.bind(this))
    }
}
