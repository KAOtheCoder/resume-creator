import React from "react";
import ComboBox from "./ComboBox";
import "./DateSelector.css";

class DateSelector extends React.Component {
    static defaultProps = {
        onDateChange: (date) => {},
        year: true,
        month: true,
        day: true
    }

    constructor(props) {
        super(props);

        if (this.props.date === undefined) {
            this.date = new Date();
            this.props.onDateChange(this.date);
        }
        else {
            this.date = this.props.date;
        }
    }

    render() {
        return (
            <div className="DateSelector">
                {this.props.label}
                {this.getComboBoxes()}
            </div>
        );
    }

    getComboBoxes() {
        const currentDate = new Date();
        const comboBoxes = [];

        if (this.props.year)
            comboBoxes.push(
                <ComboBox 
                key="year"
                defaultValue={this.date.getFullYear()}
                options={this.createNumericArray(currentDate.getFullYear() - 50, currentDate.getFullYear())}
                onChange={(event) => {
                    this.date.setFullYear(event.target.value);
                    this.props.onDateChange(this.date);
                }}
                />
            );

        if (this.props.month)
            comboBoxes.push(
                <ComboBox
                key="month"
                defaultValue={this.date.getMonth() + 1}
                options={this.createNumericArray(1, 12)}
                onChange={(event) => {
                    this.date.setMonth(event.target.value - 1);
                    this.props.onDateChange(this.date);
                }}
                />
            );

        if (this.props.day)
            comboBoxes.push(
                <ComboBox
                key="day"
                defaultValue={this.date.getDate()}
                options={this.createNumericArray(1, 31)}
                onChange={(event) => {
                    this.date.setDate(event.target.value);
                    this.props.onDateChange(this.date);
                }}
                />
            );

        return comboBoxes;
    }

    createNumericArray(from, to) {
        return Array.from({length: to - from + 1}, (v, i) => from + i);
    }
}

export default DateSelector;