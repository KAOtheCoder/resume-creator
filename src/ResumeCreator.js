import Rect from "./Rect";

class ResumeCreator {
    getTextHeight(text, width) {
        if (text.length === 0)
            return 0;

        const paragraphs = text.split("\n");
        let height = 0;

        for (let i = 0; i < paragraphs.length; ++i) {
            const lines = this.doc.splitTextToSize(paragraphs[i], width);
            height += lines.length * this.doc.getLineHeight();
        }

        return height;
    }

    printText(rect, text, visible = true) {
        if (text.length === 0)
            return 0;

        const paragraphs = text.split("\n");
        let y = rect.getY();

        for (let i = 0; i < paragraphs.length; ++i) {
            const lines = this.doc.splitTextToSize(paragraphs[i], rect.getWidth());
            this.doc.text(lines, rect.getX(), y, { align: "justify", baseline: "top", maxWidth: rect.getWidth(), renderingMode: visible ? "fill" : "invisible" });
            y += lines.length * this.doc.getLineHeight();
        }

        return y;
    }

    getKeywordsHeight(keywords, width) {
        const MARGIN = 3;
        const SPACING = 3;

        if (keywords.length === 0)
            return 0;

        let x = 0;
        let lines = 1

        for (let i = 0; i < keywords.length; ++i) {
            const textWidth = this.doc.getTextWidth(keywords[i]);

            if (x + textWidth + 2 * MARGIN > width) {
                x = 0;
                ++lines;
            }

            x += textWidth + 2 * MARGIN + SPACING;
        }

        return lines * (this.doc.getFontSize() + 2 * MARGIN + SPACING) - SPACING;
    }

    printKeywords(rect, keywords, visible = true) {
        const MARGIN = 3;
        const SPACING = 3;
        const RADIUS = 3;

        const textColor = this.doc.getTextColor();

        this.doc.setTextColor("#3b87b8");

        const keywordRectHeight = this.doc.getFontSize() + 2 * MARGIN;
        let x = rect.getX();
        let y = rect.getY();

        for (let i = 0; i < keywords.length; ++i) {
            const keywordRectWidth = this.doc.getTextWidth(keywords[i]) + 2 * MARGIN;

            if (x + keywordRectWidth > rect.getRight()) {
                x = rect.getX();
                y += keywordRectHeight + SPACING;
            }

            if (visible) {
                this.doc.setDrawColor(0);
                this.doc.setFillColor("#e1ecf4");
                this.doc.roundedRect(x, y, keywordRectWidth, keywordRectHeight, RADIUS, RADIUS, "F");
                this.doc.text(keywords[i], x + MARGIN, y + MARGIN, { align: "justify", baseline: "top" });
            }

            x += keywordRectWidth + SPACING;
        }

        this.doc.setTextColor(textColor);

        return y + keywordRectHeight;
    }

    getExperienceHeight(experience, width) {
        const SPACING1 = 3;
        const SPACING2 = 5;
        const DATE_WIDTH = 50;
        const TITLE_FONT_SIZE = 12;
        const TITLE_DESCRIPTION_FONT_SIZE = 11;
        const KEYWORDS_FONT_SIZE = 10;
        const DESCRIPTION_FONT_SIZE = 10;

        const contentWidth = width - DATE_WIDTH - SPACING2;
        let iconSize = 0;
        let titleWidth = contentWidth;
        
        if (experience.getTitleIcon()) {
            iconSize = TITLE_FONT_SIZE + TITLE_DESCRIPTION_FONT_SIZE + SPACING1;
            titleWidth -= iconSize + SPACING1;
        }

        let titleHeight = this.getTextHeight(experience.getTitle(), titleWidth);
        
        if (experience.getTitleDescription()) {
            this.doc.setFont(this.doc.getFont().fontName, "italic");
            this.doc.setFontSize(TITLE_DESCRIPTION_FONT_SIZE);
            titleHeight += SPACING1 + this.getTextHeight(experience.getTitleDescription(), titleWidth);
        }

        let height = Math.max(iconSize, titleHeight);

        if (experience.getKeywords().length > 0) {
            this.doc.setFont(this.doc.getFont().fontName, "normal");
            this.doc.setFontSize(KEYWORDS_FONT_SIZE);
            height += SPACING1 + this.getKeywordsHeight(experience.getKeywords(), contentWidth);
        }

        if (experience.getDescription()) {
            this.doc.setFontSize(DESCRIPTION_FONT_SIZE);
            height += SPACING1 + this.getTextHeight(experience.getDescription(), contentWidth);
        }

        return height;
    }

