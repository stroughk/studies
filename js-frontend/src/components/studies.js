class Studies {
  constructor() {
    this.studies = [];
    this.adapter = new StudiesAdapter();
    //this.bindEventListeners()
    this.fetchAndLoadStudies();

    this.deleteStudy = this.deleteStudy.bind(this);
    this.render = this.render.bind(this);
  }

  fetchAndLoadStudies() {
    this.adapter
      .getStudies()
      .then(studies => {
          /*
        studies.forEach(study => {
            this.studies.push(new Study(study))
        });
        */
        this.studies = studies.map(study => new Study(study));
      })
      .then(() => {
        this.render();
      });
  }

  deleteStudy(id) {
    console.log("got hereee", id);
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
