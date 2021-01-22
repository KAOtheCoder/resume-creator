import React from "react";
import { InformationList, Resume } from "../Resume";
import ResumeCreator from "../ResumeCreator";
import "./ResumeForm.css";
import UnderlinedInput from "./UnderlinedInput";
import ExpandingTextArea from "./ExpandingTextArea";
import CollapsibleList from "./CollapsibleList";
import InformationListComponent from "./InformationListComponent";

class ResumeForm extends React.Component {
    constructor(props) {
        super(props);

        this.resume = new Resume("");
    }

    render() {
        return (
            <div className="ResumeForm">
                <UnderlinedInput 
                placeholder="Name"
                onChange={(event) => this.onNameChange(event.target.value)}
                />
                <ExpandingTextArea
                placeholder="Brief"
                onChange={(event) => this.onBriefChange(event.target.value)}
                />
                <CollapsibleList
                title="Informations"
                titleReadOnly={true}
                addLabel="Add Information List"
                onAdd={() => this.addInformationList()}
                elements={[
                    <InformationListComponent key={0}/>
                    ]}
                />
                <div>
                    <div>Experiences</div>
                </div>
                <button
                onClick={() => this.createResume() }
                >
                    Create Resume
                </button>
            </div>
        )
    }

    createResume() {
        const resumeCreator = new ResumeCreator();
        const doc = resumeCreator.createResume(this.resume);
        doc.output("dataurlnewwindow");
    }

    onNameChange(name) {
        this.resume.name = name;
    }

    onBriefChange(brief) {
        this.resume.brief = brief;
    }

    addInformationList() {
        this.resume.informationSuperlist.push(new InformationList(""));
    }
}

export default ResumeForm;