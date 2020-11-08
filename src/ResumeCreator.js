import jsPDF from "jspdf";

class ResumeCreator {
    createResume(resume) {
        const MARGINS = 20;
        const SIDEBAR_WIDTH_RATIO = 0.3;

        this.doc = new jsPDF("portrait", "pt", "a4");

        const sidebarWidth = this.doc.internal.pageSize.getWidth() * SIDEBAR_WIDTH_RATIO;

        this.margins = MARGINS;
        this.printPageLayout();
        this.printInformationList(MARGINS, MARGINS, sidebarWidth - 2 * MARGINS, resume.informationSuperlist[0]);
        this.doc.setPage(1);
        this.printExperienceList(sidebarWidth + MARGINS, MARGINS, this.doc.internal.pageSize.getWidth() - sidebarWidth - 2 * MARGINS, resume.experienceSuperlist[0]);
        
        return this.doc;
    }

    nextPage() {
        const currentPage = this.doc.getCurrentPageInfo().pageNumber;

        if (currentPage === this.doc.getNumberOfPages()) {
            this.doc.addPage();
            this.printPageLayout();
        }
        else {
            this.doc.setPage(currentPage + 1);
        }
    }

    printPageLayout() {
        const SIDEBAR_WIDTH_RATIO = 0.3;
        const SIDEBAR_COLOR = "#e1ecf4";

        const sidebarWidth = this.doc.internal.pageSize.getWidth() * SIDEBAR_WIDTH_RATIO;
            
        this.doc.setDrawColor(0);
        this.doc.setFillColor(SIDEBAR_COLOR);
        this.doc.rect(0, 0, sidebarWidth, this.doc.internal.pageSize.getHeight(), "F");
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
        this.printText(x, y, DATE_WIDTH, experience.startDate + " -\n" + experience.endDate, visible);
        
        const experienceX = x + DATE_WIDTH + SPACING2;
        const experienceWidth = width - DATE_WIDTH - SPACING2;

        let titleX = experienceX;
        let titleWidth = experienceWidth;

        if (experience.titleIcon !== null) {
            const ICON_SIZE = TITLE_FONT_SIZE + TITLE_DESCRIPTION_FONT_SIZE + SPACING1;
            
            if (visible)
                this.doc.addImage(experience.titleIcon, "png", experienceX, y, ICON_SIZE, ICON_SIZE);
            
            titleX += ICON_SIZE + SPACING1;
            titleWidth -= ICON_SIZE + SPACING1;
        }

        this.doc.setFont(this.doc.getFont().fontName, "bold");
        this.doc.setFontSize(TITLE_FONT_SIZE);
        let height = this.printText(titleX, y, titleWidth, experience.title, visible);

        if (experience.titleDescription.length > 0) {
            height += SPACING1;
            this.doc.setFont(this.doc.getFont().fontName, "italic");
            this.doc.setFontSize(TITLE_DESCRIPTION_FONT_SIZE);
            height +=  this.printText(titleX, y + height, titleWidth, experience.titleDescription, visible);
        }

        if (visible && experience.titleLink.length > 0)
            this.doc.link(experienceX, y, experienceWidth, height, { url: experience.titleLink });

        if (experience.keywords.length > 0) {
            height += SPACING1;
            this.doc.setFont(this.doc.getFont().fontName, "normal");
            this.doc.setFontSize(KEYWORDS_FONT_SIZE);
            height += this.printKeywords(experienceX, y + height, experienceWidth, experience.keywords, visible);
        }
        
        height += SPACING1;
        this.doc.setFontSize(DESCRIPTION_FONT_SIZE);
        height += this.printText(experienceX, y + height, experienceWidth, experience.description, visible);
        
        return height;
    }

    printExperienceList(x, y, width, experienceList, visible = true) {
        const SPACING = 10;

        if (experienceList.experiences.length === 0)
            return 0;

        let currentY = y;
        let height = this.printTitle(0, 0, width, experienceList.title, false) 
            + SPACING
            + this.printExperience(0, 0, width, experienceList.experiences[0], false);

        if (y + height > this.doc.internal.pageSize.getHeight() - this.margins) {
            this.nextPage();
            currentY = this.margins;
        }

        currentY += this.printTitle(x, currentY, width, experienceList.title, visible) + SPACING;
        currentY += this.printExperience(x, currentY, width, experienceList.experiences[0], visible);
        
        for (let i = 1; i < experienceList.experiences.length; ++i) {
            currentY += SPACING;
            height += SPACING;
            
            if (currentY > this.doc.internal.pageSize.getHeight() - this.margins) {
                this.nextPage();
                currentY = this.margins;
            }

            const experienceHeight = this.printExperience(0, 0, width, experienceList.experiences[i], false);
            height += experienceHeight;

            if (currentY + experienceHeight > this.doc.internal.pageSize.getHeight() - this.margins) {
                this.nextPage();
                currentY = this.margins;
            }

            currentY += this.printExperience(x, currentY, width, experienceList.experiences[i], visible);
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

    //TO DO: keep track of current y position as member.
    printExperienceSuperlist(x, y, width, experienceSuperlist, visible = true) {
        const SPACING = 5;

        if (experienceSuperlist.length === 0)
            return 0;

        let height = -SPACING;

        for (let i = 0; i < experienceSuperlist.length; ++i) {
            height += SPACING;
            height += this.printExperienceList(x, y + height, width, experienceSuperlist[i], visible);
        }

        return height;
    }

    printInformation(x, y, width, information, visible = true) {
        const SPACING = 3;
        const KEY_FONT_SIZE = 10;
        const RATING_HEIGHT = 5;

        this.doc.setFont(this.doc.getFont().fontName, "bold");
        this.doc.setFontSize(KEY_FONT_SIZE);

        let height = this.printText(x, y, width, information.key, visible);
        
        if (information.rating >= 0) {
            height += SPACING;
            
            if (visible) {
                this.doc.setDrawColor(0);
                this.doc.setFillColor("black");
                this.doc.rect(x, y + height, width * information.rating / 100, RATING_HEIGHT, "F");
                
                height += RATING_HEIGHT;
            }
        }

        if (information.description.length > 0) {
            height += SPACING;

            this.doc.setFont(this.doc.getFont().fontName, "normal");
            height += this.printText(x, y + height, width, information.description, visible);
        }

        return height;
    }

    printInformationList(x, y, width, informationList, visible = true) {
        const SPACING = 5;
        const TITLE_FONT_SIZE = 13;

        this.doc.setFont(this.doc.getFont().fontName, "bold");
        this.doc.setFontSize(TITLE_FONT_SIZE);
        
        let height = this.printText(x, y, width, informationList.title, visible);

        for (let i = 0; i < informationList.informations.length; ++i) {
            height += SPACING;
            height += this.printInformation(x, y + height, width, informationList.informations[i], visible);
        }

        return height;
    }
}

export default ResumeCreator;