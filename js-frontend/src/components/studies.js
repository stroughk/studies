class Studies {
    constructor() {
        this.studies = []
        this.adapter = new StudiesAdapter()
        //this.bindEventListeners()
        this.fetchAndLoadStudies()
    }

    fetchAndLoadStudies() {
        this.adapter
        .getStudies()
        .then(studies => {
            studies.forEach(study => this.studies.push(new Study(study)))
            console.log(this.studies)
        })
        .then(() => {
            this.render()
        })
    }

    render() {
        const studiesContainer = document.getElementById('studies-container')
        studiesContainer.innerHTML = 'my studies here'

    }
}

