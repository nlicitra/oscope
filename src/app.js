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
             .attr("height", height)
             .attr("width", width)
}

const HEIGHT = 300
const WIDTH = 1200
const svg = createSVG("body", HEIGHT, WIDTH)

svg.selectAll("rect")
    .data(dataArray)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * (WIDTH / dataArray.length))
    .attr("width", Math.max((WIDTH / dataArray.length) - 1, 0))

const throttledRemove = lodash.debounce(() => {
        console.log("removing")
        D3.select("#bumper").classed("bump", false)
}, 500)

const throttledAdd = lodash.throttle(() => {
        console.log("adding")
        D3.select("#bumper").classed("bump", true)
        throttledRemove()
}, 500)

function triggerBump() {
    throttledAdd()
}

const THRESHOLD = 0.8 * 255
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
        triggerBump()
    }
}

// setTimeout(() => D3.select("#bumper").classed("bump", true), 0)
// setTimeout(() => {
//     D3.select("#bumper").classed("bump", false)
// }, 2000)


render()
