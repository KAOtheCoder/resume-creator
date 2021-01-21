import React from "react";
import "./CollapsibleComponent.css";

class CollapsibleComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = { expanded: true };
    }

    toggle() {
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        const expandIcon = this.state.expanded ? "expand_more" : "chevron_right";

        return (
            <div className="CollapsibleComponent">
                <button
                className="CollapsibleComponent-Button"
                onClick={() => this.toggle()}
                >
                    <i className="material-icons CollapsibleComponent-Icon">{expandIcon}</i>
                </button>
                <div
                className="CollapsibleComponent-Title"
                >
                    {this.props.title}
                </div>
                <div
                className="CollapsibleComponent-Content"
                style={{display: this.state.expanded ? "" : "none"}}
                >
                    {this.props.content}
                </div>
            </div>
        );
    }
}

export default CollapsibleComponent;