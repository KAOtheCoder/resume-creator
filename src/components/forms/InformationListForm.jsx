import React from "react";
import { Information, InformationList } from "../../Resume";
import CollapsibleList from "../CollapsibleList";
import InformationForm from "./InformationForm";
import KeyGenerator from "../../KeyGenerator.js";
import createChangeProxy from "../../ChangeProxy";

class InformationListForm extends React.Component {
    static defaultProps = {
        onInformationListChange: (informationList) => {} 
    }

    constructor(props) {
        super(props);

        this.informationList = this.props.informationList ?? new InformationList("Information List");
        this.props.onInformationListChange(this.informationList);

        this.informationListProxy = createChangeProxy(this.informationList, () => this.props.onInformationListChange(this.informationList));
        this.informationsProxy = createChangeProxy(this.informationList.informations, () => this.props.onInformationListChange(this.informationList));
        this.keyGenerator = new KeyGenerator();
        this.state = {informationKeys: this.keyGenerator.generateKeys(this.informationList.informations.length)};
    }

    render() {
        return (
            <CollapsibleList
            title={this.informationList.header}
            titleEditable
            onTitleChange={(title) => this.informationListProxy.header = title}
            deletable
            onDelete={this.props.onDelete}
            addable
            addLabel="Add Information"
            onAdd={() => this.addInformation()}
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

        for (let i = 0; i < this.state.informationKeys.length; ++i)
            elements.push(
                <InformationForm
                key={this.state.informationKeys[i]}
                information={this.informationList.informations[i]}
                onInformationChange={() => this.props.onInformationListChange(this.informationList)}
                onDelete={() => this.deleteInformation(i)}
                movableUp={i > 0}
                onMoveUp={() => this.moveInformationUp(i)}
                movableDown={i < this.state.informationKeys.length - 1}
                onMoveDown={() => this.moveInformationDown(i)}
                />
            );

        return elements;
    }

    addInformation() {
        this.setState(
            (state) => {
                const key = this.keyGenerator.generateKey();
                this.informationsProxy.push(new Information("Key " + key));
                return {informationKeys: [...state.informationKeys, key]};
            }
        );
    }

    deleteInformation(index) {
        this.setState(
            (state) => {
                this.informationsProxy.splice(index, 1);
                const keys = [...state.informationKeys];
                keys.splice(index, 1);
                return {informationKeys: keys};
            }
        );
    }

    moveInformationUp(index) {
        this.swapInformations(index - 1, index);
    }

    moveInformationDown(index) {
        this.swapInformations(index, index + 1);
    }

    swapInformations(indexFirst, indexSecond) {
        this.setState(
            (state) => {
                [this.informationsProxy[indexFirst], this.informationsProxy[indexSecond]] = [this.informationsProxy[indexSecond], this.informationsProxy[indexFirst]];
                const keys = [...state.informationKeys];
                [keys[indexFirst], keys[indexSecond]] = [keys[indexSecond], keys[indexFirst]];
                return {informationKeys: keys};
            }
        );
    }
}

export default InformationListForm;