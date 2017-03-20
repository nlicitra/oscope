module.exports = class OscopeAudioSource {
    constructor(audioElem) {
        const ctx = new AudioContext()
        const source = ctx.createMediaElementSource(audioElem)
        this.analyser  = ctx.createAnalyser()
        this.filter  = ctx.createBiquadFilter()
        this.filter.frequency.value = this.filter.frequency.maxValue
        this.data = [new Uint8Array(1024)]

        source.connect(this.filter)
        this.filter.connect(this.analyser)
        this.analyser.connect(ctx.destination)
        this.analyser.fftSize = 2048;
        this.bands = this.analyser.frequencyBinCount

        // Get file
        function loadFile(evt) {
            const file = evt.target.files[0]
            audioElem.src = URL.createObjectURL(file)
        }
        document.getElementById('file').addEventListener('change', loadFile, false);
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
