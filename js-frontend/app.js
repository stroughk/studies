
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

        studies.forEach((study) => Display.addStudyToList(study));
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

document.addEventListener('DOMContentLoaded', Display.displayStudies);