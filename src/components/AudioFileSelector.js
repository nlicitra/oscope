const React = require("react")

module.exports = class AudioFileSelector extends React.Component {
    constructor(props) {
        super(props)
        this.fileURL = null
        this.onSelect = props.onSelect
    }

    componentDidMount() {
        this.$element.addEventListener('change', (event) => {
            const file = event.target.files[0]
            this.fileURL = URL.createObjectURL(file)
            this.onSelect(this.fileURL)
        }, false);
    }

    render() {
        return <input type="file" ref={(c) => this.$element = c}/>
    }
}
