const React = require("react")
const { Route, Switch } = require("react-router-dom")
const Analyser = require("./Analyser")
const BeatMatcher = require("./BeatMatcher")

module.exports = class App extends React.Component {
    render() {
        return (
        <Switch>
            <Route path="/beatmatch" component={BeatMatcher} />
            <Route path="*" component={Analyser} />
        </Switch>
        )
    }
}
