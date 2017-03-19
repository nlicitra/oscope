export default class OscopeAudioSource {
    constructor(audioElem) {
        const ctx = new AudioContext()
        const source = ctx.createMediaElementSource(audioElem)
        this.analyser  = ctx.createAnalyser()
        this.data = [new Uint8Array(1024)]

        source.connect(this.analyser)
        source.connect(ctx.destination)
        this.analyser.fftSize = 2048;
        this.bands = this.analyser.frequencyBinCount
    }

    set bands(value) {
        if (!this.analyser) {
            throw new Error("There is no analyser defined for this audio source")
        }
        this.data = new Uint8Array(value)
        this.analyser.getByteFrequencyData(this.data)
    }

    getData() {
        this.analyser.getByteFrequencyData(this.data)
        return this.data
    }

}


// Get file
function loadFile(evt) {
    const file = evt.target.files[0]
    audio.src = URL.createObjectURL(file)
    audio.play()
}
document.getElementById('file').addEventListener('change', loadFile, false);
