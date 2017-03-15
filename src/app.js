require("file-loader?name=[name].[ext]!./index.html")
const D3 = require("d3")

// const path = "../audio/dragon.mp3"

D3.select("body").append("span").text("D3 Works")

const ctx = new AudioContext()

const audio = document.body.querySelector("#audio")
const source = ctx.createMediaElementSource(audio)
const analyser  = ctx.createAnalyser()

source.connect(analyser)
analyser.connect(ctx.destination)
analyser.fftSize = 2048;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);

// const dest = ctx.createMediaStreamDestination()
// source.connect(dest)
// source.connect(ctx.destination)


// Get file
function loadFile(evt) {
    const file = evt.target.files[0]
    audio.src = URL.createObjectURL(file)
    audio.play()
}
document.getElementById('file').addEventListener('change', loadFile, false);

