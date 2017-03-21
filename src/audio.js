module.exports = class OscopeAudioSource {
    constructor(audioElem) {
        if (audioElem) {
            this.bindToElement(audioElem)
        }
        this.ctx = new AudioContext()
        this.analyser = this.ctx.createAnalyser()
        this.filter = this.ctx.createBiquadFilter()
        this.filter.frequency.value = this.filter.frequency.maxValue
        this.data = [new Uint8Array(1024)]

        this.filter.connect(this.analyser)
        this.analyser.connect(this.ctx.destination)
        this.analyser.fftSize = 2048;
        this.bands = this.analyser.frequencyBinCount

    }

    bindToElement(audioElem) {
        const source = this.ctx.createMediaElementSource(audioElem)
        source.connect(this.filter)

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
        if (this.analyser) {
            this.analyser.getByteFrequencyData(this.data)
        }
        return this.data
    }

}
