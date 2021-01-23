import React from "react";
import { Resume } from "../Resume";
import ResumeCreator from "../ResumeCreator";
import "./ResumeForm.css";
import UnderlinedInput from "./UnderlinedInput";
import ExpandingTextArea from "./ExpandingTextArea";
import InformationSuperlistForm from "./InformationSuperlistForm";

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
                onChange={(event) => this.handleNameChange(event.target.value)}
                />
                <ExpandingTextArea
                placeholder="Brief"
                onChange={(event) => this.handleBriefChange(event.target.value)}
                />
                <InformationSuperlistForm
                onInformationSuperlistChange={(informationSuperlist) => this.handleInformationSuperlistChange(informationSuperlist)}
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
        );
    }

    createResume() {
        const resumeCreator = new ResumeCreator();
        const doc = resumeCreator.createResume(this.resume);
        doc.output("dataurlnewwindow");
    }

    handleNameChange(name) {
        this.resume.name = name;
    }

    handleBriefChange(brief) {
        this.resume.brief = brief;
    }

    handleInformationSuperlistChange(informationsSuperlist) {
        this.resume.informationSuperlist = informationsSuperlist;
    }
}

export default ResumeForm;