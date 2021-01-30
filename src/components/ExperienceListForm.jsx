import React from "react";
import { Experience, ExperienceList } from "../Resume";
import CollapsibleList from "./CollapsibleList";
import ExperienceForm from "./ExperienceForm";
import KeyGenerator from "../KeyGenerator.js";

class ExperienceListForm extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.experienceList === undefined) {
            this.experienceList = new ExperienceList("Experience List");
            this.handleExperienceListChange();
        }
        else {
            this.experienceList = this.props.experienceList;
        }

        this.keyGenerator = new KeyGenerator();
        this.state = {experienceKeys: this.keyGenerator.generateKeys(this.experienceList.experiences.length)};
    }

    render() {
        return (
            <CollapsibleList
            title={this.experienceList.header}
            titleReadOnly={false}
            onTitleChange={(title) => this.handleHeaderChange(title)}
            deletable={true}
            onDelete={this.props.onDelete}
            addable={true}
            addLabel="Add Experience"
            onAdd={() => this.addExperience()}
            movableUp={this.props.movableUp}
            onMoveUp={this.props.onMoveUp}
            movableDown={this.props.movableDown}
            onMoveDown={this.props.onMoveDown}
            elements={this.getElements()}
            />
        );
    }

    getElements() {
        const elements = [];

        for (let i = 0; i < this.state.experienceKeys.length; ++i)
            elements.push(
                <ExperienceForm
                key={this.state.experienceKeys[i]}
                experience={this.experienceList.experiences[i]}
                onExperienceChange={() => this.handleExperienceListChange()}
                onDelete={() => this.deleteExperience(i)}
                movableUp={i > 0}
                onMoveUp={() => this.moveExperienceUp(i)}
                movableDown={i < this.state.experienceKeys.length - 1}
                onMoveDown={() => this.moveExperienceDown(i)}
                />
            );

        return elements;
    }

    addExperience() {
        this.setState(
            (state) => {
                const key = this.keyGenerator.generateKey();
                this.experienceList.experiences.push(new Experience("Experience " + key, "", "", ""));
                this.handleExperienceListChange();
                return {experienceKeys: [...state.experienceKeys, key]};
            }
        );
    }

    deleteExperience(index) {
        this.setState(
            (state) => {
                this.experienceList.experiences.splice(index, 1);
                this.handleExperienceListChange();
                const keys = [...state.experienceKeys];
                keys.splice(index, 1);
                return {experienceKeys: keys};
            }
        );
    }

    moveExperienceUp(index) {
        this.swapExperiences(index - 1, index);
    }

    moveExperienceDown(index) {
        this.swapExperiences(index, index + 1);
    }

    swapExperiences(indexFirst, indexSecond) {
        this.setState(
            (state) => {
                let experiences = this.experienceList.experiences;
                [experiences[indexFirst], experiences[indexSecond]] = [experiences[indexSecond], experiences[indexFirst]];
                this.handleExperienceListChange();
                const keys = [...state.experienceKeys];
                [keys[indexFirst], keys[indexSecond]] = [keys[indexSecond], keys[indexFirst]];
                return {experienceKeys: keys};
            }
        );
    }

    handleHeaderChange(header) {
        this.experienceList.header = header;
        this.handleExperienceListChange();
    }

    handleExperienceListChange() {
        this.props.onExperienceListChange(this.ExperienceList);
    }
}

export default ExperienceListForm;