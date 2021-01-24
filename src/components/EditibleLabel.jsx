import React from "react";
import "./EditibleLabel.css";

class EditibleLabel extends React.Component {
    render() {
        return (
            <input
            className={this.props.className + " EditibleLabel"}
            type="text"
            defaultValue={this.props.text}
            onChange={this.props.onChange}
            readOnly={this.props.readOnly}
            />
        );
    }
}

export default EditibleLabel;