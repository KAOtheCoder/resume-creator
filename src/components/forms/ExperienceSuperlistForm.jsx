import React from "react";
import KeyGenerator from "../../KeyGenerator";
import ExperienceListForm from "./ExperienceListForm";
import CollapsibleList from "../CollapsibleList";
import { ExperienceList } from "../../Resume";
import createChangeProxy from "../../ChangeProxy";

class ExperienceSuperlist extends React.Component {
    static defaultProps = {
        onExperienceSuperlistChange: (experienceSuperlist) => {}
    }

    constructor(props) {
        super(props);


        if (this.props.experienceSuperlist === undefined) {
            this.experienceSuperlist = [];
            this.props.onExperienceSuperlistChange(this.experienceSuperlist);
        }
        else {
            this.experienceSuperlist = this.props.experienceSuperlist;
        }

        this.experienceSuperlistProxy = createChangeProxy(this.experienceSuperlist, () => this.props.onExperienceSuperlistChange(this.experienceSuperlist));
        this.keyGenerator = new KeyGenerator();
        this.state = {experienceListKeys: this.keyGenerator.generateKeys(this.experienceSuperlist.length)};
    }

    render() {
        return (
            <CollapsibleList
            title="Experiences"
            addable
            addLabel="Add Experience List"
            onAdd={() => this.addExperienceList()}
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
                onExperienceListChange={() => this.props.onExperienceSuperlistChange(this.experienceSuperlist)}
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
                this.experienceSuperlistProxy.push(new ExperienceList("Experience List " + key));
                return {experienceListKeys: [...state.experienceListKeys, key]};
            }
        );
    }
    
    deleteExperienceList(index) {
        this.setState(
            (state) => {
                this.experienceSuperlistProxy.splice(index, 1);
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
                [this.experienceSuperlistProxy[indexFirst], this.experienceSuperlistProxy[indexSecond]] = [this.experienceSuperlist[indexSecond], this.experienceSuperlist[indexFirst]];
                const keys = [...state.experienceListKeys];
                [keys[indexFirst], keys[indexSecond]] = [keys[indexSecond], keys[indexFirst]];
                return {experienceListKeys: keys};
            }
        );
    }
}

export default ExperienceSuperlist;