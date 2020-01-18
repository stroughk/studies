class StudiesAdapter {
    constructor() {
        this.baseUrl = 
        'http://localhost:3000/api/v1/studies'  //when we instantiate the adapter, it will make a request to the base url
    }

    getStudies() {
        return fetch(this.baseUrl).then(res => res.json() //when it fetches the base url it will parse the json
        )
    }
}

