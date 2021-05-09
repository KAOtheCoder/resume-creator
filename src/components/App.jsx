import React from 'react';
import ResumeCreator from "../ResumeCreator";
import ResumeForm from "./forms/ResumeForm";
import './App.css';
import { Resume } from '../Resume';
import KeyGenerator from '../KeyGenerator';
import HistoryStack from "../HistoryStack";
import CookiesBanner from './CookiesBanner';
import ToolBar from "./ToolBar";

class App extends React.Component {
    constructor(props) {
        super(props);

        const MAX_HISTORY_SIZE = 10;

        this.resumeCreator = new ResumeCreator();
        this.previewRef = React.createRef();
        this.updateTimer = 0;
        this.history = new HistoryStack(MAX_HISTORY_SIZE);
        this.keyGenerator = new KeyGenerator();

        const resumeString = localStorage.getItem("Resume");
        this.resume = resumeString ? JSON.parse(resumeString) : new Resume("");

        this.state = {
            key: this.keyGenerator.generateKey(),
            preview: undefined,
            marginTop: "56px"
        };

        this.save();

        document.addEventListener("keydown", (event) => {
            if (event.ctrlKey && (event.key === 'z' || event.key === 'Z')) {
                if ((event.shiftKey && this.redo()) || (!event.shiftKey && this.undo())) {
                    event.preventDefault();
                    return false;
                }
            }

            return true;
        });
    }

    undo() { this.reload(this.history.undo()); }

    redo() { this.reload(this.history.redo()); }

    clear() { 
        this.reload(JSON.stringify(new Resume("")));
        this.save();
    }

    reload(resumeString) {
        if (resumeString) {
            this.resume = JSON.parse(resumeString);
            this.setState({key: this.keyGenerator.generateKey()});
            this.updatePreview();
            return true;
        }

        return false;
    }

    render() {
        return (
            <div 
            className="App"
            style={{"--toolBar-height": this.state.marginTop}}
            >
                <ToolBar
                onHeightChange={(height) => this.setState({marginTop: height + "px"})}
                onUndo={() => this.undo()}
                onRedo={() => this.redo()}
                onRefresh={() => this.updatePreview()}
                onDownload={() => this.download(this.resume.name + ".pdf")}
                onClear={() => this.clear()}
                />
                <ResumeForm
                key={this.state.key}
                resume={this.resume}
                onResumeChange={(resume) => {
                    if (this.updateTimer > 0)
                        clearTimeout(this.updateTimer);
                    
                    this.updateTimer = setTimeout(() => {
                        this.updateTimer = 0;
                        this.save();
                    }, 2000);
                }}
                />
                <iframe
                ref={this.previewRef}
                className="App-Preview"
                title="Preview"
                src={this.state.preview}
                onLoad={() => {
                    const preview = this.previewRef.current;
                    if (preview)
                        this.fadeIn(preview);
                }}
                />
                <CookiesBanner />
            </div>
        );
    }
    
    save() {
        if (this.history.save(JSON.stringify(this.resume)))
            this.updatePreview();
    }

    async download(fileName) {
        const doc = await this.resumeCreator.createResume(this.resume);
        doc.save(fileName);
    }

    async updatePreview() {
        const preview = this.previewRef.current;

        if (preview)
            this.fadeOut(preview);

        const doc = await this.resumeCreator.createResume(this.resume);
        const src = doc.output("datauristring");
        this.setState({preview: src});
        localStorage.setItem("Resume", JSON.stringify(this.resume));
    }

    fadeIn(element) {
        element.classList.remove("App-FadeOut");
        element.classList.add("App-FadeIn");
    }

    fadeOut(element) {
        element.classList.remove("App-FadeIn");
        element.classList.add("App-FadeOut");
    }
}

export default App;
