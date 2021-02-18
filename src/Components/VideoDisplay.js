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

                <img src = {this.props.imageString} 
                     style = {{
                         width: 640, height: 480
                     }}
                
                />

            </div>
        )
    }
}

export default VideoDisplay;