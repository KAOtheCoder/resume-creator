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

    content() {
        if (this.state.expanded)
            return this.props.content;
            /*return (
                <div style={{background:"red", height: 100, width: 500}}></div>
            );*/

        return [];
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
                >
                    {this.content()}
                </div>
            </div>
        );
    }
}

export default CollapsibleComponent;