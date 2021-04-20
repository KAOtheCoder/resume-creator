import React from "react";
import "./UnderlinedInput.css";

class UnderlinedInput extends React.Component {
    render() {
        return (
            <input
            className={this.props.className + " UnderlinedInput"}
            type="text"
            defaultValue={this.props.defaultValue}
            placeholder={this.props.placeholder}
            onChange={this.props.onChange}
            />
        );
    }
}

export default UnderlinedInput;