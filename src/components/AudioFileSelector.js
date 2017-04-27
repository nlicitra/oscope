const React = require("react")
const OscopeAudioSource = require("../audio")
const Spectrum = require("./Spectrum")

module.exports = class AudioSelector extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.bindToElement(this.props.audioElem)
    }

    render() {
        return <input type="file" id="file" name="file" />
    }

    bindToElement(audioElem) {
        const source = this.ctx.createMediaElementSource(audioElem)
        source.connect(this.filter)

        // Get file
        function loadFile(evt) {
            const file = evt.target.files[0]
            audioElem.src = URL.createObjectURL(file)
        }
        document.getElementById(this.inputId).addEventListener('change', loadFile, false);
    }
}
