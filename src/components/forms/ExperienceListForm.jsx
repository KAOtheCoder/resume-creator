import React from "react";
import { Experience} from "../../Resume";
import CollapsibleList from "../CollapsibleList";
import ExperienceForm from "./ExperienceForm";
import KeyGenerator from "../../KeyGenerator";
import createChangeProxy from "../../ChangeProxy";

class ExperienceListForm extends React.Component {
    static defaultProps = {
        onExperienceListChange: (experienceList) => {}
    }

    constructor(props) {
        super(props);

        this.experienceListProxy = createChangeProxy(this.props.experienceList, () => this.props.onExperienceListChange(this.props.experienceList));
        this.experiencesProxy = createChangeProxy(this.props.experienceList.experiences, () => this.props.onExperienceListChange(this.props.experienceList));
        this.keyGenerator = new KeyGenerator();
        this.state = {experienceKeys: this.keyGenerator.generateKeys(this.props.experienceList.experiences.length)};
    }

    render() {
        return (
            <CollapsibleList
            title={this.props.experienceList.header}
            titleEditable
            onTitleChange={(title) => this.experienceListProxy.header = title}
            deletable
            onDelete={this.props.onDelete}
            addable
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
                experience={this.props.experienceList.experiences[i]}
                onExperienceChange={(experience) => this.props.onExperienceListChange(this.props.experienceList)}
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
                this.experiencesProxy.push(new Experience("Experience " + key, "", "", ""));
                return {experienceKeys: [...state.experienceKeys, key]};
            }
        );
    }

    deleteExperience(index) {
        this.setState(
            (state) => {
                this.experiencesProxy.splice(index, 1);
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
                [this.experiencesProxy[indexFirst], this.experiencesProxy[indexSecond]] = [this.experiencesProxy[indexSecond], this.experiencesProxy[indexFirst]];
                const keys = [...state.experienceKeys];
                [keys[indexFirst], keys[indexSecond]] = [keys[indexSecond], keys[indexFirst]];
                return {experienceKeys: keys};
            }
        );
    }
}

export default ExperienceListForm;