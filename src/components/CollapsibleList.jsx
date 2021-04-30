import React from "react";
import AddButton from "./AddButton";
import "./CollapsibleList.css";
import CollapsibleListTitle from "./CollapsibleListTitle";

class CollapsibleList extends React.Component {
    static defaultProps = {
        expanded: true,
        addable: false,
        onAdd: () => {},
    }

    constructor(props) {
        super(props);

        this.state = { expanded: this.props.expanded};
    }

    toggleCollapse() {
        this.setState((state) => { return {expanded: !state.expanded}; });
    }

    getAddButton() {
        if (this.props.addable)
            return (
                <AddButton
                className="CollapsibleList-AddButton"
                key="add"
                label={this.props.addLabel}
                onClick={this.props.onAdd}
                />
            );
    }

    render() {
        const expandIcon = this.state.expanded ? "expand_more" : "chevron_right";

        return (
            <div className="CollapsibleList">
                <i 
                className="material-icons CollapsibleList-Icon"
                key="toggle"
                onClick={() => this.toggleCollapse()}
                >
                    {expandIcon}
                </i>
                <CollapsibleListTitle
                key="title"
                title={this.props.title}
                titleEditable={this.props.titleEditable}
                onTitleChange={this.props.onTitleChange}
                movableUp={this.props.movableUp}
                onMoveUp={this.props.onMoveUp}
                movableDown={this.props.movableDown}
                onMoveDown={this.props.onMoveUp}
                deletable={this.props.deletable}
                onDelete={this.props.onDelete}
                />
                <div
                className="CollapsibleList-Elements"
                key="elements"
                style={{display: this.state.expanded ? "" : "none"}}
                >
                    {this.props.elements}
                    {this.getAddButton()}
                </div>
            </div>
        );
    }
}

export default CollapsibleList;