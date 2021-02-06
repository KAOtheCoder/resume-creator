import React from "react";
import CollapsibleComponent from "./CollapsibleComponent";
import AddButton from "./AddButton";
import "./CollapsibleList.css";
import "./CollapsibleComponent.css";

class CollapsibleList extends React.Component {
    static defaultProps = {
        addable: false,
        onAdd: () => {},
        movableUp: false,
        onMoveUp: () => {},
        movableDown: false,
        onMoveDown: () => {},
        deletable: false,
        onDelete: () => {}
    }

    getAddButton() {
        if (this.props.addable)
            return (
                <AddButton
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
                <button
                key="moveUp"
                className="CollapsibleComponent-Button CollapsibleList-MoveButton"
                onClick={this.props.onMoveUp}
                >
                    <i className="material-icons CollapsibleComponent-Icon">arrow_drop_up</i>
                </button>
            );

        if (this.props.movableDown)
            moveButtons.push(
                <button
                key="moveDown"
                className="CollapsibleComponent-Button CollapsibleList-MoveButton"
                onClick={this.props.onMoveDown}
                >
                    <i className="material-icons CollapsibleComponent-Icon">arrow_drop_down</i>
                </button>
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
                <button
                key="delete"
                className="CollapsibleComponent-Button"
                onClick={this.props.onDelete}
                >
                    <i className="material-icons CollapsibleComponent-Icon">delete</i>
                </button>
            );

        return titleButtons;
    }

    render() {
        return (
            <CollapsibleComponent
            title={this.props.title}
            onTitleChange={this.props.onTitleChange}
            titleEditible={this.props.titleEditible}
            titleComponents={this.getTitleButtons()}
            content={
                <div className="CollapsibleList-Elements">
                    {this.props.elements}
                    {this.getAddButton()}
                </div>
            }
            />
        );
    }
}

export default CollapsibleList;