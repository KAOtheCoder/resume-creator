import Rect from "./Rect";
import MarginedRect from "./MarginedRect";

class ResumeCreator {
    printText(rect, text) {
        const paragraphs = text.split("\n");
        let y = rect.getY();

        for (let i = 0; i < paragraphs.length; ++i) {
            const lines = this.doc.splitTextToSize(paragraphs[i], rect.getWidth());
            this.doc.text(lines, rect.getX(), y, { align: "justify", baseline: "top", maxWidth: rect.getWidth() });
            y += lines.length * this.doc.getLineHeight();
        }

        return y;
    }

    printKeywords(rect, keywords) {
        const MARGIN = 3;
        const SPACING = 3;
        const RADIUS = 3;

        if (keywords.length === 0)
            return rect.getY();

        const textColor = this.doc.getTextColor();

        this.doc.setTextColor("#3b87b8");

        let x = rect.getX();
        let y = rect.getY();

        for (let i = 0; i < keywords.length; ++i) {
            const textWidth = this.doc.getTextWidth(keywords[i]);

            if (x + textWidth + 2 * MARGIN > rect.getRight()) {
                x = rect.getX();
                y += this.doc.getFontSize() + 2 * MARGIN + SPACING;
            }

            this.doc.setDrawColor(0);
            this.doc.setFillColor("#e1ecf4");
            this.doc.roundedRect(x, y, textWidth + 2 * MARGIN, this.doc.getFontSize() + 2 * MARGIN, RADIUS, RADIUS, "F");
            
            this.doc.text(keywords[i], x + MARGIN, y + MARGIN, { align: "justify", baseline: "top" });
            
            x += textWidth + 2 * MARGIN + SPACING;
        }

        this.doc.setTextColor(textColor);

        return y + this.doc.getFontSize() + 2 * MARGIN;
    }

    printExperience(rect, experience) {
        const SPACING1 = 3;
        const SPACING2 = 5;
        const DATE_WIDTH = 50;
        const DATE_FONT_SIZE = 10;
        const TITLE_FONT_SIZE = 12;
        const TITLE_DESCRIPTION_FONT_SIZE = 11;
        const KEYWORDS_FONT_SIZE = 10;
        const DESCRIPTION_FONT_SIZE = 10;

        const marginedRect = new MarginedRect(rect.getX(), rect.getY(), rect.getWidth(), rect.getHeight(), SPACING2, SPACING2, SPACING2, SPACING2);
        
        const dateRect = new Rect(marginedRect.getContentRect().getX(), marginedRect.getContentRect().getY(), DATE_WIDTH, marginedRect.getContentRect().getHeight());
        this.doc.setFontSize(DATE_FONT_SIZE);
        this.printText(dateRect, experience.getDateStart() + " -\n" + experience.getDateEnd());
        
        const titleRect = new Rect(dateRect.getRight() + SPACING2, marginedRect.getContentRect().getY(), 0, 0);
        titleRect.setRight(marginedRect.getContentRect().getRight());
        const titleTextRect = new Rect(titleRect.getX(), titleRect.getY(), titleRect.getWidth(), titleRect.getHeight());
        
        if (experience.getTitleIcon()) {
            const ICON_SIZE = TITLE_FONT_SIZE + TITLE_DESCRIPTION_FONT_SIZE + SPACING1;
            this.doc.addImage(experience.getTitleIcon(), "png", titleRect.getX(), titleRect.getY(), ICON_SIZE, ICON_SIZE);
            titleTextRect.setX(titleTextRect.getX() + ICON_SIZE + SPACING1);
            titleTextRect.setRight(titleTextRect.getRight());
        }

        this.doc.setFont(this.doc.getFont().fontName, "bold");
        this.doc.setFontSize(TITLE_FONT_SIZE);
        titleRect.setBottom(this.printText(titleTextRect, experience.getTitle()));

        if (experience.getTitleDescription()) {
            const titleDescriptionRect = new Rect(titleTextRect.getX(), titleRect.getBottom() + SPACING1, titleRect.getWidth(), TITLE_DESCRIPTION_FONT_SIZE);
            this.doc.setFont(this.doc.getFont().fontName, "italic");
            this.doc.setFontSize(TITLE_DESCRIPTION_FONT_SIZE);
            titleRect.setBottom(this.printText(titleDescriptionRect, experience.getTitleDescription()));
        }

        if (experience.getTitleLink())
            this.doc.link(titleRect.getX(), titleRect.getY(), titleRect.getWidth(), titleRect.getHeight(), { url: experience.getTitleLink() });

        const keywordsRect = new Rect(titleRect.getX(), titleRect.getBottom() + SPACING1, titleRect.getWidth(), 0);
        this.doc.setFont(this.doc.getFont().fontName, "normal");
        this.doc.setFontSize(KEYWORDS_FONT_SIZE);
        keywordsRect.setBottom(this.printKeywords(keywordsRect, experience.getKeywords()));
        
        const descriptionRect = new Rect(keywordsRect.getX(), keywordsRect.getBottom() + SPACING1, keywordsRect.getWidth(), 0);
        descriptionRect.setBottom(marginedRect.getContentRect().getBottom());
        this.doc.setFontSize(DESCRIPTION_FONT_SIZE);
        descriptionRect.setBottom(this.printText(descriptionRect, experience.getDescription()));

        return descriptionRect.getBottom();
    }
}

export default ResumeCreator;