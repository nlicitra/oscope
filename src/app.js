const React = require("react")
const ReactDOM = require("react-dom")
const { HashRouter } = require("react-router-dom")
const App = require("./components/App")
const styles = require("./style.css") // eslint-disable-line

ReactDOM.render((
    <HashRouter>
        <App />
    </HashRouter>
), document.querySelector("#app"))
