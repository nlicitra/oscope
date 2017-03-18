require("file-loader?name=[name].[ext]!./index.html")
const lodash = require("lodash")
const D3 = require("d3")

const ctx = new AudioContext()

const audio = document.body.querySelector("#audio")
const source = ctx.createMediaElementSource(audio)
const analyser  = ctx.createAnalyser()

source.connect(analyser)
source.connect(ctx.destination)

analyser.fftSize = 2048;
const bufferLength = 200 || analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);
analyser.getByteFrequencyData(dataArray);

// Get file
function loadFile(evt) {
    const file = evt.target.files[0]
    audio.src = URL.createObjectURL(file)
    audio.play()
}
document.getElementById('file').addEventListener('change', loadFile, false);

const createSVG = (parent, height, width) => {
    return D3.select(parent)
             .append("svg")
             .attr("id", "thing")
             .attr("height", height)
             .attr("width", width)
}

const HEIGHT = 300
const WIDTH = 1200
const svg = createSVG("body", HEIGHT, WIDTH)


svg.style("border-style", "solid")

svg.selectAll("rect")
    .data(dataArray)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * (WIDTH / dataArray.length))
    .attr("width", Math.max((WIDTH / dataArray.length) - 1, 0))

svg.append("line").attr("id", "threshold-marker")
svg.append("line").attr("id", "threshold")


const updateThresholdLine = (Y) => {
    console.log(svg.select("#threshold-marker"))
    svg.select("#threshold-marker")
        .attr("x1", 0)
        .attr("y1", Y-71)
        .attr("x2", WIDTH)
        .attr("y2", Y-71)
        .attr("stroke-width", 2)
        .attr("stroke", "black")
}

document.getElementById("thing").addEventListener("mousemove", (event) => {
    console.log(`(${event.clientX},${event.clientY})`)
    const Y = event.clientY
    updateThresholdLine(Y)
})

document.getElementById("thing").addEventListener("click", (event) => {
    THRESHOLD = ((HEIGHT - (event.clientY - 71)) / HEIGHT) * 255
    svg.select("#threshold")
        .attr("x1", 0)
        .attr("y1", event.clientY-71)
        .attr("x2", WIDTH)
        .attr("y2", event.clientY-71)
        .attr("stroke-width", 2)
        .attr("stroke", "blue")
})

let THRESHOLD = 0.95 * 255

const throttledRemove = lodash.debounce(() => {
        console.log("removing")
        D3.select("#bumper").classed("bump", false)
        bumpLocked = false
}, 500)

const throttledAdd = lodash.throttle(() => {
        console.log("adding")
        D3.select("#bumper").classed("bump", true)
        throttledRemove()
}, 500)


function triggerBump(bumper) {
    // throttledAdd()
    if (!bumper.classed("bump")) {
        console.log("DOING IT")
        bumper.classed("bump", true)
        setTimeout(() => {
            bumper.classed("bump", false)
        }, 300)
    }
}

const INDEX = 5
function render () {
    requestAnimationFrame(render)

    // console.log(dataArray)
    analyser.getByteFrequencyData(dataArray);
    svg.selectAll('rect')
        .data(dataArray)
        .attr("y", (d) => HEIGHT - d)
        .attr("height", (d) => d)
        .attr("fill", (d) => `rgb(144,200,${d})`)

    if (dataArray[INDEX] > THRESHOLD) {
        console.log("triggered", dataArray[INDEX])
        triggerBump(D3.selectAll(".bumpable"))
    }
}

// setTimeout(() => D3.select("#bumper").classed("bump", true), 0)
// setTimeout(() => {
//     D3.select("#bumper").classed("bump", false)
// }, 2000)


render()
