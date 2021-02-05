import React from "react";
import "./Slider.css"

class Slider extends React.Component {
    render() {
        const fillWidth = (this.props.value - this.props.min) / (this.props.max - this.props.min) * 100;

        return (
            <div className={"Slider " + this.props.className}>
                <input
                className="Slider-Input"
                type="range"
                min={this.props.min}
                max={this.props.max}
                defaultValue={this.props.defaultValue}
                value={this.props.value}
                onChange={this.props.onChange}
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
}

export default Slider;