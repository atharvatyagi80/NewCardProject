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
                        <button type="button" class="btn btn-outline-success">
                            <i class="fa-solid fa-pencil"></i>
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
