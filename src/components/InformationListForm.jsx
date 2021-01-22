import React from "react";
import { Information, InformationList } from "../Resume";
import CollapsibleList from "./CollapsibleList";
import InformationForm from "./InformationForm";

class InformationListForm extends React.Component {
    constructor(props) {
        super(props);

        this.informationList = new InformationList("Information List");
        this.state = {informations: this.informationList.informations.length};
    }

    render() {
        return (
            <CollapsibleList
            title={this.informationList.header}
            titleReadOnly={false}
            onTitleChange={(event) => this.handleHeaderChange(event.target.value)}
            addLabel="Add Information"
            onAdd={() => this.addInformation()}
            elements={this.getElements()}
            />
        );
    }

    getElements() {
        const elements = [];

        for (let i = 0; i < this.informationList.informations.length; ++i)
            elements.push(
                <InformationForm
                key={i}
                information={this.informationList.informations[i]}
                onInformationChange={() => this.handleInformationListChanged()}
                />
            );

        return elements;
    }

    addInformation() {
        const information = new Information("Key");
        this.informationList.informations.push(information);
        this.setState({informations: this.informationList.informations.length});
        this.handleInformationListChanged();
    }

    handleHeaderChange(header) {
        this.informationList.header = header;
        this.handleInformationListChanged();
    }

    handleInformationListChanged() {
        //this.props.onInformationListChanged(this.InformationList);
    }
}

export default InformationListForm;