// get The Items
let plus=document.querySelector(".plus");
let input=document.querySelector("input");
let tasks=document.querySelector(".tasks");
let completed= document.querySelector(".Completed span");
let tasksNo=document.querySelector(".tasks-no span");
let arrayTask=[];

// get the local storage items to page and put them in arrayTask
window.onload=function(){
  input.focus();
  if(window.localStorage.getItem("tasks")){
    console.log(JSON.parse(window.localStorage.getItem("tasks")).length);
    for(let o=0; o<JSON.parse(window.localStorage.getItem("tasks")).length ;o++){
    createElementsFromLocal(JSON.parse(window.localStorage.getItem("tasks"))[o]);
    arrayTask.push(JSON.parse(window.localStorage.getItem("tasks"))[o]);
    }
  }
}

// add tasks to page
plus.onclick=function(){
    if(!input.value == ""){
       for(let a=0; a<tasks.children.length ;a++){
        if(tasks.children[a].firstChild.textContent == input.value){
         return swal({
            text: "This exists",
            className:"swal5",
           });
        }
       }
        create();
        input.value="";
    }else{
      swal({
        text: "You must write a task.",
        className:"swal",
        button:"yes"
      });
    }
    }
    // create elements
    
function create(){
  if(document.querySelector(".there-are-no-tasks")){
   document.querySelector(".there-are-no-tasks").remove();
  }else if(document.querySelector(".no-taks")){
    document.querySelector(".no-taks").remove();
  }
 let task =document.createElement("div");
 task.textContent=input.value;
 task.className="task-name";
 let emptyDiv=document.createElement("div");
 emptyDiv.style.cssText="margin-bottom: -11px;"
//  task.style.cssText ="width: 685px; height: 80px; border: 10px solid rgb(158 158 158 / 8%); background-color: #ffc0cb1f; height:60px; line-height: 39px; cursor:pointer; margin-bottom: 4px; padding-left: 11px;"
 let del=document.createElement("button");
 del.appendChild(document.createTextNode("DELETE"));
 del.style.cssText="position: relative;bottom: 46px;;right:8px;float:right; color: white;background-color: gray;border: grey 1px solid;border-radius: 12px; width: 82px; height: 23px;"
 emptyDiv.appendChild(task);
 emptyDiv.appendChild(del);
 tasks.appendChild(emptyDiv);
  let array=Array.from(tasks.children);
  arrayTask.push(task.textContent);
  window.localStorage.setItem("tasks",JSON.stringify(arrayTask));
  console.log(JSON.parse(window.localStorage.getItem("tasks")).length);
  console.log(JSON.parse(window.localStorage.getItem("tasks")).length);
tasksNo.innerHTML=parseInt(tasksNo.innerHTML)+1;
for(let i=0; i<array.length; i++){
  document.querySelectorAll(".task-name")[i].onclick=function(){
    if(!this.classList.contains("finish")){
     this.classList.add("finish");
     this.style.cursor="not-allowed";
     completed.innerHTML=parseInt(completed.innerHTML)+1
    }else{
      this.classList.remove("finish");
      this.style.cursor="pointer";
      completed.innerHTML=parseInt(completed.innerHTML)-1
    }
  }
  deleted(del);
 
}
}

function deleted(item){
  item.onclick=function(){
  item.parentElement.remove();
  console.log(`yhis is no${arrayTask.indexOf(item.previousSibling.innerHTML)}`);
  arrayTask.splice(arrayTask.indexOf(item.previousSibling.innerHTML),1);
  console.log(arrayTask)
  tasksNo.innerHTML=parseInt(tasksNo.innerHTML)-1
  for(let d=0; d<JSON.parse(window.localStorage.getItem("tasks")).length;d++){
  if(JSON.parse(window.localStorage.getItem("tasks"))[d] == item.previousSibling.innerHTML){
    window.localStorage.setItem("tasks",JSON.stringify(arrayTask));
    window.localStorage.getItem("tasks");
  }
  }
  check();
  }
}


function check(){
if(tasks.children.length == 0){
  completed.innerHTML=parseInt(completed.innerHTML)-parseInt(completed.innerHTML);
  noTasks();
}else{
  console.log("no")
}
}


function noTasks(){
  let div=document.createElement("div");
  div.className="no-taks";
  div.textContent="There are no tasks";
  // div.style.cssText="width: 685px; height: 80px; border: 10px solid rgb(158 158 158 / 8%); background-color: #ffc0cb1f; height:60px; line-height: 39px; cursor:pointer; margin-bottom: 4px; padding-left: 11px;"
  tasks.appendChild(div);
}


document.querySelector(".Complete-all").onclick=function(){
  for(let b=0; b<tasks.children.length; b++){
     if(!tasks.children[b].firstChild.classList.contains("finish")){
      tasks.children[b].firstChild.classList.add("finish");
      completed.innerHTML=tasks.children.length
     }
  }
}

document.querySelector(".delete-all").onclick=function(){
  for(let d=tasks.children.length; d>0; d--){
    tasks.children[0].remove();
    tasksNo.innerHTML=0;
    completed.innerHTML=0;
    window.localStorage.removeItem("tasks");
    arrayTask=[];

   
}
}

function createElementsFromLocal(item){
  if(document.querySelector(".there-are-no-tasks")){
    document.querySelector(".there-are-no-tasks").remove();
   }else if(document.querySelector(".no-taks")){
     document.querySelector(".no-taks").remove();
   }
  let task =document.createElement("div");
  task.textContent=item;
  task.className="task-name";
  let emptyDiv=document.createElement("div");
  emptyDiv.style.cssText="margin-bottom: -11px;"
  // task.style.cssText ="width: 685px; height: 80px; border: 10px solid rgb(158 158 158 / 8%); background-color: #ffc0cb1f; height:60px; line-height: 39px; cursor:pointer; margin-bottom: 4px; padding-left: 11px;"
  let del=document.createElement("button");
  del.appendChild(document.createTextNode("DELETE"));
  del.style.cssText="position: relative;bottom: 46px;float:right; color: white;background-color: gray;border: grey 1px solid;border-radius: 12px; width: 82px; height: 23px;"
  emptyDiv.appendChild(task);
  emptyDiv.appendChild(del);
  tasks.appendChild(emptyDiv);
  tasksNo.innerHTML=parseInt(tasksNo.innerHTML)+1;
  let array=Array.from(tasks.children);
  for(let i=0; i<array.length; i++){
   document.querySelectorAll(".task-name")[i].onclick=function(){
    if(!this.classList.contains("finish")){
     this.classList.add("finish");
     this.style.cursor="not-allowed";
     completed.innerHTML=parseInt(completed.innerHTML)+1
    }else{
      this.classList.remove("finish");
      this.style.cursor="pointer";
      completed.innerHTML=parseInt(completed.innerHTML)-1
    }
  }
  deleted(del);
}}

