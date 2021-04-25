import React from "react";
import CollapsibleList from "./CollapsibleList";
import UnderlinedInput from "./UnderlinedInput";
import { Experience } from "../Resume";
import ExpandingTextArea from "./ExpandingTextArea";
import createChangeProxy from "../ChangeProxy";
import "./ExperienceForm.css";
import DateSelector from "./DateSelector";
import CheckBox from "./CheckBox";
import TagsForm from "./TagsForm";
import ImageSelector from "./ImageSelector";

class ExperienceForm extends React.Component {
    static defaultProps = {
        onExperienceChange: (experience) => {} 
    }

    constructor(props) {
        super(props);

        if (this.props.experience === undefined) {
            this.experience = new Experience("Experience", "");
            this.props.onExperienceChange(this.experience);
        }
        else {
            this.experience = this.props.experience;
        }

        this.experienceProxy = createChangeProxy(this.experience, () => this.props.onExperienceChange(this.experience));
        this.state = {
            endDateEnabled: false,
            endDate: this.experience.endDate
        };
    }

    render() {
        return (
            <CollapsibleList
            title={this.experience.header}
            titleEditable
            onTitleChange={(title) => this.experienceProxy.header = title}
            deletable
            onDelete={this.props.onDelete}
            movableUp={this.props.movableUp}
            onMoveUp={this.props.onMoveUp}
            movableDown={this.props.movableDown}
            onMoveDown={this.props.onMoveDown}
            elements={[
                <UnderlinedInput
                key="headerDescription"
                defaultValue={this.experience.headerDescription}
                placeholder="Header Description"
                onChange={(event) => this.experienceProxy.headerDescription = event.target.value}
                />,
                <ImageSelector
                key="headerIcon"
                checkable
                label="Header Icon"
                onSourceChanged={(source) => {this.experienceProxy.headerIcon = source;}}
                />,
                <div 
                className="ExperienceForm-HeaderLink"
                key="headerLink"
                >
                    <i className="material-icons">link</i>
                    <UnderlinedInput
                    className="ExperienceForm-HeaderLinkInput"
                    defaultValue={this.experience.headerLink}
                    placeholder="Header Link"
                    onChange={(event) => this.experienceProxy.headerLink = event.target.value}
                    />
                </div>,
                <TagsForm 
                    key="tags"
                    tags={this.experience.tags}
                    onTagsChange={(tags) => this.props.onExperienceChange(this.experience)}
                />,
                <div
                className="ExperienceForm-Date"
                key="date"
                >
                    <DateSelector
                    key="startDate"
                    label="Start Date"
                    year
                    month
                    day={false}
                    onDateChange={(date) => this.experienceProxy.startDate = date}
                    />
                    <div
                    className="ExperienceForm-EndDate"
                    key="endDate"
                    >
                        <CheckBox
                        key="endDateCheckBox"
                        checked={this.state.endDateEnabled}
                        label="End Date"
                        onToggle={(checked) => this.setEndDateEnabled(checked)}
                        />
                        {this.getEndDateSelector()}
                    </div>
                </div>,
                <ExpandingTextArea
                key="description"
                defaultValue={this.experience.description}
                placeholder="Description"
                onChange={(event) => this.experienceProxy.description = event.target.value}
                />
            ]}
            />
        );
    }

    getEndDateSelector() {
        if (this.state.endDateEnabled)
            return ([
                <DateSelector
                key="dateSelector"
                year
                month
                day={false}
                onDateChange={(date) => this.experienceProxy.endDate = date}
                />
            ]);
    }

    setEndDateEnabled(enabled) {
        this.experienceProxy.endDate = enabled ? this.state.endDate : null;
        this.setState((state) => {return {endDateEnabled: enabled}});
    }

    handleEndDateChange(date) {
        this.experienceProxy.endDate = date;
        this.setState({endDate: date});
    }
}

export default ExperienceForm;