import React from 'react'
import Slider from '@material-ui/core/Slider';

class SliderModule extends React.Component{
    render() {
        return(
            <div style = {{
                display: "flex",
                height: 200,
                width: 40
            }}>
                {this.props.displayName}
                <Slider
                    orientation = "vertical"
                    defaultValue = {50}
                    onChange = {
                        (event, newValue) => {
                            this.props.handler(this.props.tag, newValue)
                        }
                    }
                />
            </div>
        )
    }
}

export default SliderModule;