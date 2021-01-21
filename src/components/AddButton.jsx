import React from "react";
import "./AddButton.css";

class AddButton extends React.Component {
    render() {
        return (
            <button
            className="AddButton"
            onClick={this.props.onClick}
            >
                <div><i className="material-icons AddButton-Icon">add</i></div>
                <div className="AddButton-Label">{this.props.label}</div>
            </button>
        );
    }
}

export default AddButton;