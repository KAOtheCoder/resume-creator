import React from "react";
import CollapsibleList from "./CollapsibleList";
import UnderlinedInput from "./UnderlinedInput";
import { Information } from "../Resume";

class InformationForm extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.information === undefined) {
            this.information = new Information("Key");
            this.handleInformationChange();
        }
        else {
            this.information = this.props.information;
        }
    }

    render() {
        return (
            <CollapsibleList
            title={this.information.key}
            titleReadOnly={false}
            onTitleChange={(title) => this.handleKeyChange(title)}
            deletable={true}
            onDelete={this.props.onDelete}
            addable={false}
            elements={
                <UnderlinedInput
                defaultValue={this.information.value}
                placeholder="Value"
                onChange={(event) => this.handleValueChange(event.target.value)}
                />
            }
            />
        );
    }

    handleKeyChange(key) {
        this.information.key = key;
        this.handleInformationChange();
    }

    handleValueChange(value) {
        this.information.value = value;
        this.handleInformationChange();
    }

    handleInformationChange() {
        this.props.onInformationChange(this.information);
    }
}

export default InformationForm;