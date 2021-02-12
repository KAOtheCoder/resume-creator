import React from "react";
import CollapsibleList from "./CollapsibleList";
import UnderlinedInput from "./UnderlinedInput";
import { Experience } from "../Resume";
import ExpandingTextArea from "./ExpandingTextArea";
import createChangeProxy from "../ChangeProxy";

class ExperienceForm extends React.Component {
    static defaultProps = {
        onExperienceChange: (experience) => {} 
    }

    constructor(props) {
        super(props);

        if (this.props.experience === undefined) {
            this.experience = new Experience("Experience", "");
            this.props.onExperienceChange(this.experience);
        }
        else {
            this.experience = this.props.experience;
        }

        this.experienceProxy = createChangeProxy(this.experience, () => this.props.onExperienceChange(this.experience));
    }

    render() {
        return (
            <CollapsibleList
            title={this.experience.header}
            titleEditible
            onTitleChange={(title) => this.experienceProxy.header = title}
            deletable
            onDelete={this.props.onDelete}
            movableUp={this.props.movableUp}
            onMoveUp={this.props.onMoveUp}
            movableDown={this.props.movableDown}
            onMoveDown={this.props.onMoveDown}
            elements={[
                <UnderlinedInput
                key="headerDescription"
                defaultValue={this.experience.headerDescription}
                placeholder="Header Description"
                onChange={(event) => this.experienceProxy.headerDescription = event.target.value}
                />,
                <ExpandingTextArea
                key="description"
                defaultValue={this.experience.description}
                placeholder="Description"
                onChange={(event) => this.experienceProxy.description = event.target.value}
                />
            ]}
            />
        );
    }
}

export default ExperienceForm;