import React from "react";
import "./FileSelector.css";

class FileSelector extends React.Component {
    static defaultProps = {
        onFileChanged: (file) => {}
    }

    constructor(props) {
        super(props);

        this.fileInputRef = React.createRef();
        this.state = {file: null}
    }

    render() {
        const fileNameText = this.state.file ? <span>{this.state.file.name}</span> : undefined;

        return (
            <div
            className="FileSelector"
            onClick={() => {
                if (this.fileInputRef.current)
                    this.fileInputRef.current.click();
            }}
            >
                <input
                ref={this.fileInputRef}
                style={{display: "none"}}
                type="file"
                accept={this.props.accept}
                onChange={(event) => {
                    if (event.target.files.length > 0) {
                        const file = event.target.files[0];
                        this.setState({file: file}, () => this.props.onFileChanged(this.state.file));
                    }
                }}
                />
                <i className="material-icons">folder</i>
                {fileNameText}
            </div>
        );
    }
}

export default FileSelector;