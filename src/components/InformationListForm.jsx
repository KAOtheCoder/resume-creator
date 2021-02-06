import React from "react";
import { Information, InformationList } from "../Resume";
import CollapsibleList from "./CollapsibleList";
import InformationForm from "./InformationForm";
import KeyGenerator from "../KeyGenerator.js";

class InformationListForm extends React.Component {
    static defaultProps = {
        onInformationListChange: (informationList) => {} 
    }

    constructor(props) {
        super(props);

        if (this.props.informationList === undefined) {
            this.informationList = new InformationList("Information List");
            this.props.onInformationListChange(this.informationList);
        }
        else {
            this.informationList = this.props.informationList;
        }

        this.informationListProxy = new Proxy(this.informationList, {
            set: (informationList, prop, value) => {
                if (informationList[prop] !== value) {
                    informationList[prop] = value;
                    this.props.onInformationListChange(informationList);
                }
                
                return true;
            }
        });

        this.keyGenerator = new KeyGenerator();
        this.state = {informationKeys: this.keyGenerator.generateKeys(this.informationList.informations.length)};
    }

    render() {
        return (
            <CollapsibleList
            title={this.informationList.header}
            titleEditible
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
                this.informationList.informations.push(new Information("Key " + key));
                this.props.onInformationListChange(this.informationList);
                return {informationKeys: [...state.informationKeys, key]};
            }
        );
    }

    deleteInformation(index) {
        this.setState(
            (state) => {
                this.informationList.informations.splice(index, 1);
                this.props.onInformationListChange(this.informationList);
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
                const informations = this.informationList.informations;
                [informations[indexFirst], informations[indexSecond]] = [informations[indexSecond], informations[indexFirst]];
                this.props.onInformationListChange(this.informationList);
                const keys = [...state.informationKeys];
                [keys[indexFirst], keys[indexSecond]] = [keys[indexSecond], keys[indexFirst]];
                return {informationKeys: keys};
            }
        );
    }
}

export default InformationListForm;