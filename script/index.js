const addTask = document.getElementById("addTask")
const closeModal = document.getElementById("close")
const modalTask = document.getElementById("modalAddTask")
addTask.addEventListener("click", () => {
    modalTask.show()
    const form = document.getElementById("formulary")
    const Alldatos = (event) => {
        event.preventDefault();

        const datos = new FormData(event.target);
        const tareas = Object.fromEntries(datos.entries());
        form.reset();
        if (tareas == "") {
            return tareas;
        } else {
            alert("ingrese una tarea")
        }

    }

    const postData = async (nuevasTareas) => {
        try {
            const response = await fetch("http://localhost:3000/tareas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevasTareas)
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                const { nombre, descripcion, fechaInicio, fechaFin, task } = jsonResponse
                console.log("tareas guardadas", jsonResponse)


            }


        } catch (Error) {
            console.log(Error)
        }
    }
    form.addEventListener("submit", (event) => {
        const nuevasTareas = Alldatos(event);
        if (nuevasTareas) {
            postData(nuevasTareas)
            alert("Tarea registrada.");
        }

    });
    closeModal.addEventListener("click", () => {

        modalTask.close()
    })




}
)


const registrarse = document.getElementById("registrarse")

registrarse.addEventListener("click", () =>{
    window.location.href = "registro.html"

})








const modalLogin=document.getElementById("modalLogin")
const login= document.getElementById("iniciarSesion")
const cerrar = document.getElementById("Cerrar")
login.addEventListener("click", () =>{ 
    modalLogin.show()
    
    cerrar.addEventListener("click", (event)=>{
    
            modalLogin.close();
    })



    document.getElementById('LoginModal').addEventListener('submit', async function (e) {
        e.preventDefault();
        const email = document.getElementById('emailLogin').value;
        const password = document.getElementById('passwordLogin').value;
        await loginModal(email, password, modalLogin);
        
      });
    const loginModal = async (email, password, modal) => {
        try {
          const response = await fetch("http://localhost:3000/usuarios");
          const users = await response.json();
          const user = users.find((u) => u.email === email);
          console.log(users)
    
          if (!user) {
            alert('Usuario no encontrado');
          }
    
          if (user.password !== password) {
            alert('Contraseña incorrecta');
          } else if(user.password===password){
            alert('¡Ingreso exitoso!');
            modal.close();
            localStorage.setItem('user', JSON.stringify(user));
            window.location.reload();}
    
          
    
        } catch (error) {
          
            console.log(error)
        }
      };
    
      window.addEventListener("load", () => {
        const user = JSON.parse(localStorage.getItem("user"));
        Object.values(user)
        if (user) {
          const login= document.getElementById("login");
          login.innerHTML = `${user.nombre} <br><button id="salir">Salir</button>`;
          const salir = document.getElementById("salir");
          
          salir.addEventListener("click", () => {
            localStorage.clear();  
            alert("Se ha cerrado sesión");
            window.location.reload();  
          });
        
        }
      });

})


const doTask = document.getElementById("doTask")
const doingTask = document.getElementById("doingTask")
const doneTask = document.getElementById("doneTask")
function loadTasks() {
    fetch("http://localhost:3000/posts")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((task) => addElementos(task));
      })
      .catch((error) =>
        console.error("Error al cargar tareas desde el servidor:", error)
      );
  }
  
    loadTasks();
    
    function saveTasks(tasks) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
  formu.addEventListener("submit", (event) => {
    event.preventDefault();
  
    const task = document.getElementById("task").value.trim();
  
    if (task) {
      fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task, completed: false }),
      })
        .then((response) => response.json())
        .then((data) => {
          const taskWithId = {
            id: data.id,
            tipo: data.task,
            titulo: data.nombre,
            descripcion: data.descripcion,
            fechaFin: data.fechaFin,
            fechaInicio: data.fechaInicio
          };
          tasks.push(taskWithId);
          saveTasks(tasks);
          addElementos(taskWithId);
        })
        .catch((error) =>
          console.error("Error al agregar tarea al servidor:", error)
        );
    } else {
      alert("Error. La tarea no se pudo realizar.");
    }
  
    document.getElementById("task").value = "";
  });
  
  function addElementos(taskWithId) {
    const div = document.createElement("div");
    div.classList.add("newTask");
  
    
  
    div.innerHTML = `
    <div class=target>
    <h1>${titulo}</h1>
    <p>${descripcion}</p>
    <p>${fechaInicio}</p>
    <p>${fechaFin}</p>
    <div class="botonesTarget">
        <button id="modificar"><img src="img/icons8-editar.svg" alt="Modificar"></button>
        <button id="cambiarEstado"><img src="img/swap-svgrepo-com.svg" alt="Cambiar estado"></button>
        <button id="eliminar"><img src="img/close-svgrepo-com.svg" alt="Eliminar"></button>
        </div>
    </div>
    `;
  
    boxTask.appendChild(div);
  
    const deleteButton = div.document.getElementById("eliminar");
    deleteButton.addEventListener("click", () => {
      const taskIndex = tasks.findIndex((task) => task.id === taskWithId.id);
      if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
      }
      saveTasks(tasks);
      div.remove();
  
      fetch(`http://localhost:3000/posts/${taskWithId.id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => console.log("Tarea eliminada del servidor:", data))
        .catch((error) =>
          console.error("Error al eliminar tarea del servidor:", error)
        );
    });
  
    const doneButton = div.querySelector(".done");
    doneButton.addEventListener("click", () => {
      const taskText = div.querySelector("p");
      taskText.classList.toggle("completed");
  
      fetch(`http://localhost:3000/posts/${taskWithId.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !taskWithId.completed }),
      })
        .then((response) => response.json())
        .then((data) => {
          taskWithId.completed = !taskWithId.completed;
        })
        .catch((error) =>
          console.error("Error al actualizar tarea en el servidor:", error)
        );
    });
  }