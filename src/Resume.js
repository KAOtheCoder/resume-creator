class Resume {
    constructor(name, brief = "", experienceSuperlist = [], informationSuperlist = []) {
        this.name = name;
        this.brief = brief;
        this.experienceSuperlist = experienceSuperlist;
        this.informationSuperlist = informationSuperlist;
    }
}

class ExperienceList {
    constructor(title, experiences = []) {
        this.title = title;
        this.experiences = experiences;
    }
}

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
}

class InformationList {
    constructor(title, informations = []) {
        this.title = title;
        this.informations = informations;
    }
}

class Information {
    constructor(key, rating = -1, description = "") {
        this.key = key;
        this.rating = rating;
        this.description = description;
    }
}

export {
    Resume,
    ExperienceList,
    Experience,
    InformationList,
    Information
}