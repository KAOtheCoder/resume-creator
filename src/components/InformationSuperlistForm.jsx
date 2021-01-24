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
                />
            );

        return elements;
    }

    addInformationList() {
        this.setState(
            (state) => {
                this.informationSuperlist.push(new InformationList("Information List"));
                this.handleInformationSuperlistChange();
                return {informationListKeys: [...state.informationListKeys, this.keyGenerator.generateKey()]};
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

    handleInformationSuperlistChange() {
        this.props.onInformationSuperlistChange(this.informationSuperlist);
    }
}

export default InformationSuperlistForm;