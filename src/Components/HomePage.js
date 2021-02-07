import React from 'react'
import SliderModule from './SliderModule'


class HomePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            channel1: 0,
            channel2: 0,
            channel3: 0,
            channel4:0
        }

        this.sliderHandler = this.sliderHandler.bind(this)
    }

    sliderHandler(key, value) {
        this.setState({
            [key]: value
        })
        console.log(this.state)
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
            </div>

        )
    }
}


export default HomePage;
