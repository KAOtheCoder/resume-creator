import React from "react";
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

        this.resumeProxy = createChangeProxy(this.props.resume, () => this.props.onResumeChange(this.props.resume));
    }

    render() {
        return (
            <div className="ResumeForm">
                <UnderlinedInput 
                placeholder="Name"
                defaultValue={this.props.resume.name}
                onChange={(event) => {this.resumeProxy.name = event.target.value}}
                />
                <ImageSelector
                checkable
                enabled={this.props.resume.photo}
                label="Photo"
                source={this.props.resume.photo}
                onSourceChanged={(source) => {this.resumeProxy.photo = source}}
                />
                <ExpandingTextArea
                placeholder="Brief"
                defaultValue={this.props.resume.brief}
                onChange={(event) => this.resumeProxy.brief = event.target.value}
                />
                <InformationSuperlistForm
                informationSuperlist={this.props.resume.informationSuperlist}
                onInformationSuperlistChange={(informationSuperlist) => this.props.onResumeChange(this.props.resume)}
                />
                <ExperienceSuperlistForm
                experienceSuperlist={this.props.resume.experienceSuperlist}
                onExperienceSuperlistChange={(experienceSuperlist) => this.props.onResumeChange(this.props.resume)}
                />
            </div>
        );
    }
}

export default ResumeForm;