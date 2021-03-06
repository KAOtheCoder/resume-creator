class Resume {
    constructor(
        name, 
        photo = "",
        brief = "", 
        experienceSuperlist = [], 
        informationSuperlist = []) 
    {
        this.name = name;
        this.photo = photo;
        this.brief = brief;
        this.experienceSuperlist = experienceSuperlist;
        this.informationSuperlist = informationSuperlist;
    }
}

class ExperienceList {
    constructor(header, experiences = []) {
        this.header = header;
        this.experiences = experiences;
    }
}

class Experience {
    constructor(
        header, 
        description, 
        startDate = null,
        endDate = null,
        headerIcon = "", 
        headerDescription = "", 
        headerLink = "", 
        tags = []) 
    {
        this.header = header;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.headerIcon = headerIcon;
        this.headerDescription = headerDescription;
        this.headerLink = headerLink;
        this.tags = tags;
    }
}

class InformationList {
    constructor(header, informations = []) {
        this.header = header;
        this.informations = informations;
    }
}

class Information {
    constructor(key, rating = -1, value = "") {
        this.key = key;
        this.rating = rating;
        this.value = value;
    }
}

export {
    Resume,
    ExperienceList,
    Experience,
    InformationList,
    Information
}