    printExperience(rect, experience, visible = true) {
        const SPACING1 = 3;
        const SPACING2 = 5;
        const DATE_WIDTH = 50;
        const DATE_FONT_SIZE = 10;
        const TITLE_FONT_SIZE = 12;
        const TITLE_DESCRIPTION_FONT_SIZE = 11;
        const KEYWORDS_FONT_SIZE = 10;
        const DESCRIPTION_FONT_SIZE = 10;

        const dateRect = new Rect(rect.getX(), rect.getY(), DATE_WIDTH, rect.getHeight());
        this.doc.setFont(this.doc.getFont().fontName, "normal");
        this.doc.setFontSize(DATE_FONT_SIZE);
        this.printText(dateRect, experience.getStartDate() + " -\n" + experience.getEndDate(), visible);
        
        const titleRect = new Rect(dateRect.getRight() + SPACING2, rect.getY(), 0, 0);
        titleRect.setRight(rect.getRight());
        const titleTextRect = new Rect(titleRect.getX(), titleRect.getY(), titleRect.getWidth(), titleRect.getHeight());
        
        if (experience.getTitleIcon()) {
            const ICON_SIZE = TITLE_FONT_SIZE + TITLE_DESCRIPTION_FONT_SIZE + SPACING1;
            
            if (visible)
                this.doc.addImage(experience.getTitleIcon(), "png", titleRect.getX(), titleRect.getY(), ICON_SIZE, ICON_SIZE);
            
            titleTextRect.setX(titleTextRect.getX() + ICON_SIZE + SPACING1);
            titleTextRect.setRight(titleTextRect.getRight());
        }

        this.doc.setFont(this.doc.getFont().fontName, "bold");
        this.doc.setFontSize(TITLE_FONT_SIZE);
        titleRect.setBottom(this.printText(titleTextRect, experience.getTitle(), visible));

        if (experience.getTitleDescription()) {
            const titleDescriptionRect = new Rect(titleTextRect.getX(), titleRect.getBottom() + SPACING1, titleRect.getWidth(), TITLE_DESCRIPTION_FONT_SIZE);
            this.doc.setFont(this.doc.getFont().fontName, "italic");
            this.doc.setFontSize(TITLE_DESCRIPTION_FONT_SIZE);
            titleRect.setBottom(this.printText(titleDescriptionRect, experience.getTitleDescription(), visible));
        }

        if (visible && experience.getTitleLink())
            this.doc.link(titleRect.getX(), titleRect.getY(), titleRect.getWidth(), titleRect.getHeight(), { url: experience.getTitleLink() });

        const keywordsRect = new Rect(titleRect.getX(), titleRect.getBottom() + SPACING1, titleRect.getWidth(), 0);
        this.doc.setFont(this.doc.getFont().fontName, "normal");
        this.doc.setFontSize(KEYWORDS_FONT_SIZE);
        keywordsRect.setBottom(this.printKeywords(keywordsRect, experience.getKeywords(), visible));
        
        const descriptionRect = new Rect(keywordsRect.getX(), keywordsRect.getBottom() + SPACING1, keywordsRect.getWidth(), 0);
        descriptionRect.setBottom(rect.getBottom());
        this.doc.setFontSize(DESCRIPTION_FONT_SIZE);
        descriptionRect.setBottom(this.printText(descriptionRect, experience.getDescription(), visible));
    
        return descriptionRect.getBottom();
    }

    printExperienceList(rect, title, experiences, visible = true) {
        const SPACING = 5;

        let y = this.printTitle(rect, title, visible) + SPACING;

        for (let i = 0; i < experiences.length; ++i) {
            y += SPACING;
            let experienceRect = new Rect(rect.getX(), y, rect.getWidth(), rect.getBottom() - y);
            y = this.printExperience(experienceRect, experiences[i], visible);
        }

        return y;
    }

    getTitleHeight(title, width) {
        const SPACING = 5;
        const TITLE_FONT_SIZE = 13;

        this.doc.setFont(this.doc.getFont().fontName, "bold");
        this.doc.setFontSize(TITLE_FONT_SIZE);
        
        return this.getTextHeight(title) + SPACING;
    }

    printTitle(rect, title, visible = true) {
        const SPACING = 5;
        const TITLE_FONT_SIZE = 13;

        this.doc.setFont(this.doc.getFont().fontName, "bold");
        this.doc.setFontSize(TITLE_FONT_SIZE);
        const y = this.printText(rect, title, visible) + SPACING;

        if (visible)
            this.doc.line(rect.getX(), y, rect.getRight(), y);
        
        return y;
    }
}

export default ResumeCreator;