import React from "react";
import { Resume } from "../Resume";
import ResumeCreator from "../ResumeCreator";
import "./ResumeForm.css";
import UnderlinedInput from "./UnderlinedInput";
import ExpandingTextArea from "./ExpandingTextArea";
import InformationSuperlistForm from "./InformationSuperlistForm";
import ExperienceSuperlistForm from "./ExperienceSuperlistForm";

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
                informationSuperlist={this.resume.informationSuperlist}
                onInformationSuperlistChange={(informationSuperlist) => this.handleInformationSuperlistChange(informationSuperlist)}
                />
                <ExperienceSuperlistForm
                experienceSuperlist={this.resume.experienceSuperlist}
                onExperienceSuperlistChange={(experienceSuperlist) => this.handleExperienceSuperlistChange(experienceSuperlist)}
                />
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

    handleInformationSuperlistChange(informationSuperlist) {
        this.resume.informationSuperlist = informationSuperlist;
    }

    handleExperienceSuperlistChange(experienceSuperlist) {
        this.resume.experienceSuperlist = experienceSuperlist;
    }
}

export default ResumeForm;