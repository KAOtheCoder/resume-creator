import React from "react";
import "./EditableLabel.css";

class EditableLabel extends React.Component {
    render() {
        return (
            <input
            className={this.props.className + " EditableLabel"}
            type="text"
            defaultValue={this.props.text}
            onChange={this.props.onChange}
            readOnly={this.props.readOnly}
            />
        );
    }
}

export default EditableLabel;