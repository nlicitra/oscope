const React = require("react")
const { HashRouter, Route, Switch } = require("react-router-dom")
const Analyser = require("./Analyser")
const BeatMatcher = require("./BeatMatcher")

module.exports = class App extends React.Component {
    render() {
        return (
        <Switch>
            <Route path="/analyser" component={Analyser} />
            <Route path="/beatmatch" component={BeatMatcher} />
        </Switch>
        )
    }
}
