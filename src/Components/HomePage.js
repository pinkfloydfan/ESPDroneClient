import React from 'react'
import SliderModule from './SliderModule'
import VideoDisplay from './VideoDisplay'

//TODO: make this automatically retry if websocket connection lost, add some sort of websocket status indicator
//...or even better, embed this component in a sort of login page where the websocket IP/port can be entered first.
//...also, pretty sure that in the near future, if the websocket is to communicate anything more than image data, improve the comms protocol!
const ws = new WebSocket('ws://192.168.4.22:80');

class HomePage extends React.Component {


    constructor(props) {

        super(props)

        //stackoverflow said this would work
        ws.binaryType = "arraybuffer"

        //RC channel inputs from 0 to 100
        this.state = {
            channelInputs: {
                channel1: 1500,
                channel2: 1500,
                channel3: 1500,
                channel4: 1500
            },

            //placeholder for image - NOPE NOPE NOPE

            imageString: ''
        }


        this.sliderHandler = this.sliderHandler.bind(this)

        ws.onmessage = function (event) {
            //let's make a big assumption that event.data is a blob
            var rawBinary = []
            rawBinary.push(event.data)
            var url = URL.createObjectURL(new Blob(rawBinary, {type: 'image/jpeg'}))
            this.setState({
                imageString: url
            })
        }.bind(this)
    }



    sliderHandler(key, value) {
        var inputs = this.state.channelInputs
        inputs[key] = 1000 + (value/100)*1000
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
    /*
    simple function to read the channel values from the state of this component and turn them into a simple string a dumb C++ microcontroller can read.
    Literally just joins them with commas and adds a null character at the end.
    */
    processJSON() {
        var commandString = this.state.channelInputs.channel1 + ", " + this.state.channelInputs.channel2 + ", " + this.state.channelInputs.channel3 + ", " + this.state.channelInputs.channel4 + "\0"
        return commandString
    }

    render() {
        return(
            <div style = {
                {
                    display: "flex",
                    flexDirection: "column"
                }
            }>
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
                        width: 600,
                        height: 100
                    }}
                    onClick={() => {
                        console.log('clicked')
                        ws.send("message", 123456)
                    }
                    }>
                    Click me to test the socket. If you can see something in the serial monitor then the socket is open.
                </div>
                <div>
                    <VideoDisplay imageString = {this.state.imageString}/>
                </div>
            </div>

        )
    }
}


export default HomePage;
