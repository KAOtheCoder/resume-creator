import React from 'react';
import ResumeCreator from "../ResumeCreator";
import ResumeForm from "./forms/ResumeForm";
import './App.css';
import { Resume } from '../Resume';
import KeyGenerator from '../KeyGenerator';

class App extends React.Component {
    constructor(props) {
        super(props);

        const cookiesBanner = sessionStorage.getItem("CookiesBanner") ?? "show";

        this.resumeCreator = new ResumeCreator();
        this.previewRef = React.createRef();
        this.updateTimer = 0;
        this.saves = [];
        this.keyGenerator = new KeyGenerator();

        const resumeString = localStorage.getItem("Resume");
        this.resume = resumeString ? JSON.parse(resumeString) : new Resume("");
        this.saveResume(JSON.stringify(this.resume));

        this.state = {
            key: this.keyGenerator.generateKey(),
            preview: undefined,
            cookiesBanner: cookiesBanner === "show"
        };

        document.addEventListener("keydown", (event) => {
            if (event.ctrlKey && event.key === 'z') {
                if (this.undo()) {
                    event.preventDefault();
                    return false;
                }
            }

            return true;
        });
    }

    undo() {
        if (this.saves.length > 1) {
            this.saves.pop();
            const resumeString = this.saves.pop();
            this.resume = JSON.parse(resumeString);
            this.setState({key: this.keyGenerator.generateKey()});
            this.saveResume(resumeString);
            return true;
        }

        return false;
    }

    render() {
        let cookiesBanner = this.state.cookiesBanner ? (
            <div className="App-CookiesBanner">
                This website does not use cookies, but uses local storage to save your work.
                <div 
                className="App-CookiesBannerButton"
                onClick={() => {
                    sessionStorage.setItem("CookiesBanner", "hide");
                    this.setState({cookiesBanner: false});
                }}
                >
                    OK
                </div>
            </div>
        ) : undefined;

        return (
            <div className="App">
                <ResumeForm
                key={this.state.key}
                resume={this.resume}
                onResumeChange={(resume) => {
                    if (this.updateTimer > 0) {
                        clearTimeout(this.updateTimer);
                        this.updateTimer = 0;
                    }
                    
                    const resumeString = JSON.stringify(resume);
                    this.updateTimer = setTimeout(() => {this.saveResume(resumeString);}, 2000);
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
                {cookiesBanner}
            </div>
        );
    }
    
    async saveResume(resumeString) {
        if (this.saves.length > 0 && resumeString === this.saves[this.saves.length - 1])
            return;

        const preview = this.previewRef.current;

        if (preview)
            this.fadeOut(preview);

        this.saves.push(resumeString);
        const doc = await this.resumeCreator.createResume(JSON.parse(resumeString));
        const src = doc.output("datauristring");
        this.setState({preview:src});
        localStorage.setItem("Resume", resumeString);
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
