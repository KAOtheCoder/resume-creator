import React from "react";
import { InformationList } from "../Resume";
import CollapsibleList from "./CollapsibleList";
import InformationListForm from "./InformationListForm";
import KeyGenerator from "../KeyGenerator.js";

class InformationSuperlistForm extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.informationSuperlist === undefined) {
            this.informationSuperlist = [];
        }
        else {
            this.informationSuperlist = this.props.informationSuperlist;
        }

        this.keyGenerator = new KeyGenerator();
        this.state = {informationListKeys: this.keyGenerator.generateKeys(this.informationSuperlist.length)};
    }

    render() {
        return (
            <CollapsibleList
            title="Informations"
            titleReadOnly={true}
            deletable={false}
            addable={true}
            addLabel="Add Information List"
            onAdd={() => this.addInformationList()}
            movableUp={false}
            movableDown={false}
            elements={this.getElements()}
            />
        );
    }

    getElements() {
        const elements = [];

        for (let i = 0; i < this.state.informationListKeys.length; ++i)
            elements.push(
                <InformationListForm
                key={this.state.informationListKeys[i]}
                informationList={this.informationSuperlist[i]}
                onInformationListChange={() => this.handleInformationSuperlistChange()}
                onDelete={() => this.deleteInformationList(i)}
                movableUp={i > 0}
                onMoveUp={() => this.moveInformationListUp(i)}
                movableDown={i < this.state.informationListKeys.length - 1}
                onMoveDown={() => this.moveInformationListDown(i)}
                />
            );

        return elements;
    }

    addInformationList() {
        this.setState(
            (state) => {
                const key = this.keyGenerator.generateKey();
                this.informationSuperlist.push(new InformationList("Information List " + key));
                this.handleInformationSuperlistChange();
                return {informationListKeys: [...state.informationListKeys, key]};
            }
        );
    }

    deleteInformationList(index) {
        this.setState(
            (state) => {
                this.informationSuperlist.splice(index, 1);
                this.handleInformationSuperlistChange();
                const keys = [...state.informationListKeys];
                keys.splice(index, 1);
                return {informationListKeys: keys};
            }
        );
    }

    moveInformationListUp(index) {
        this.swapInformationLists(index - 1, index);
    }

    moveInformationListDown(index) {
        this.swapInformationLists(index, index + 1);
    }

    swapInformationLists(indexFirst, indexSecond) {
        this.setState(
            (state) => {
                [this.informationSuperlist[indexFirst], this.informationSuperlist[indexSecond]] = [this.informationSuperlist[indexSecond], this.informationSuperlist[indexFirst]];
                this.handleInformationSuperlistChange();
                const keys = [...state.informationListKeys];
                [keys[indexFirst], keys[indexSecond]] = [keys[indexSecond], keys[indexFirst]];
                return {informationListKeys: keys};
            }
        );
    }

    handleInformationSuperlistChange() {
        this.props.onInformationSuperlistChange(this.informationSuperlist);
    }
}

export default InformationSuperlistForm;