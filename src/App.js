import jsPDF from "jspdf";
import React from 'react';
import Rect from "./Rect";
import ResumeCreator from "./ResumeCreator";
import Experience from "./Experience";

import './App.css';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <button className="App-button"
                onClick={() => this.createPdf() }
                >
                "Create pdf"
                </button>
            </div>
        );
    }

    createPdf() {
        const LOREM_IPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id eros turpis. Vivamus tempor urna vitae sapien mollis molestie. Vestibulum in "
            + "lectus non enim bibendum laoreet at at libero. Etiam malesuada erat sed sem blandit in varius orci porttitor. Sed at sapien urna. Fusce augue ipsum, molestie et "
            + "adipiscing at, varius quis enim. Morbi sed magna est, vel vestibulum urna. Sed tempor ipsum vel mi pretium at elementum urna tempor. Nulla faucibus consectetur felis, "
            + "elementum venenatis mi mollis gravida. Aliquam mi ante, accumsan eu tempus vitae, viverra quis justo.\nProin feugiat augue in augue rhoncus eu cursus tellus laoreet. "
            + "Pellentesque eu sapien at diam porttitor venenatis nec vitae velit. Donec ultrices volutpat lectus eget vehicula. Nam eu erat mi, in pulvinar eros. Mauris viverra porta "
            + "orci, et vehicula lectus sagittis id. Nullam at magna vitae nunc fringilla posuere. Duis volutpat malesuada ornare. Nulla in eros metus. Vivamus a posuere libero.";

        let icon = new Image();
        icon.src = "logo192.png";
        
        const experience = new Experience("Hello World", 
            LOREM_IPSUM, 
            "2020-09", "current", 
            icon,
            "A Hello World Program Like Any Other",
            "https://www.google.com/search?q=hello+world",
            ["javascript", "ReactJS", "jsPDF"]);

        const resumeCreator = new ResumeCreator();
        const doc = resumeCreator.createResume("Personal Projects", [experience, experience, experience, experience, experience]);
        doc.output("dataurlnewwindow");
        //doc.save("cv.pdf");
    }
}

export default App;
