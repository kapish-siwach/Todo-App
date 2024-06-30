let form = document.getElementById('form');
let task = document.getElementById('task');
let date = document.getElementById('date');
let desc = document.getElementById('description');
let add = document.getElementById('addtask');
let cancel = document.getElementById('cancel');
let msg = document.getElementById('msg')
let taskdiv = document.getElementById('taskarea');



// Input validation
 form.addEventListener("submit",(e)=>{
    e.preventDefault();
    taskempty();
});
// Task empty
    let  taskempty= ()=>{
    if(task.value === ""){
        console.log("failure")
        msg.innerHTML="**Task cannot be empty**";
    }
    else{
        console.log("success");
        msg.innerHTML="";
        acceptData();
        showTask();
        add.setAttribute("data-bs-dismiss","modal");
        add.click( ()=>{
            add.setAttribute("data-bs-dismiss","modal");

        });
    }
};

let resetForm=()=>{
    task.value="";
    date.value="";
    desc.value="" ;  
}

// Store Data 
let data=[];
let acceptData=()=>{
    data.push({
        task:task.value,
        date:date.value,
        desc:desc.value,
    });
    localStorage.setItem("data",JSON.stringify(data));
    console.log(data);

};

// delete task
let deleteTask=(e)=>{ 
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data",JSON.stringify(data));
    showTask();
};

// Edit task
let editTask=(e)=>{
    let selectedTask=e.parentElement.parentElement;
    task.value=selectedTask.children[0].innerHTML;
    date.value=selectedTask.children[1].innerHTML;
    desc.value=selectedTask.children[2].innerHTML;
    deleteTask(e);
}



// Show Task 
let showTask = () => {
    taskdiv.innerHTML = "";
    data.forEach((taskData, idx) => {
        taskdiv.innerHTML += `
            <div id="${idx}" class="taskdiv">
                <span class="fw-bold">${taskData.task}</span>
                <span class="small text-secondary">${taskData.date}</span>
                <p>${taskData.desc}</p>
                <div class="options">
                    <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#formModal" class="fa-solid fa-pen-to-square"></i>
                    <i onClick="deleteTask(this);" class="fas fa-trash-alt"></i>
                </div>
            </div>
        `;
    });
    resetForm();
};

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    showTask();
    })(); 


