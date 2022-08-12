const form = document.querySelector("form");
const showTodoList = document.querySelector("#showTodoList");
const templateTodo = document.querySelector("#templateTodo").content
const alertMessage = document.querySelector("#alert-message");



var todos = []


form.addEventListener("submit", e =>{
    e.preventDefault()
    alertMessage.classList.add("d-none")

    const data = new FormData(form)
    const [todo] = [...data.values()];

    if(!todo.trim()){
        alertMessage.classList.remove("d-none")
        return
    }

    addTodo(todo)
    showTodos()
})


const addTodo = (todo) =>{

    const todoObject = {
        name : todo, 
        id : String(Date.now())
    }

    todos.push(todoObject)
}

const showTodos = () =>{
    localStorage.setItem("todos", JSON.stringify(todos));

    showTodoList.textContent = ""
    const fragment = document.createDocumentFragment()
  
    todos.forEach(todo  =>{
        const clone = templateTodo.cloneNode(true)
        clone.querySelector(".lead").textContent = todo.name;
        clone.querySelector(".btn-danger").dataset.id = todo.id;
       

        fragment.appendChild(clone) 
    })

    showTodoList.appendChild(fragment)
}


document.addEventListener("click", (e) =>{
    if (e.target.matches(".btn-danger")) {
        todos = todos.filter((item) => item.id !== e.target.dataset.id )
        showTodos()
    }
  
})

document.addEventListener("DOMContentLoaded", (e) => {
    if (localStorage.getItem("todos")) {
        todos = JSON.parse(localStorage.getItem("todos"));
        showTodos()
    }
});


