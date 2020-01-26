class Study {                                                           //creating a Study class and establishing id, progrm.lang, topic & descrp properties
    constructor(studyJSON) {
        this.id = studyJSON.id
        this.programming_language = studyJSON.programming_language
        this.topic = studyJSON.topic
        this.description = studyJSON.description
        this.objectives = studyJSON.objectives
    }
}

