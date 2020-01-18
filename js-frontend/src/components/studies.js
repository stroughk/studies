class Studies {
    constructor() {
        this.studies = []
        this.adapter = new StudiesAdapter()
        //this.bindEventListeners()
        this.fetchAndLoadStudies()
    }

    fetchAndLoadStudies() {
        this.adapter.getStudies().then(studies => {
            console.log(studies)
        })
    }
}

