const React = require("react")
const OscopeContext = require("../services/OscopeContext")

module.exports = class OscopeComponentContext extends React.Component {
    constructor(props) {
        super(props)

        this.ctx = new OscopeContext()
    }

    setUpInput(Component) {
        const ctx = this.ctx
        return class extends React.Component {
            render() {
                return <Component {...this.props} onSelect={(url) => ctx.setSourceUrl(url)} />
            }
        }
    }

    stream() {
        return this.ctx.stream
    }

    source() {
        return this.ctx.source
    }

    render() {
        return null
    }
}
