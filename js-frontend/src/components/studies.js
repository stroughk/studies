class Studies {
  constructor() {
    this.studies = [];
    this.adapter = new StudiesAdapter();
    this.initiBindingsAndEventListeners()
    this.fetchAndLoadStudies();

    this.deleteStudy = this.deleteStudy.bind(this);
    this.render = this.render.bind(this);
  }


  initiBindingsAndEventListeners() {
    this.studyForm = document.getElementById('study-form')
    this.newProgrammingLanguage = document.getElementById('programming-language')
    this.newTopic = document.getElementById('topic')
    this.newDescription = document.getElementById('description')

    this.studyForm.addEventListener('submit', this.createStudy.bind(this))    
  }

  createStudy(e) {
    e.preventDefault() 
        
    const programmingLanguageValue = this.newProgrammingLanguage.value
    const topicValue = this.newTopic.value
    const descriptionValue = this.newDescription.value
   
    this.adapter.createStudy(programmingLanguageValue);
    this.adapter.createStudy(topicValue);
    this.adapter.createStudy(descriptionValue);
  
    }
   

  fetchAndLoadStudies() {
    this.adapter
      .getStudies()
      .then(studies => {
        this.studies = studies.map(study => new Study(study));
      })
      .then(() => {
        this.render();
      });
  }

  deleteStudy(id) {

  }

  render() {
    const studyList = document.querySelector("#study-list");
    studyList.innerHTML = '';
    this.studies.forEach(study => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${study.programming_language}</td>
                <td>${study.topic}</td>
                <td>${study.description}</td>`;
      const deleteRow = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.className = "btn btn-danger btn-sm delete";
      deleteButton.innerHTML = "Delete";
      deleteButton.onclick = () => {
        this.adapter.deleteStudy(study.id).then(() => {
          this.fetchAndLoadStudies();
        });
      };
      deleteRow.appendChild(deleteButton);
      row.appendChild(deleteRow);
      studyList.appendChild(row);
    });
  }
}
