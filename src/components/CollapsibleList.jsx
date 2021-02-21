import React from "react";
import AddButton from "./AddButton";
import "./CollapsibleList.css";
import EditableLabel from "./EditableLabel";

class CollapsibleList extends React.Component {
    static defaultProps = {
        expanded: true,
        titleEditable: false,
        onTitleChange: (title) => {},
        addable: false,
        onAdd: () => {},
        movableUp: false,
        onMoveUp: () => {},
        movableDown: false,
        onMoveDown: () => {},
        deletable: false,
        onDelete: () => {}
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

    getTitleButtons() {
        const titleButtons = [];
        const moveButtons = [];

        if (this.props.movableUp)
            moveButtons.push(
                <i
                className="material-icons CollapsibleList-Button CollapsibleList-MoveButton"
                key="moveUp"
                onClick={this.props.onMoveUp}
                >
                    arrow_drop_up
                </i>
            );

        if (this.props.movableDown)
            moveButtons.push(
                <i
                className="material-icons CollapsibleList-Button CollapsibleList-MoveButton"
                key="moveDown"
                onClick={this.props.onMoveDown}
                >
                    arrow_drop_down
                </i>
            );
            
        if (moveButtons.length > 0)
            titleButtons.push(
                <div 
                key="move"
                className="CollapsibleList-Move"
                >
                    {moveButtons}
                </div>
            );

        if (this.props.deletable)
            titleButtons.push(
                <i
                className="material-icons CollapsibleList-Button"
                key="delete"
                onClick={this.props.onDelete}
                >
                    delete
                </i>
            );

        return titleButtons;
    }

    render() {
        const expandIcon = this.state.expanded ? "expand_more" : "chevron_right";

        return (
            <div className="CollapsibleList">
                <i 
                className="material-icons CollapsibleList-Button"
                onClick={() => this.toggleCollapse()}
                >
                    {expandIcon}
                </i>
                <div
                className="CollapsibleList-Title"
                >
                    <EditableLabel
                    className="CollapsibleList-TitleLabel"
                    text={this.props.title}
                    onChange={(event) => this.props.onTitleChange(event.target.value)}
                    readOnly={!this.props.titleEditable}
                    />
                    {this.getTitleButtons()}
                </div>
                <div
                className="CollapsibleList-Elements"
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