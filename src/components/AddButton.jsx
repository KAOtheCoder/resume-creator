import React from "react";
import "./AddButton.css";

class AddButton extends React.Component {
    render() {
        return (
            <button
            className="AddButton"
            onClick={this.props.onClick}
            >
                <div><i className="material-icons">add</i></div>
                <div className="Label">{this.props.label}</div>
            </button>
        );
    }
}

export default AddButton;