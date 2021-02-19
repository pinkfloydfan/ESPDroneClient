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

            //The current video frame, stored as a URL
            imageString: ''
        }


        this.sliderHandler = this.sliderHandler.bind(this)

        ws.onmessage = function (event) {
            //let's make a big assumption that event.data is a blob - this obviously won't work if `event` is anotherthing other than a blob
            //this blob contains the raw binary of the image the ESP has just taken
            var rawBinary = []
            //Formats the binary in an array that createObjectURL can take in
            rawBinary.push(event.data)
            //Turns the array into a URL that React can then magically turn into an image
            //N.B. Check if this induces a memory leak - are the URLs destroyed after a certain time?
            var url = URL.createObjectURL(new Blob(rawBinary, {type: 'image/jpeg'}))
            this.setState({
                imageString: url
            })
        }.bind(this)
    }


    /* Function passed to the Slider component, which also contains the its key in this page's state
    When this function is fired, it writes the new slider value to global state.*/
    sliderHandler(key, value) {
        var inputs = this.state.channelInputs
        inputs[key] = 1000 + (value/100)*1000
        this.setState({
            channelInputs: inputs
        })
        //processJSON reads the relevant part of this component's state, and returns a simple string that is lighter to decode, i.e. not requiring a JSON parser on the microcontroller    
        var commandString = this.processJSON()
        console.log(commandString)
        if (ws.readyState == 1) {
            //yeets the string over the airwaves
            ws.send(commandString)
        } else {
            console.log("websocket not open")
        }


    }
    /*
    simple function to read the channel values from the state of this component and turn them into a simple string a dumb C++ microcontroller can read.
    Literally just joins them with commas and adds a null character at the end so C++ doesn't complain.
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
