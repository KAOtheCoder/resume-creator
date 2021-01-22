import React from "react";
import { InformationList, Resume } from "../Resume";
import ResumeCreator from "../ResumeCreator";
import "./ResumeForm.css";
import UnderlinedInput from "./UnderlinedInput";
import ExpandingTextArea from "./ExpandingTextArea";
import CollapsibleList from "./CollapsibleList";

class ResumeForm extends React.Component {
    constructor(props) {
        super(props);

        this.resume = new Resume("");
        this.nameInput = React.createRef
    }

    render() {
        return (
            <div className="ResumeForm">
                <UnderlinedInput 
                placeholder="Name"
                onChange={(event) => this.onNameChange(event.target)}
                />
                <ExpandingTextArea
                placeholder="Brief"
                onChange={(event) => this.onBriefChange(event.target)}
                />
                <CollapsibleList
                title="Informations"
                addLabel="Add Information List"
                onAdd={() => this.addInformationList()}
                elements={[
                    <ExpandingTextArea
                    placeholder="Test"
                    onChange={()=>{}}
                    />]
                }
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

    onNameChange(input) {
        this.resume.name = input.value;
    }

    onBriefChange(textarea) {
        this.resume.brief = textarea.value;
    }

    addInformationList() {
        this.resume.informationSuperlist.push(new InformationList(""));
    }
}

export default ResumeForm;