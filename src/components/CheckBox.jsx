import React from "react";
import "./CheckBox.css";

class CheckBox extends React.Component {
    static defaultProps = {
        onToggle: (checked) => {}
    }

    constructor(props) {
        super(props);

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
            () => {this.props.onToggle(this.state.checked)}
        );
    }
}

export default CheckBox;