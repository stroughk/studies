class StudiesAdapter {
    constructor() {
        this.baseUrl = 
        'http://localhost:3000/api/v1/studies'  //when we instantiate the adapter, it will make a request to the base url
    }

    getStudies() {                                          //this is an instance method that we can call and it will get the studies out of the database
        return fetch(this.baseUrl).then(res => res.json())  //this makes a fetch request to base url, then parse the json of the response
    }


    createStudy(studyObj) {
   
        let configObject = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(studyObj)
    };
        return fetch(this.baseUrl, configObject)                //need to make a fetch request to our base URL
        .then(function(res) { //
            return res
        
        })

    }



    deleteStudy(id) {
        return fetch(`${this.baseUrl}/${id}`, {
            method: 'DELETE'
        }).then(res => res.json())
    }
}

