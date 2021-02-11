import React from 'react'
import SliderModule from './SliderModule'

const ws = new WebSocket('ws://192.168.4.22:80');

class HomePage extends React.Component {


    constructor(props) {

        super(props)
        this.state = {
            channelInputs: {
                channel1: 0,
                channel2: 0,
                channel3: 0,
                channel4: 0
            }
        }


        this.sliderHandler = this.sliderHandler.bind(this)
    }

    sliderHandler(key, value) {
        var inputs = this.state.channelInputs
        inputs[key] = value
        this.setState({
            channelInputs: inputs
        })
        // ws.send(JSON.stringify(this.state.channelInputs))
        // cheeky idea:
        var commandString = this.processJSON()
        console.log(commandString)
        if (ws.readyState == 1) {
            ws.send(commandString)
        } else {
            console.log("websocket not open")
        }


    }

    //dirty af
    processJSON() {
        var commandString = this.state.channelInputs.channel1 + ", " + this.state.channelInputs.channel2 + ", " + this.state.channelInputs.channel3 + ", " + this.state.channelInputs.channel4
        return commandString
    }

    render() {
        return(
            <div>
                <h1> 
                    Control Panel
                </h1>
            <div style = {{
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "row"
            }}>
                <SliderModule displayName = "Channel 1" tag = "channel1" handler = {this.sliderHandler}/>
                <SliderModule displayName = "Channel 2" tag = "channel2" handler = {this.sliderHandler}/>
                <SliderModule displayName = "Channel 3" tag = "channel3" handler = {this.sliderHandler}/>
                <SliderModule displayName = "Channel 4" tag = "channel4" handler = {this.sliderHandler}/>
            </div>
            <div 
                style = {{
                    background: this.state.color,
                    width: 100,
                    height: 100
                }}
                onClick={() => {
                    console.log('clicked')
                    ws.send("message", 123456)
                }
                }>
                Click me to test the socket. If you can see something in the serial monitor then the socket is open.
            </div>
            </div>

        )
    }
}


export default HomePage;
