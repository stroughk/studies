class Studies {
  constructor() {
    this.objectives = []
    this.studies = [];                          //set a new property of studies
    this.adapter = new StudiesAdapter();        //create a new adapter
    this.initiBindingsAndEventListeners()       //invoke a method to bind event listeners
    this.fetchAndLoadStudies();                 //invoke a method to fetch and load studies, will use the this.adapter

    this.deleteStudy = this.deleteStudy.bind(this);
    this.render = this.render.bind(this);
  }


  initiBindingsAndEventListeners() {                  //this method is so we don't have to grab the DOM element every time, it saves it in this function  
    this.studyForm = document.getElementById('study-form')
    this.newProgrammingLanguage = document.getElementById('programming-language')
    this.newTopic = document.getElementById('topic')
    this.newDescription = document.getElementById('description')

    // add objectives features
    this.objectiveList = document.getElementById('objective-list');
    this.objectiveText = document.getElementById('objective-value');
    this.objectiveAddButton = document.getElementById('add-objective');
    this.objectiveAddButton.addEventListener('click', this.addObjective.bind(this));

    this.studyForm.addEventListener('submit', this.createStudy.bind(this))    
  }

  addObjective(e){
    e.preventDefault()
    let objective = this.objectiveText.value
    this.objectives.push(objective)
    // reset text
    this.objectiveText.value = ""
    // render objective list
    this.renderObjectives();
    
  }
  createStudy(e) {                                                  //function to create a new study
    e.preventDefault()                                              //prevent the automatic refresh of the page
     const study = {
            programming_language: this.newProgrammingLanguage.value,
            topic: this.newTopic.value,
            description:this.newDescription.value,
            objectives : this.objectives
        };
       
          this.adapter.createStudy(study).then(res => {             
             let status = res.status
      
             if (status==200){
               res.json().then(data=>{
                   this.objectives = []; // reset
                   this.renderObjectives();
                   this.studies.push(new Study(data))
                   this.render()
                   e.target.reset() // form reset/clear
               })
             }else{
               res.json().then(data=>{
                 alert(data.message)
               })
             }
               
        }).catch(error => {
          console.log(error);
        })
    }
   

  fetchAndLoadStudies() {                                       //this is the method to make a call to the backend api
    this.adapter                                                //it uses the this.adapter which is an instance of our adapter to get the studies
      .getStudies()                                             //gets the studies
      .then(studies => {                                        //which returns a promise
        this.studies = studies.map(study => new Study(study));  //we iterate over the studies and pushing a new Study instance in the empty array
      })
      .then(() => {                                             //return another promise 
        this.render();                                          //calls the render method below
      });
  }

  deleteStudy(id) {

  }
  
  renderObjectives(){
    const objList= document.getElementById('objectives-list')
    objList.innerHTML='';
    this.objectives.forEach(objective => {
      let row = document.createElement("div");
      row.innerHTML = `
      <p>${objective}</p>
      ` 
      objList.appendChild(row);
    }) 
  }
  render() {                                                    //after we receive all the studies from rails api, we render
    const studyList = document.querySelector("#study-list");    //find study-list from index.html and add it to a variable
    studyList.innerHTML = '';                                   //append the sudy  list and append it to the DOM
    this.studies.forEach(study => {                             //since studies is an array, can itirate over each study and pushing it
      const row = document.createElement("tr");
      let objectives = "<ul>";
      
      if (study.objectives){
        study.objectives.forEach(obj=>{
          objectives += `<li>${obj.title}</li>`
        })
      }
      objectives += '</ul>'

                       //into the newly created row according to its properties
      row.innerHTML = `
                <td>${study.programming_language}</td>          
                <td>${study.topic}</td>
                <td>${study.description}</td>
                <td>${objectives}</td>`;
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
