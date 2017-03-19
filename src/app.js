require("./style.css")
require("file-loader?name=[name].[ext]!./index.html")

import OscopeAudioSource from "./audio.js"
import OscopeSVG from "./draw.js"

const source = new OscopeAudioSource(document.getElementById("audio"))
const svg = new OscopeSVG("body", source)

document.querySelector("#bands").addEventListener('input', (event) => svg.setBands(Number(event.target.value)))

svg.render()
