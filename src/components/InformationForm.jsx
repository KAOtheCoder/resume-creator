import React from "react";
import CollapsibleComponent from "./CollapsibleComponent";
import UnderlinedInput from "./UnderlinedInput";
import "./InformationForm.css";
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
            <CollapsibleComponent
            title={this.information.key}
            titleReadOnly={false}
            onTitleChange={(title) => this.handleKeyChange(title)}
            content={
                <div
                className="InformationForm-Content"
                >
                    <UnderlinedInput
                    defaultValue={this.information.value}
                    placeholder="Value"
                    onChange={(event) => this.handleValueChange(event.target.value)}
                    />
                </div>
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