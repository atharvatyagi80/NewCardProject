//creating global array to store our task data
const globalArray = [];


//fucntion to link the stored data with cards
const loadInitialTaskCard=()=>{
    //accessing local storage
    const getInitalData = localStorage.getItem("tasky");
    //convert stringified object again to object
    const {cards} = JSON.parse(getInitalData);
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
                        <button type="button" class="btn btn-outline-danger">
                            <i class="fa-solid fa-trash"></i>
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
