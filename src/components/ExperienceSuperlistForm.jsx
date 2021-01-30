import React from "react";
import KeyGenerator from "../KeyGenerator";
import ExperienceListForm from "./ExperienceListForm";
import CollapsibleList from "./CollapsibleList";
import { ExperienceList } from "../Resume";

class ExperienceSuperlist extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.experienceSuperlist === undefined) {
            this.experienceSuperlist = [];
        }
        else {
            this.experienceSuperlist = this.props.experienceSuperlist;
        }

        this.keyGenerator = new KeyGenerator();
        this.state = {experienceListKeys: this.keyGenerator.generateKeys(this.experienceSuperlist.length)};
    }

    render() {
        return (
            <CollapsibleList
            title="Experiences"
            titleReadOnly={true}
            deletable={false}
            addable={true}
            addLabel="Add Experience List"
            onAdd={() => this.addExperienceList()}
            movableUp={false}
            movableDown={false}
            elements={this.getElements()}
            />
        );
    }

    getElements() {
        const elements = [];

        for (let i = 0; i < this.state.experienceListKeys.length; ++i)
            elements.push(
                <ExperienceListForm
                key={this.state.experienceListKeys[i]}
                experienceList={this.experienceSuperlist[i]}
                onExperienceListChange={() => this.handleExperienceSuperlistChange()}
                onDelete={() => this.deleteExperienceList(i)}
                movableUp={i > 0}
                onMoveUp={() => this.moveExperienceListUp(i)}
                movableDown={i < this.state.experienceListKeys.length - 1}
                onMoveDown={() => this.moveExperienceListDown(i)}
                />
            );

        return elements;
    }

    addExperienceList() {
        this.setState(
            (state) => {
                const key = this.keyGenerator.generateKey();
                this.experienceSuperlist.push(new ExperienceList("Experience List " + key));
                this.handleExperienceSuperlistChange();
                return {experienceListKeys: [...state.experienceListKeys, key]};
            }
        );
    }
    
    deleteExperienceList(index) {
        this.setState(
            (state) => {
                this.experienceSuperlist.splice(index, 1);
                this.handleExperienceSuperlistChange();
                const keys = [...state.experienceListKeys];
                keys.splice(index, 1);
                return {experienceListKeys: keys};
            }
        );
    }

    moveExperienceListUp(index) {
        this.swapExperienceLists(index - 1, index);
    }

    moveExperienceListDown(index) {
        this.swapExperienceLists(index, index + 1);
    }

    swapExperienceLists(indexFirst, indexSecond) {
        this.setState(
            (state) => {
                [this.experienceSuperlist[indexFirst], this.experienceSuperlist[indexSecond]] = [this.experienceSuperlist[indexSecond], this.experienceSuperlist[indexFirst]];
                this.handleExperienceSuperlistChange();
                const keys = [...state.experienceListKeys];
                [keys[indexFirst], keys[indexSecond]] = [keys[indexSecond], keys[indexFirst]];
                return {experienceListKeys: keys};
            }
        );
    }

    handleExperienceSuperlistChange() {
        this.props.onExperienceSuperlistChange(this.experienceSuperlist);
    }
}

export default ExperienceSuperlist;