import React from "react";
import { InformationList } from "../Resume";
import CollapsibleList from "./CollapsibleList";
import InformationListForm from "./InformationListForm";

class InformationSuperlistForm extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.informationSuperlist === undefined) {
            this.informationSuperlist = [];
        }
        else {
            this.informationSuperlist = this.props.informationSuperlist;
        }

        this.state = {informationsSuperlist: this.informationSuperlist.length};
    }

    render() {
        return (
            <CollapsibleList
            title="Informations"
            titleReadOnly={true}
            addLabel="Add Information List"
            onAdd={() => this.addInformationList()}
            elements={this.getElements()}
            />
        );
    }

    getElements() {
        const elements = [];

        for (let i = 0; i < this.informationSuperlist.length; ++i)
            elements.push(
                <InformationListForm
                key={i}
                informationList={this.informationSuperlist[i]}
                onInformationListChange={() => this.handleInformationSuperlistChange()}
                />
            );

        return elements;
    }

    addInformationList() {
        const informationList = new InformationList("Information List");
        this.informationSuperlist.push(informationList);
        this.setState({informationSuperlist: this.informationSuperlist.length});
        this.handleInformationSuperlistChange();
    }

    handleInformationSuperlistChange() {
        this.props.onInformationSuperlistChange(this.informationSuperlist);
    }
}

export default InformationSuperlistForm;