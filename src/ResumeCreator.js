import jsPDF from "jspdf";

class ResumeCreator {
    createResume(resume) {
        const MARGINS = 20;
        const SIDEBAR_WIDTH_RATIO = 0.3;

        this.doc = new jsPDF("portrait", "pt", "a4");

        this.sideBarWidth = this.doc.internal.pageSize.getWidth() * SIDEBAR_WIDTH_RATIO;

        this.margins = MARGINS;
        this.printPageLayout();
        this.printSideBar(resume);
        this.printMain(resume);

        return this.doc;
    }

    printMain(resume) {
        const BRIEF_FONT_SIZE = 10;
        const SPACING = 10;

        let y = this.margins;
        const x = this.sideBarWidth + this.margins;
        const width = this.doc.internal.pageSize.getWidth() - this.sideBarWidth - 2 * this.margins;

        this.doc.setPage(1);

        if (resume.brief.length > 0) {
            this.doc.setFontSize(BRIEF_FONT_SIZE);
            this.doc.setFont(this.doc.getFont().fontName, "normal");
            y += this.printText(x, this.margins, width, resume.brief) + SPACING;
        }
        
        this.printExperienceSuperlist(x, y, width, resume.experienceSuperlist);
    }

    printSideBar(resume) {
        const NAME_FONT_SIZE = 20;
        const SPACING = 10;

        let y = this.margins;

        this.doc.setPage(1);
        this.doc.setFontSize(NAME_FONT_SIZE);
        this.doc.setFont(this.doc.getFont().fontName, "bold");
        y += this.printText(this.margins, this.margins, this.sideBarWidth, resume.name) + SPACING;
        this.printInformationSuperlist(this.margins, y, this.sideBarWidth - 2 * this.margins, resume.informationSuperlist);
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
        const SIDEBAR_COLOR = "#dedede";
            
        this.doc.setDrawColor(0);
        this.doc.setFillColor(SIDEBAR_COLOR);
        this.doc.rect(0, 0, this.sideBarWidth, this.doc.internal.pageSize.getHeight(), "F");
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

    printName(x, y, width, name, visible) {
        const FONT_SIZE = 15;

        this.doc.setFontSize(FONT_SIZE);
        this.printText(x, y, width, name, visible);
    } 

    printTags(x, y, width, tags, visible = true) {
        const MARGIN = 3;
        const SPACING = 3;
        const RADIUS = 3;

        const textColor = this.doc.getTextColor();

        this.doc.setTextColor("#3b87b8");

        const tagRectHeight = this.doc.getFontSize() + 2 * MARGIN;
        let currentX = x;
        let height = 0;

        for (let i = 0; i < tags.length; ++i) {
            const rectWidth = this.doc.getTextWidth(tags[i]) + 2 * MARGIN;

            if (currentX + rectWidth > x + width) {
                currentX = x;
                height += tagRectHeight + SPACING;
            }

            if (visible) {
                this.doc.setDrawColor(0);
                this.doc.setFillColor("#e1ecf4");
                this.doc.roundedRect(currentX, y + height, rectWidth, tagRectHeight, RADIUS, RADIUS, "F");
                this.doc.text(tags[i], currentX + MARGIN, y + height + MARGIN, { align: "justify", baseline: "top" });
            }

            currentX += rectWidth + SPACING;
        }

        this.doc.setTextColor(textColor);

        return height + tagRectHeight;
    }

    printExperience(x, y, width, experience, visible = true) {
        const SPACING1 = 3;
        const SPACING2 = 5;
        const DATE_WIDTH = 50;
        const DATE_FONT_SIZE = 10;
        const HEADER_FONT_SIZE = 11;
        const HEADER_DESCRIPTION_FONT_SIZE = 10;
        const KEYWORDS_FONT_SIZE = 10;
        const DESCRIPTION_FONT_SIZE = 10;

        this.doc.setFont(this.doc.getFont().fontName, "normal");
        this.doc.setFontSize(DATE_FONT_SIZE);

        if (experience.startDate) {
            const dateToString = (date) => { return date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, "0") }
            let dateString = dateToString(experience.startDate);

            if (experience.endDate)
                dateString += " -\n" + dateToString(experience.endDate);

            this.printText(x, y, DATE_WIDTH, dateString, visible);
        }
        
        const experienceX = x + DATE_WIDTH + SPACING2;
        const experienceWidth = width - DATE_WIDTH - SPACING2;

        let headerX = experienceX;
        let headerWidth = experienceWidth;

        if (experience.headerIcon !== null) {
            const ICON_SIZE = HEADER_FONT_SIZE + HEADER_DESCRIPTION_FONT_SIZE + SPACING1;
            
            if (visible)
                this.doc.addImage(experience.headerIcon, "png", experienceX, y, ICON_SIZE, ICON_SIZE);
            
            headerX += ICON_SIZE + SPACING1;
            headerWidth -= ICON_SIZE + SPACING1;
        }

        this.doc.setFont(this.doc.getFont().fontName, "bold");
        this.doc.setFontSize(HEADER_FONT_SIZE);
        let height = this.printText(headerX, y, headerWidth, experience.header, visible);

        if (experience.headerDescription.length > 0) {
            height += SPACING1;
            this.doc.setFont(this.doc.getFont().fontName, "italic");
            this.doc.setFontSize(HEADER_DESCRIPTION_FONT_SIZE);
            height +=  this.printText(headerX, y + height, headerWidth, experience.headerDescription, visible);
        }

        if (visible && experience.headerLink.length > 0)
            this.doc.link(experienceX, y, experienceWidth, height, { url: experience.headerLink });

        if (experience.tags.length > 0) {
            height += SPACING1;
            this.doc.setFont(this.doc.getFont().fontName, "normal");
            this.doc.setFontSize(KEYWORDS_FONT_SIZE);
            height += this.printTags(experienceX, y + height, experienceWidth, experience.tags, visible);
        }
        
        height += SPACING1;
        this.doc.setFont(this.doc.getFont().fontName, "normal");
        this.doc.setFontSize(DESCRIPTION_FONT_SIZE);
        height += this.printText(experienceX, y + height, experienceWidth, experience.description, visible);
        
        return height;
    }

