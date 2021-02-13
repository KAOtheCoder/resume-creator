import React from "react";
import "./AddButton.css";

class AddButton extends React.Component {
    render() {
        return (
            <button
            className={this.props.className + " AddButton"}
            onClick={this.props.onClick}
            >
                <i className="material-icons AddButton-Icon">add</i>
                <span className="AddButton-Label">{this.props.label}</span>
            </button>
        );
    }
}

export default AddButton;