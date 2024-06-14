//creating global array to store our task data
let globalArray = [];

//fucntion to link the stored data with cards
const loadInitialTaskCard=()=>{
    //accessing local storage and converting stringified object again to normal object
    const {cards} = JSON.parse(localStorage.tasky);
    if(!cards) return;
    //map each value of globalArray to card
    cards.map((cardObject)=>{
        const createNewCard = newCard(cardObject);
        taskContainer.insertAdjacentHTML("beforeend",createNewCard);
        globalArray.push(cardObject);
    });
}

//HTML Code Section
//varaible getting parent element where we want to put our HTML code
const taskContainer = document.querySelector("#taskContainerRow");
//function call HTMl code
const newCard=(
    {id,
    imageUrl,
    taskTitle,
    taskType,
    taskDescription}
) =>`<div class="col-md-4 mt-4" id=${id}>
                <div class="card text-center">
                    <div class="card-header d-flex justify-content-end gap-2">
                        <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#editModal" id=${id} onclick="editCard.apply(this,arguments)">
                            <i class="fa-solid fa-pencil" id=${id}></i>
                        </button>
                        <button type="button" class="btn btn-outline-danger" id=${id} onclick="deleteCard.apply(this,arguments)">
                            <i class="fa-solid fa-trash"  id=${id}></i>
                        </button>
                    </div>
                    <div class="card-body flex-column justify-content-start">
                        <h3 class="taskTitle">${taskTitle}</h1>
                        <img class="image rounded" src=${imageUrl}>
                      <p class="card-text">${taskDescription}</p>
                      <span class="badge text-bg-warning">${taskType}</span>
                    </div>
                    <div class="card-footer text-body-secondary d-flex justify-content-end">
                        <button type="button" class="btn btn-outline-dark">Open Task</button>
                    </div>
                  </div>
            </div>`


//Save Changes function for save change button
const saveChanges = ()=>{

    //getting data that has been entered
    const taskData = {
        id: `${Date.now()}`,
        imageUrl:document.getElementById("imageUrl").value,
        taskTitle: document.getElementById("taskTitle").value,
        taskType: document.getElementById("taskType").value,
        taskDescription: document.getElementById("taskDescription").value,
    };

    //creating card through the data
    const createNewCard = newCard(taskData);
    taskContainer.insertAdjacentHTML("beforeend",createNewCard);

    //saving data to local storage
    //passing taskData as parameter to store it inside globalArray
    globalArray.push(taskData);
    //now storing globalArray inside local Storage by local storage API
    //tasky is a key of key value pair
    //we storing cards where each index of cards contains globalArray
    //localStorage.setItem("tasky",{cards:globalArray});
    //but we need to convert it to string as well
    localStorage.setItem("tasky",JSON.stringify({cards:globalArray}));

}
//delete card method
const deleteCard = (event) =>{
    //the first step is to get the ID of the card
    //the unique ID have to be there at the tag we want to access
    event=window.event;
    const targetId = event.target.id;
    const tagname = event.target.tagName;
    //searching ID and remove matches
    const newUpdatedArray = globalArray.filter(
        (cardObject) => cardObject.id!==targetId
    );
    //updating global array inside local storage
    globalArray=newUpdatedArray;
    localStorage.setItem("tasky", JSON.stringify({cards:globalArray}));
    //removing the card
    if(tagname=="BUTTON"){
        return taskContainer.removeChild(
            event.target.parentNode.parentNode.parentNode
        );
    }
    return taskContainer.removeChild(
        event.target.parentNode.parentNode.parentNode.parentNode
    );
};

//container for modal
const modalContainer = document.querySelector("#modalDialog");
//html code for editModal
const newModal=(
    {id,
    imageUrl,
    taskTitle,
    taskType,
    taskDescription}
) =>`<div>
        <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Task</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Image URL</label>
                  <input type="email" placeholder="https://example.com/image1.png" class="form-control" id="imageUrl" aria-describedby="emailHelp" value=${imageUrl}>
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label" >Task Title</label>
                  <input type="email" placeholder="Task1" class="form-control" id="taskTitle" aria-describedby="emailHelp" value=${taskTitle}>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Task Type</label>
                    <input type="email" placeholder="Work" class="form-control" id="taskType" aria-describedby="emailHelp" value=${taskType}>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">taskDescription</label>
                    <textarea rows="6" class="form-control" placeholder="This task is all about..." aria-label="With textarea" id="taskDescription">${taskDescription}</textarea>
                </div>
              </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="saveChanges()">Save changes</button>
        </div>
      </div>
      </div>`


//edit card method
const editCard= (event) =>{
    event=window.event;
    const targetId = event.target.id;
    console.log(targetId);
    console.log(globalArray);
    let editCardData;
    //const exists = globalArray.some(cardObject => cardObject.id === targetId);
    globalArray.forEach(cardObject =>{
        if(cardObject.id===targetId){
            editCardData={
                id: cardObject.id,
                imageUrl: cardObject.imageUrl,
                taskTitle: cardObject.taskTitle,
                taskType: cardObject.taskType,
                taskDescription: cardObject.taskDescription,
            };
        }
    })
    console.log(editCardData);

    const modalExist = document.querySelector("#modalDialog");
    console.log(modalExist);
    
    const createModalContainer = newModal(editCardData);
    modalContainer.insertAdjacentHTML("afterend", createModalContainer);

};


