import React from "react";
import { Information, InformationList } from "../Resume";
import CollapsibleList from "./CollapsibleList";
import InformationForm from "./InformationForm";

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

        this.state = {informations: this.informationList.informations.length};
    }

    render() {
        return (
            <CollapsibleList
            title={this.informationList.header}
            titleReadOnly={false}
            onTitleChange={(title) => this.handleHeaderChange(title)}
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
                onInformationChange={() => this.handleInformationListChange()}
                />
            );

        return elements;
    }

    addInformation() {
        const information = new Information("Key");
        this.informationList.informations.push(information);
        this.setState({informations: this.informationList.informations.length});
        this.handleInformationListChange();
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