import React from 'react'
import Slider from '@material-ui/core/Slider';

/*Literally just a bone stock Slider component from the UI library that calls a
handler function in its parent to update its parent's state.
Props:
string displayName: its caption in the UI
string key: Key to access its corresponding index in the parent component's state.
*/
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