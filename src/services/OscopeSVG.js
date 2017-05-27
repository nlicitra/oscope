const D3 = require("d3")
const HEIGHT = 300
const WIDTH = 1200
const OFFSET = 105


const setUpSVG = (parentSelector) => {
    const parent = D3.select(parentSelector)
    const svg = parent.append("svg")
    svg.attr("id", "oscope-svg")
        .attr("height", HEIGHT)
        .attr("width", parent.node().getBoundingClientRect().width)
        .style("border-style", "solid")


    // Setup threshold lines
    // svg.append("line").attr("id", "threshold-marker")
    // svg.append("line").attr("id", "threshold")
    return svg
}

const yValue = (Y) => {
    const val = Y - OFFSET
    return val < 0 ? 0 : val
}

module.exports = class OscopeSVG {
    constructor(parent, source) {
        this.svg = setUpSVG(parent)
        this.width = () => D3.select(parent).node().getBoundingClientRect().width
        // this.threshold = 255
        this.source = source
        this.setUpData(this.source.getData())

        // document.getElementById("oscope-svg").addEventListener("mousemove", (event) => {
        //     this.svg.select("#threshold-marker")
        //         .attr("x1", 0)
        //         .attr("y1", yValue(event.clientY))
        //         .attr("x2", this.width())
        //         .attr("y2", yValue(event.clientY))
        //         .attr("stroke-width", 2)
        //         .attr("stroke", "black")
        // })

        // document.getElementById("oscope-svg").addEventListener("click", (event) => {
        //     this.threshold = ((HEIGHT - (event.clientY - OFFSET)) / HEIGHT) * 255
        //     const value = yValue(event.clientY)
        //     this.svg.select("#threshold")
        //         .attr("x1", 0)
        //         .attr("y1", value)
        //         .attr("x2", this.width())
        //         .attr("y2", value)
        //         .attr("stroke-width", 2)
        //         .attr("stroke", "blue")
        // })
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
            .attr("y", (d) => HEIGHT - d)
            .attr("height", (d) => d)
            .attr("fill", (d, i) => D3.interpolateCool(i/size))

        requestAnimationFrame(this.render.bind(this))
    }
}
