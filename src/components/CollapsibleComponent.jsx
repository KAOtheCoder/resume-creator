import React from "react";
import "./CollapsibleComponent.css";
import EditibleLabel from "./EditibleLabel";

class CollapsibleComponent extends React.Component {
    static defaultProps = {
        expanded: true,
        titleEditible: false,
        onTitleChange: (title) => {}
    }

    constructor(props) {
        super(props);

        this.state = { expanded: this.props.expanded };
    }

    toggle() {
        this.setState((state) => { return {expanded: !state.expanded}; });
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
                    onChange={(event) => this.props.onTitleChange(event.target.value)}
                    readOnly={!this.props.titleEditible}
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
}

export default CollapsibleComponent;