import React from "react";
import CollapsibleList from "./CollapsibleList";
import UnderlinedInput from "./UnderlinedInput";
import { Information } from "../Resume";
import CheckBox from "./CheckBox";
import "./InformationForm.css";

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

        this.state = {
            ratingEnabled: this.information.rating >= 0,
            rating: this.information.rating >= 0 ? this.information.rating : 50
        };
    }

    getRatingRow() {
        const components = [
            <CheckBox
            checked={this.information.rating >= 0}
            label="Rating"
            onClick={() => this.toggleRatingEnabled()}
            />
        ];

        if (this.state.ratingEnabled) {
            components.push(
                <input
                type="range"
                min={0}
                max={100}
                value={this.state.rating}
                onChange={(event) => this.handleRatingChange(event.target.value)}
                />
            );

            components.push(
                <input
                type="number"
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
            titleReadOnly={false}
            onTitleChange={(title) => this.handleKeyChange(title)}
            deletable={true}
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
                onChange={(event) => this.handleValueChange(event.target.value)}
                />,
                this.getRatingRow()
            ]}
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

    toggleRatingEnabled() {
        this.information.rating = this.information.rating >= 0 ? -1 : this.state.rating;
        this.handleInformationChange();
        this.setState((state) => {return {ratingEnabled: !state.ratingEnabled}});
    }

    handleRatingChange(rating) {
        if (this.information.rating >= 0) {
            this.information.rating = rating;
            this.handleInformationChange();
        }

        this.setState({rating: rating});
    }

    handleInformationChange() {
        this.props.onInformationChange(this.information);
    }
}

export default InformationForm;