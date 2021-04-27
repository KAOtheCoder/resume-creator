import React from 'react';
import ResumeCreator from "../ResumeCreator";
import { Experience, ExperienceList, Information, InformationList, Resume } from "../Resume";
import ResumeForm from "./ResumeForm";
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.resumeCreator = new ResumeCreator();
        this.state = {preview: undefined};
        this.previewRef = React.createRef();
        this.updateTimer = 0;
    }

    render() {
        return (
            <div className="App">
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
                <ResumeForm
                onResumeChange={(resume) => {
                    if (this.updateTimer > 0)
                        clearTimeout(this.updateTimer);
                    
                    this.updateTimer = setTimeout(() => {this.updatePreview(resume);}, 2000);
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
    }

    fadeIn(element) {
        element.classList.remove("App-FadeOut");
        element.classList.add("App-FadeIn");
    }

    fadeOut(element) {
        element.classList.remove("App-FadeIn");
        element.classList.add("App-FadeOut");
    }

    createDefault() {
        const LOREM_IPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id eros turpis. Vivamus tempor urna vitae sapien mollis molestie. Vestibulum in "
            + "lectus non enim bibendum laoreet at at libero. Etiam malesuada erat sed sem blandit in varius orci porttitor. Sed at sapien urna. Fusce augue ipsum, molestie et "
            + "adipiscing at, varius quis enim. Morbi sed magna est, vel vestibulum urna. Sed tempor ipsum vel mi pretium at elementum urna tempor. Nulla faucibus consectetur felis, "
            + "elementum venenatis mi mollis gravida. Aliquam mi ante, accumsan eu tempus vitae, viverra quis justo.\nProin feugiat augue in augue rhoncus eu cursus tellus laoreet. "
            + "Pellentesque eu sapien at diam porttitor venenatis nec vitae velit. Donec ultrices volutpat lectus eget vehicula. Nam eu erat mi, in pulvinar eros. Mauris viverra porta "
            + "orci, et vehicula lectus sagittis id. Nullam at magna vitae nunc fringilla posuere. Duis volutpat malesuada ornare. Nulla in eros metus. Vivamus a posuere libero.";

        const icon = new Image();
        icon.src = "logo192.png";
        
        const experience = new Experience("Hello World", 
            LOREM_IPSUM, 
            new Date(2021, 1), new Date(2021, 2), 
            icon,
            "A Hello World Program Like Any Other",
            "https://www.google.com/search?q=hello+world",
            ["javascript", "ReactJS", "jsPDF"]);

        const experienceList = new ExperienceList("PERSONAL PROJECTS");

        for (let i = 0; i < 2; ++i)
            experienceList.experiences.push(experience);

        const information = new Information("Hacking", 75);
        const informationList = new InformationList("Skills");

        for (let i = 0; i < 5; ++i)
            informationList.informations.push(information);

        const resume = new Resume("Mr. Robot");
        resume.brief = LOREM_IPSUM;

        for (let i = 0; i < 10; ++i)
            resume.informationSuperlist.push(informationList);

        for (let i = 0; i < 3; ++i)
            resume.experienceSuperlist.push(experienceList);

        console.log(resume.informationSuperlist)
        const resumeCreator = new ResumeCreator();
        const doc = resumeCreator.createResume(resume);
        doc.output("dataurlnewwindow");
        //doc.save("cv.pdf");
    }
}

export default App;
