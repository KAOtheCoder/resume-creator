import React from "react";
import CollapsibleList from "./CollapsibleList";
import UnderlinedInput from "./UnderlinedInput";
import { Experience } from "../Resume";
import ExpandingTextArea from "./ExpandingTextArea";

class ExperienceForm extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.experience === undefined) {
            this.experience = new Experience("Experience", "");
            this.handleExperienceChange();
        }
        else {
            this.experience = this.props.experience;
        }
    }

    render() {
        return (
            <CollapsibleList
            title={this.experience.header}
            titleReadOnly={false}
            onTitleChange={(title) => this.handleHeaderChange(title)}
            deletable={true}
            onDelete={this.props.onDelete}
            addable={false}
            movableUp={this.props.movableUp}
            onMoveUp={this.props.onMoveUp}
            movableDown={this.props.movableDown}
            onMoveDown={this.props.onMoveDown}
            elements={[
                <UnderlinedInput
                key="headerDescription"
                defaultValue={this.experience.headerDescription}
                placeholder="Header Description"
                onChange={(event) => this.handleHeaderDescriptionChange(event.target.value)}
                />,
                <ExpandingTextArea
                key="description"
                defaultValue={this.experience.description}
                placeholder="Description"
                onChange={(event) => this.handleDescriptionChange(event.target.value)}
                />
            ]}
            />
        );
    }

    handleHeaderChange(header) {
        this.experience.header = header;
        this.handleExperienceChange();
    }

    handleHeaderDescriptionChange(headerDescription) {
        this.experience.headerDescription = headerDescription;
        this.handleExperienceChange();
    }

    handleDescriptionChange(description) {
        this.experience.description = description;
        this.handleExperienceChange();
    }

    handleExperienceChange() {
        this.props.onExperienceChange(this.experience);
    }
}

export default ExperienceForm;