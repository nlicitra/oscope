const React = require("react")
const OscopeAudioSource = require("../services/OscopeAudioSource")

module.exports = class OscopeContext extends React.Component {
    constructor(props) {
        super(props)

        this.ctx = new AudioContext()
        this.source = new OscopeAudioSource(this.ctx)
    }

    setUpInput(Component) {
        const source = this.source
        return class extends React.Component {
            render() {
                return <Component {...this.props} onSelect={(url) => source.setSourceUrl(url)} />
            }
        }
    }

    render() {
        return null
    }
}
