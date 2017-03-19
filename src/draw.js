const D3 = require("d3")
const HEIGHT = 300
const WIDTH = 1200
const OFFSET = 105


const setUpSVG = (parent) => {
    const svg = D3.select(parent).append("svg")
    svg.attr("id", "oscope-svg")
        .attr("height", HEIGHT)
        .attr("width", WIDTH)
        .style("border-style", "solid")


    // Setup threshold lines
    svg.append("line").attr("id", "threshold-marker")
    svg.append("line").attr("id", "threshold")
    return svg
}

const yValue = (Y) => {
    const val = Y - OFFSET
    return val < 0 ? 0 : val
}

export default class OscopeSVG {
    constructor(parent, source) {
        this.svg = setUpSVG(parent)
        this.threshold = 255
        this.source = source
        this.setUpData(source.getData())

        document.getElementById("oscope-svg").addEventListener("mousemove", (event) => {
            this.svg.select("#threshold-marker")
                .attr("x1", 0)
                .attr("y1", yValue(event.clientY))
                .attr("x2", WIDTH)
                .attr("y2", yValue(event.clientY))
                .attr("stroke-width", 2)
                .attr("stroke", "black")
        })

        document.getElementById("oscope-svg").addEventListener("click", (event) => {
            this.threshold = ((HEIGHT - (event.clientY - OFFSET)) / HEIGHT) * 255
            const value = yValue(event.clientY)
            this.svg.select("#threshold")
                .attr("x1", 0)
                .attr("y1", value)
                .attr("x2", WIDTH)
                .attr("y2", value)
                .attr("stroke-width", 2)
                .attr("stroke", "blue")
        })
    } 

    setUpData(data) {
        const space = 1 - (data.length / 1024)
        this.svg.selectAll("rect").remove()
        this.svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * (WIDTH / data.length))
            .attr("width", Math.max((WIDTH / data.length) - space, 0))
    }

    setBands(num) {
        this.source.bands = num
        this.setUpData(this.source.getData())
    }

    render() {
        const size = this.source.data.length
        this.svg.selectAll('rect')
            .data(this.source.getData())
            .attr("y", (d) => HEIGHT - d)
            .attr("height", (d) => d)
            .attr("fill", (d, i) => D3.interpolateCool(i/size))

        requestAnimationFrame(this.render.bind(this))

        // if (dataArray[INDEX] > THRESHOLD) {
        //     console.log("triggered", dataArray[INDEX])
        //     triggerBump(D3.selectAll(".bumpable"))
        // }
    }
}


// function triggerBump(bumper) {
//     if (!bumper.classed("bump")) {
//         console.log("DOING IT")
//         bumper.classed("bump", true)
//         setTimeout(() => {
//             bumper.classed("bump", false)
//         }, 300)
//     }
// }
