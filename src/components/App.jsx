import React from 'react';
import ResumeCreator from "../ResumeCreator";
import ResumeForm from "./forms/ResumeForm";
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.resumeCreator = new ResumeCreator();
        this.state = {preview: undefined};
        this.previewRef = React.createRef();
        this.updateTimer = 0;

        const resumeString = localStorage.getItem("Resume");
        if (resumeString) {
            this.resume = JSON.parse(resumeString);
            this.updatePreview(this.resume);
        }
    }

    render() {
        return (
            <div className="App">
                <ResumeForm
                resume={this.resume}
                onResumeChange={(resume) => {
                    if (this.updateTimer > 0)
                        clearTimeout(this.updateTimer);
                    
                    this.updateTimer = setTimeout(() => {this.updatePreview(resume);}, 2000);
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
            </div>
        );
    }

    async updatePreview(resume) {
        this.updateTimer = 0;

        const preview = this.previewRef.current;

        if (preview)
            this.fadeOut(preview);

        const doc = await this.resumeCreator.createResume(resume);
        const src = doc.output("datauristring");
        this.setState({preview:src});
        localStorage.setItem("Resume", JSON.stringify(resume));
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
