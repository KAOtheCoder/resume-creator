import React from "react";
import "./SpinBox.css"

class SpinBox extends React.Component {
    render() {
        return (
            <input
            className="SpinBox"
            type="number"
            min={this.props.min}
            max={this.props.max}
            value={this.props.value}
            onChange={(event) => this.handleOnChange(event)}
            />
        );
    }

    handleOnChange(event) {
        event.target.value = Math.max(this.props.min, Math.min(this.props.max, event.target.value));

        if (this.props.onChange !== undefined)
            this.props.onChange(event);
    }
}

export default SpinBox;