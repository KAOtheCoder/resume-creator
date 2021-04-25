import React from "react";
import CheckBox from "./CheckBox";
import "./ImageSelector.css";
import FileSelector from "./FileSelector";

class ImageSelector extends React.Component {
    static defaultProps = {
        checkable: false,
        onSourceChanged: (source) => {},
        accept: "image/*"
    }

    constructor(props) {
        super(props);

        this.fileInputRef = React.createRef();
        this.reader = new FileReader();
        this.reader.onload = () => {this.setSource(this.reader.result)};
        this.state = {
            enabled: true,
            src: ""
        };
    }

    render() {
        const elements = [];

        if (this.props.checkable)
            elements.push(
                <CheckBox
                key="checkBox"
                label={this.props.label}
                checked={this.state.enabled}
                onToggle={(checked) => {
                    this.setState(
                        {enabled: checked},
                        () => this.props.onSourceChanged(this.state.enabled ? this.state.source : "")
                    );
                }}
                />
            );

        if (this.state.enabled) {
            elements.push(
                <FileSelector
                key="fileSelector"
                onFileChanged={(file) => {this.reader.readAsDataURL(file);}}
                />
            );

            if (this.state.source)
                elements.push(
                    <img
                    key="preview"
                    className="ImageSelector-Preview"
                    src={this.state.source}
                    alt="preview"
                    />
                );
        }

        return (
            <div
            className="ImageSelector"
            >
                {elements}
            </div>
        );
    }

    setSource(source) {
        if (this.state.source !== source)
            this.setState({source: source}, () => this.props.onSourceChanged(source));
    }
}

export default ImageSelector;