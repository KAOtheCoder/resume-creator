import React from "react";
import CollapsibleComponent from "./CollapsibleComponent";
import AddButton from "./AddButton";
import "./CollapsibleList.css";
import "./CollapsibleComponent.css";

class CollapsibleList extends React.Component {
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
            titleReadOnly={this.props.titleReadOnly}
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