import React from 'react';
import "./ToolBar.css";

class ToolBarButton extends React.Component {
    render() {
        return (
            <div 
            className={this.props.className + " ToolBar-Button"}
            onClick={this.props.onClick}
            >
                <i className="material-icons">{this.props.icon}</i>
                <span>{this.props.label}</span>
            </div>
        );
    }
}

class ToolBar extends React.Component {
    static defaultProps = {
        onHeightChange: (height) => {}
    }

    constructor(props) {
        super(props);

        this.height = 0;
        this.resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const height = entry.target.scrollHeight;
                if (height !== this.height) {
                    this.height = height;
                    this.props.onHeightChange(height);
                }
            }
        });

        this.toolBarRef = React.createRef();
    }

    componentDidMount() {
        const ref = this.toolBarRef.current;
        if (ref)
            this.resizeObserver.observe(ref);
    }

    render() {
        return (
            <div 
            className="ToolBar"
            ref={this.toolBarRef}
            >
                <ToolBarButton
                onClick={this.props.onUndo}
                icon="undo"
                label="Undo"
                />
                <ToolBarButton
                onClick={this.props.onRedo}
                icon="redo"
                label="Redo"
                />
                <ToolBarButton
                onClick={this.props.onRefresh}
                icon="refresh"
                label="Refresh"
                />
                <ToolBarButton
                onClick={this.props.onDownload}
                icon="file_download"
                label="Download"
                />
                <ToolBarButton
                className="ToolBar-DeleteButton"
                onClick={this.props.onClear}
                icon="delete"
                label="Clear"
                />
                <ToolBarButton
                onClick={this.props.onImport}
                icon="file_upload"
                label="Import"
                />
                <ToolBarButton
                onClick={this.props.onExport}
                icon="save"
                label="Export"
                />
                <a className="ToolBar-Link"
                href="https://github.com/KAOtheCoder/resume-creator"
                target="_blank"
                rel="noopener noreferrer"
                >
                    <ToolBarButton
                    icon="code"
                    label="Source Code"
                    />
                </a>
            </div>
        );
    }
}

export default ToolBar;