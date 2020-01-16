
class Study {
    constructor(programming_language, topic, description){
        this.programming_language = programming_language;
        this.topic = topic;
        this.description = description;
    }
}

class Display {
    static displayStudies() {
        // will need to replace hard code by connecting it to studies-api 
        const LoggedStudies = [
            {
            programming_language: 'Ruby',
            topic: 'Arrays',
            description: 'Arrays are collections of data'
            },
            {
            programming_language: 'Javascript',
            topic: 'Classes',
            description: 'Classes are like blueprints for objects'
            }
        ];
        
        const studies = LoggedStudies;

        studies.forEach((study) => Display.addStudyToList(study)); //loop through the studies
    }
    
    static addStudyToList(study) {
        const studyList = document.querySelector('#study-list');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${study.programming_language}</td>
            <td>${study.topic}</td>
            <td>${study.description}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
        `;

        studyList.appendChild(row);
    }
}

document.addEventListener('DOMContentLoaded', Display.displayStudies); //to display all studies 

//to add a study
document.querySelector('#study-form').addEventListener('submit', (e)=> {
    //to prevent actual submit
    e.preventDefault();
    //to get the values from the form
    const programming_language = document.querySelector('#programming-language').value; 
    const topic = document.querySelector('#topic').value; 
    const description = document.querySelector('#description').value; 

    //to instantiate a new study
    const study = new Study(programming_language, topic, description);
    
    //to add it on the page 
    Display.addStudyToList(study);
});