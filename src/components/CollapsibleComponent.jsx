import React from "react";
import "./CollapsibleComponent.css";
import EditibleLabel from "./EditibleLabel";

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
                    <EditibleLabel
                    className="CollapsibleComponent-TitleLabel"
                    text={this.props.title}
                    onChange={(event) => this.handleTitleChange(event.target.value)}
                    readOnly={this.props.titleReadOnly}
                    />
                    {this.props.titleComponents}
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

    handleTitleChange(title) {
        if (this.props.onTitleChange !== undefined)
            this.props.onTitleChange(title);
    }
}

export default CollapsibleComponent;