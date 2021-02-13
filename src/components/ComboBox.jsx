import React from "react";
import "./ComboBox.css";

class ComboBox extends React.Component {
    static defaultProps = {
        onChange: (event) => {}
    }

    render() {
        return (
            <select 
            className="ComboBox"
            onChange={this.props.onChange}
            defaultValue={this.props.defaultValue}
            >
                {this.getOptions()}
            </select>
        );
    }

    getOptions() {
        const options = [];

        for (let i = 0; i < this.props.options.length; ++i)
            options.push(
                <option 
                className="ComboBox-Option" 
                key={i}
                value={this.props.options[i]}
                >
                    {this.props.options[i]}
                </option>
            );

        return options;
    }
}

export default ComboBox;