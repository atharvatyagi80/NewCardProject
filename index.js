//creating taskContainer which imports parent element of HTMl
const taskContainer = document.querySelector("#taskContainerRow");
console.log(taskContainer);
//creating HTMl code to be exported in HTML
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



const saveChanges = ()=>{
    const taskData = {
        id: `${Date.now()}`,
        imageUrl:document.getElementById("imageUrl").value,
        taskTitle: document.getElementById("taskTitle").value,
        taskType: document.getElementById("taskType").value,
        taskDescription: document.getElementById("taskDescription").value,
    };

    const createNewCard = newCard(taskData);
    taskContainer.insertAdjacentHTML("beforeend",createNewCard);
}
