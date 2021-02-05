import React from "react";
import "./CheckBox.css";

class CheckBox extends React.Component {
    constructor(props) {
        super(props);

        this.onToggle = this.props.onToggle === undefined ? () => {} : this.props.onToggle;
        this.state = {checked: this.props.checked ? true : false}
    }

    render() {
        const iconClass = "CheckBox-Icon-" + (this.state.checked ? "Checked" : "Unchecked");

        return (
            <button
            className="CheckBox"
            onClick={(event) => this.handleOnClick(event)}
            >
                <i className={"material-icons CheckBox-Icon " + iconClass}>check</i>
                <span className="CheckBox-Label">{this.props.label}</span>
            </button>
        );
    }

    handleOnClick(event) {
        this.setState(
            (state) => { return {checked: !state.checked}},
            () => { this.onToggle(this.state.checked); }
        );
    }
}

export default CheckBox;