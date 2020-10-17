class Experience {
    constructor(title, description, dateStart, dateEnd, titleIcon = null, titleDescription = "", titleLink = "", keywords = []) {
        this.title = title;
        this.description = description;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.titleIcon = titleIcon;
        this.titleDescription = titleDescription;
        this.titleLink = titleLink;
        this.keywords = keywords;
    }

    getTitle() { return this.title; }
    getDescription() { return this.description; }
    getDateStart() { return this.dateStart; }
    getDateEnd() { return this.dateEnd; }
    getTitleIcon() { return this.titleIcon; }
    getTitleDescription() { return this.titleDescription; }
    getTitleLink() { return this.titleLink; }
    getKeywords() { return this.keywords; }
}

export default Experience;