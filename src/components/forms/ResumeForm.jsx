import React from "react";
import { Resume } from "../../Resume";
import "./ResumeForm.css";
import UnderlinedInput from "../UnderlinedInput";
import ExpandingTextArea from "../ExpandingTextArea";
import InformationSuperlistForm from "./InformationSuperlistForm";
import ExperienceSuperlistForm from "./ExperienceSuperlistForm";
import createChangeProxy from "../../ChangeProxy";
import ImageSelector from "../ImageSelector";

class ResumeForm extends React.Component {
    static defaultProps = {
        onResumeChange: (resume) => {}
    }

    constructor(props) {
        super(props);

        this.resume = this.props.resume ?? new Resume("");
        this.props.onResumeChange(this.resume);
        this.resumeProxy = createChangeProxy(this.resume, () => this.props.onResumeChange(this.resume));
    }

    render() {
        return (
            <div className="ResumeForm">
                <UnderlinedInput 
                placeholder="Name"
                defaultValue={this.resume.name}
                onChange={(event) => {this.resumeProxy.name = event.target.value}}
                />
                <ImageSelector
                checkable
                label="Photo"
                onSourceChanged={(source) => {this.resumeProxy.photo = source}}
                />
                <ExpandingTextArea
                placeholder="Brief"
                defaultValue={this.resume.brief}
                onChange={(event) => this.resumeProxy.brief = event.target.value}
                />
                <InformationSuperlistForm
                informationSuperlist={this.resume.informationSuperlist}
                onInformationSuperlistChange={(informationSuperlist) => this.props.onResumeChange(this.resume)}
                />
                <ExperienceSuperlistForm
                experienceSuperlist={this.resume.experienceSuperlist}
                onExperienceSuperlistChange={(experienceSuperlist) => this.props.onResumeChange(this.resume)}
                />
            </div>
        );
    }
}

export default ResumeForm;