import React from "react";
import CollapsibleComponent from "./CollapsibleComponent";
import AddButton from "./AddButton";
import "./CollapsibleList.css";

class CollapsibleList extends React.Component {
    render() {
        return (
            <CollapsibleComponent
            title={this.props.title}
            onTitleChange={this.props.onTitleChange}
            titleReadOnly={this.props.titleReadOnly}
            content={
                <div className="CollapsibleList-Elements">
                    {this.props.elements.concat(
                    <AddButton
                    label={this.props.addLabel}
                    onClick={this.onAdd}
                    />)
                }
                </div>
            }
            />
        );
    }
}

export default CollapsibleList;