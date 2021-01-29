import React from "react";
import { Information, InformationList } from "../Resume";
import CollapsibleList from "./CollapsibleList";
import InformationForm from "./InformationForm";
import KeyGenerator from "../KeyGenerator.js";

class InformationListForm extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.informationList === undefined) {
            this.informationList = new InformationList("Information List");
            this.handleInformationListChange();
        }
        else {
            this.informationList = this.props.informationList;
        }

        this.keyGenerator = new KeyGenerator();
        this.state = {informationKeys: this.keyGenerator.generateKeys(this.informationList.informations.length)};
    }

    render() {
        return (
            <CollapsibleList
            title={this.informationList.header}
            titleReadOnly={false}
            onTitleChange={(title) => this.handleHeaderChange(title)}
            deletable={true}
            onDelete={this.props.onDelete}
            addable={true}
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
                onInformationChange={() => this.handleInformationListChange()}
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
                this.informationList.informations.push(new Information("Key " + (this.informationList.informations.length + 1)));
                this.handleInformationListChange();
                return {informationKeys: [...state.informationKeys, this.keyGenerator.generateKey()]};
            }
        );
    }

    deleteInformation(index) {
        this.setState(
            (state) => {
                this.informationList.informations.splice(index, 1);
                this.handleInformationListChange();
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
                let informations = this.informationList.informations;
                [informations[indexFirst], informations[indexSecond]] = [informations[indexSecond], informations[indexFirst]];
                this.handleInformationListChange();
                const keys = [...state.informationKeys];
                [keys[indexFirst], keys[indexSecond]] = [keys[indexSecond], keys[indexFirst]];
                return {informationKeys: keys};
            }
        );
    }

    handleHeaderChange(header) {
        this.informationList.header = header;
        this.handleInformationListChange();
    }

    handleInformationListChange() {
        this.props.onInformationListChange(this.InformationList);
    }
}

export default InformationListForm;