const React = require("react")
const Spectrum = require("./Spectrum")

module.exports = class App extends React.Component {
    render() {
        return (
            <div>
                <input type="file" id="file" name="file" />
                <audio id="audio" controls />
                <fieldset>
                    <label>Bands</label>
                    <input label="Bands" id="bands" defaultValue="1024" type="range" min="1" max="1024" />

                    <label>Cutoff</label>
                    <input label="Cutoff" id="cutoff" defaultValue="22050" type="range" min="0" max="22050" />
                </fieldset>
                <Spectrum />
            </div>
        )
    }
}
