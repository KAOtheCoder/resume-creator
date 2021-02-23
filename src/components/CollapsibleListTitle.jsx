import React from "react";
import "./CollapsibleListTitle.css";
import "./CollapsibleList.css";
import EditableLabel from "./EditableLabel";

class CollapsibleListTitle extends React.Component {
    static defaultProps = {
        titleEditable: false,
        onTitleChange: (title) => {},
        movableUp: false,
        onMoveUp: () => {},
        movableDown: false,
        onMoveDown: () => {},
        deletable: false,
        onDelete: () => {}
    }

    getButtons() {
        const titleButtons = [];
        const moveButtons = [];

        if (this.props.movableUp)
            moveButtons.push(
                <i
                className="material-icons CollapsibleList-Button CollapsibleListTitle-MoveButton"
                key="moveUp"
                onClick={this.props.onMoveUp}
                >
                    arrow_drop_up
                </i>
            );

        if (this.props.movableDown)
            moveButtons.push(
                <i
                className="material-icons CollapsibleList-Button CollapsibleListTitle-MoveButton"
                key="moveDown"
                onClick={this.props.onMoveDown}
                >
                    arrow_drop_down
                </i>
            );
            
        if (moveButtons.length > 0)
            titleButtons.push(
                <div 
                className="CollapsibleListTitle-Move"
                key="move"
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
        return (
            <div
            className="CollapsibleListTitle"
            >
                <EditableLabel
                className="CollapsibleListTitle-Label"
                key="label"
                text={this.props.title}
                onChange={(event) => this.props.onTitleChange(event.target.value)}
                readOnly={!this.props.titleEditable}
                />
                {this.getButtons()}
            </div>
        );
    }
}

export default CollapsibleListTitle;