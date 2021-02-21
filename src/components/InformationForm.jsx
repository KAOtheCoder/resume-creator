import React from "react";
import CollapsibleList from "./CollapsibleList";
import UnderlinedInput from "./UnderlinedInput";
import { Information } from "../Resume";
import CheckBox from "./CheckBox";
import "./InformationForm.css";
import Slider from "./Slider";
import SpinBox from "./SpinBox";
import createChangeProxy from "../ChangeProxy";

class InformationForm extends React.Component {
    static defaultProps = {
        onInformationChange: (information) => {} 
    }

    constructor(props) {
        super(props);

        if (this.props.information === undefined) {
            this.information = new Information("Key");
            this.props.onInformationChange(this.information);
        }
        else {
            this.information = this.props.information;
        }

        this.informationProxy = createChangeProxy(this.information, () => this.props.onInformationChange(this.information));

        const ratingEnabled = this.information.rating >= 0;
        
        this.state = {
            ratingEnabled: ratingEnabled,
            rating: ratingEnabled ? this.information.rating : 50
        };
    }

    getRatingRow() {
        const components = [
            <CheckBox
            key="checkBox"
            checked={this.state.ratingEnabled}
            label="Rating"
            onToggle={(checked) => this.setRatingEnabled(checked)}
            />
        ];

        if (this.state.ratingEnabled) {
            components.push(
                <Slider
                key="slider"
                className="InformationForm-Rating-Slider"
                min={0}
                max={100}
                value={this.state.rating}
                onChange={(event) => this.handleRatingChange(event.target.value)}
                />
            );

            components.push(
                <SpinBox
                key="spinBox"
                min={0}
                max={100}
                value={this.state.rating}
                onChange={(event) => this.handleRatingChange(event.target.value)}
                />
            );
        }

        return (
            <div
            className="InformationForm-Rating"
            key="rating"
            >
                {components}
            </div>
        );
    }

    render() {
        return (
            <CollapsibleList
            title={this.information.key}
            titleEditable
            onTitleChange={(title) => this.informationProxy.key = title}
            deletable
            onDelete={this.props.onDelete}
            addable={false}
            movableUp={this.props.movableUp}
            onMoveUp={this.props.onMoveUp}
            movableDown={this.props.movableDown}
            onMoveDown={this.props.onMoveDown}
            elements={[
                <UnderlinedInput
                key="value"
                defaultValue={this.information.value}
                placeholder="Value"
                onChange={(event) => this.informationProxy.value = event.target.value}
                />,
                this.getRatingRow()
            ]}
            />
        );
    }

    setRatingEnabled(enabled) {
        this.informationProxy.rating = enabled ? this.state.rating : -1;
        this.setState((state) => {return {ratingEnabled: enabled}});
    }

    handleRatingChange(rating) {
        this.informationProxy.rating = rating;
        this.setState({rating: rating});
    }
}

export default InformationForm;