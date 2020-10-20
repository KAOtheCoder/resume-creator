import Rect from "./Rect";
import jsPDF from "jspdf";
import MarginedRect from "./MarginedRect"

class ResumeCreator {
    createResume(title, experiences) {
        const MARGINS = 50;

        this.doc = new jsPDF("portrait", "pt", "a4");
        this.margins = MARGINS;
        this.printExperienceList(MARGINS, MARGINS, this.doc.internal.pageSize.getWidth() - 2 * MARGINS, title, experiences);
        
        return this.doc;
    }

    printText(x, y, width, text, visible = true) {
        if (text.length === 0)
            return 0;

        const paragraphs = text.split("\n");
        let height = 0;

        for (let i = 0; i < paragraphs.length; ++i) {
            const lines = this.doc.splitTextToSize(paragraphs[i], width);
            this.doc.text(lines, x, y + height, { align: "justify", baseline: "top", maxWidth: width, renderingMode: visible ? "fill" : "invisible" });
            height += lines.length * this.doc.getLineHeight();
        }

        return height;
    }

    printKeywords(x, y, width, keywords, visible = true) {
        const MARGIN = 3;
        const SPACING = 3;
        const RADIUS = 3;

        const textColor = this.doc.getTextColor();

        this.doc.setTextColor("#3b87b8");

        const keywordRectHeight = this.doc.getFontSize() + 2 * MARGIN;
        let currentX = x;
        let height = 0;

        for (let i = 0; i < keywords.length; ++i) {
            const rectWidth = this.doc.getTextWidth(keywords[i]) + 2 * MARGIN;

            if (currentX + rectWidth > x + width) {
                currentX = x;
                height += keywordRectHeight + SPACING;
            }

            if (visible) {
                this.doc.setDrawColor(0);
                this.doc.setFillColor("#e1ecf4");
                this.doc.roundedRect(currentX, y + height, rectWidth, keywordRectHeight, RADIUS, RADIUS, "F");
                this.doc.text(keywords[i], currentX + MARGIN, y + height + MARGIN, { align: "justify", baseline: "top" });
            }

            currentX += rectWidth + SPACING;
        }

        this.doc.setTextColor(textColor);

        return height + keywordRectHeight;
    }

    printExperience(x, y, width, experience, visible = true) {
        const SPACING1 = 3;
        const SPACING2 = 5;
        const DATE_WIDTH = 50;
        const DATE_FONT_SIZE = 10;
        const TITLE_FONT_SIZE = 11;
        const TITLE_DESCRIPTION_FONT_SIZE = 10;
        const KEYWORDS_FONT_SIZE = 10;
        const DESCRIPTION_FONT_SIZE = 10;

        this.doc.setFont(this.doc.getFont().fontName, "normal");
        this.doc.setFontSize(DATE_FONT_SIZE);
        this.printText(x, y, DATE_WIDTH, experience.getStartDate() + " -\n" + experience.getEndDate(), visible);
        
        const experienceX = x + DATE_WIDTH + SPACING2;
        const experienceWidth = width - DATE_WIDTH - SPACING2;

        let titleX = experienceX;
        let titleWidth = experienceWidth;

        if (experience.getTitleIcon()) {
            const ICON_SIZE = TITLE_FONT_SIZE + TITLE_DESCRIPTION_FONT_SIZE + SPACING1;
            
            if (visible)
                this.doc.addImage(experience.getTitleIcon(), "png", experienceX, y, ICON_SIZE, ICON_SIZE);
            
            titleX += ICON_SIZE + SPACING1;
            titleWidth -= ICON_SIZE + SPACING1;
        }

        this.doc.setFont(this.doc.getFont().fontName, "bold");
        this.doc.setFontSize(TITLE_FONT_SIZE);
        let height = this.printText(titleX, y, titleWidth, experience.getTitle(), visible);

        if (experience.getTitleDescription()) {
            height += SPACING1;
            this.doc.setFont(this.doc.getFont().fontName, "italic");
            this.doc.setFontSize(TITLE_DESCRIPTION_FONT_SIZE);
            height +=  this.printText(titleX, y + height, titleWidth, experience.getTitleDescription(), visible);
        }

        if (visible && experience.getTitleLink())
            this.doc.link(experienceX, y, experienceWidth, height, { url: experience.getTitleLink() });

        if (experience.getKeywords().length > 0) {
            height += SPACING1;
            this.doc.setFont(this.doc.getFont().fontName, "normal");
            this.doc.setFontSize(KEYWORDS_FONT_SIZE);
            height += this.printKeywords(experienceX, y + height, experienceWidth, experience.getKeywords(), visible);
        }
        
        height += SPACING1;
        this.doc.setFontSize(DESCRIPTION_FONT_SIZE);
        height += this.printText(experienceX, y + height, experienceWidth, experience.getDescription(), visible);
        
        return height;
    }

    printExperienceList(x, y, width, title, experiences, visible = true) {
        const SPACING = 10;

        if (experiences.length === 0)
            return 0;

        let currentY = y;
        let height = this.printTitle(0, 0, width, title, false) 
            + SPACING
            + this.printExperience(0, 0, width, experiences[0], false);

        if (y + height > this.doc.internal.pageSize.getHeight() - this.margins) {
            this.doc.addPage();
            currentY = this.margins;
        }

        currentY += this.printTitle(x, currentY, width, title, visible) + SPACING;
        currentY += this.printExperience(x, currentY, width, experiences[0], visible);
        
        for (let i = 1; i < experiences.length; ++i) {
            currentY += SPACING;
            height += SPACING;
            
            if (currentY > this.doc.internal.pageSize.getHeight() - this.margins) {
                this.doc.addPage();
                currentY = this.margins;
            }

            const experienceHeight = this.printExperience(0, 0, width, experiences[i], false);
            height += experienceHeight;

            if (currentY + experienceHeight > this.doc.internal.pageSize.getHeight() - this.margins) {
                this.doc.addPage();
                currentY = this.margins;
            }

            currentY += this.printExperience(x, currentY, width, experiences[i], visible);
        }

        return height;
    }

    printTitle(x, y, width, title, visible = true) {
        const SPACING = 3;
        const TITLE_FONT_SIZE = 13;

        this.doc.setFont(this.doc.getFont().fontName, "bold");
        this.doc.setFontSize(TITLE_FONT_SIZE);
        const height = this.printText(x, y, width, title, visible) + SPACING;

        if (visible)
            this.doc.line(x, y + height, x + width, y + height);
        
        return height;
    }
}

export default ResumeCreator;