    printExperienceList(x, y, width, experienceList, visible = true) {
        const SPACING = 10;

        if (experienceList.experiences.length === 0)
            return { height: 0, y: y };

        let currentY = y;
        let height = this.printHeader(0, 0, width, experienceList.header, false) 
            + SPACING
            + this.printExperience(0, 0, width, experienceList.experiences[0], false);

        if (y + height > this.doc.internal.pageSize.getHeight() - this.margins) {
            this.nextPage();
            currentY = this.margins;
        }

        currentY += this.printHeader(x, currentY, width, experienceList.header, visible) + SPACING;
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

        return { height: height, y: currentY };
    }

    printHeader(x, y, width, header, visible = true) {
        const TOP_MARGIN = 3;
        const HEADER_FONT_SIZE = 13;
        const LEFT_RIGHT_MARGIN = HEADER_FONT_SIZE;

        const textColor = this.doc.getTextColor();

        this.doc.setFont(this.doc.getFont().fontName, "bold");
        this.doc.setFontSize(HEADER_FONT_SIZE);
        this.doc.setTextColor("white");

        const height = this.printText(x, y, width - 2 * LEFT_RIGHT_MARGIN, header, false) + TOP_MARGIN;
        let textWidth = Math.min(this.doc.getTextWidth(header), width - height - 2 * LEFT_RIGHT_MARGIN);

        if (visible) {
            this.doc.setFillColor("black");
            this.doc.setDrawColor(this.doc.getFillColor());
            const headerWidth = textWidth + 2 * LEFT_RIGHT_MARGIN;
            const halfHeight = height / 2;
            this.doc.lines([[0, 0], [halfHeight, -halfHeight], [headerWidth, 0], [halfHeight, halfHeight], [-halfHeight, halfHeight], [-headerWidth, 0]], x, y + halfHeight, [1, 1], "F", true);
            this.doc.setLineWidth(2);
            this.doc.line(x + headerWidth, y + halfHeight, x + width, y + halfHeight);
            this.printText(x + halfHeight + LEFT_RIGHT_MARGIN, y + TOP_MARGIN, width, header);
        }
        
        this.doc.setTextColor(textColor);

        return height;
    }

    printExperienceSuperlist(x, y, width, experienceSuperlist, visible = true) {
        const SPACING = 10;

        if (experienceSuperlist.length === 0)
            return { height: 0, y: y };

        let currentY = y - SPACING;
        let height = -SPACING;

        for (let i = 0; i < experienceSuperlist.length; ++i) {
            const size = this.printExperienceList(x, currentY + SPACING, width, experienceSuperlist[i], visible);
            currentY = size.y;
            height += SPACING + size.height;
        }

        return { height: height, y: currentY };
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
                this.doc.setFillColor(this.doc.getTextColor());
                this.doc.roundedRect(x, y + height, width * information.rating / 100, RATING_HEIGHT, RATING_HEIGHT / 2, RATING_HEIGHT / 2, "F");
                
                height += RATING_HEIGHT;
            }
        }

        if (information.value.length > 0) {
            height += SPACING;

            this.doc.setFont(this.doc.getFont().fontName, "normal");
            height += this.printText(x, y + height, width, information.value, visible);
        }

        return height;
    }

    printInformationList(x, y, width, informationList, visible = true) {
        const SPACING = 5;
        
        let height = this.printHeader(x, y, width, informationList.header, visible);

        for (let i = 0; i < informationList.informations.length; ++i) {
            height += SPACING;
            height += this.printInformation(x, y + height, width, informationList.informations[i], visible);
        }

        return height;
    }

    printInformationSuperlist(x, y, width, informationSuperlist, visible = true) {
        const SPACING = 10;

        if (informationSuperlist.length === 0)
            return { height: 0, y: y };

        let currentY = y - SPACING;
        let height = -SPACING;

        for (let i = 0; i < informationSuperlist.length; ++i) {
            currentY += SPACING;
            height += SPACING;
            
            const informationListHeight = this.printInformationList(0, 0, width, informationSuperlist[i], false);
            height += informationListHeight;

            if (currentY + informationListHeight > this.doc.internal.pageSize.getHeight() - this.margins) {
                this.nextPage();
                currentY = this.margins;
            }

            currentY += this.printInformationList(x, currentY, width, informationSuperlist[i], visible);
        }

        return { height: height, y: currentY };
    }
}

export default ResumeCreator;