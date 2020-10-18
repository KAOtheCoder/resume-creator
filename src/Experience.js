class Experience {
    constructor(title, description, startDate, endDate, titleIcon = null, titleDescription = "", titleLink = "", keywords = []) {
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.titleIcon = titleIcon;
        this.titleDescription = titleDescription;
        this.titleLink = titleLink;
        this.keywords = keywords;
    }

    getTitle() { return this.title; }
    getDescription() { return this.description; }
    getStartDate() { return this.startDate; }
    getEndDate() { return this.endDate; }
    getTitleIcon() { return this.titleIcon; }
    getTitleDescription() { return this.titleDescription; }
    getTitleLink() { return this.titleLink; }
    getKeywords() { return this.keywords; }
}

export default Experience;