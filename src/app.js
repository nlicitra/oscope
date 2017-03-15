require("file-loader?name=[name].[ext]!./index.html")

// const path = "../audio/dragon.mp3"
const audio = document.body.querySelector("#audio")


const ctx = new AudioContext()
const source = ctx.createMediaElementSource(audio)
const dest = ctx.createMediaStreamDestination()
source.connect(dest)
source.connect(ctx.destination)
const recorder = new MediaRecorder(dest.stream, {mimeType: "audio/webm"})

// Get file
function loadFile(evt) {
    const file = evt.target.files[0]
    audio.src = URL.createObjectURL(file)
    audio.play()
}
document.getElementById('file').addEventListener('change', loadFile, false);

