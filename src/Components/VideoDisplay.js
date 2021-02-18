import React from 'react'

class VideoDisplay extends React.Component {
    render() {
        return(
            <div style = {
                {
                    display: "flex",
                    flexDirection: "column"
                }
            }>

            <div>
                aight this is supposed to be an abstraction of the video from the drone, need to decode this!
            </div>
            <div>
                {this.props.imageString}
            </div>

            </div>
        )
    }
}

export default VideoDisplay;