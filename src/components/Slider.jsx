import React from "react";
import "./Slider.css"

class Slider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {value: this.props.value}
        this.onChange = this.props.onChange === undefined ? () => {} : this.props.onChange;
    }

    render() {
        const fillWidth = (this.state.value - this.props.min) / (this.props.max - this.props.min) * 100;
        
        return (
            <div className={"Slider " + this.props.className}>
                <input
                className="Slider-Input"
                type="range"
                min={this.props.min}
                max={this.props.max}
                defaultValue={this.props.defaultValue}
                value={this.state.value}
                onChange={(event) => this.handleOnChange(event)}
                />
                <div className="Slider-Background">
                    <div 
                    className="Slider-Fill" 
                    style={{width: fillWidth + "%"}}
                    >
                        <div className="Slider-Thumb" />
                    </div>
                </div>
            </div>
        );
    }

    handleOnChange(event) {
        this.setState({value: event.target.value});
        this.onChange(event);
    }
}

export default Slider;