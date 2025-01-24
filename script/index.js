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

const doTask = document.getElementById("doTask")
const doingTask = document.getElementById("doingTask")
const doneTask = document.getElementById("doneTask")
async function fetchtareas() {
    try {
        const response = await fetch("http://localhost:3000/tareas");
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}
const div = document.createElement("div");
div.classList.add("target");
const tareas = await fetchtareas();
if (!tareas) {
    doTask.innerHTML = "<div>No tiene tareas pendientes";
    return;
} if (tareas.task === 1) {
    div.innerHTML = `
    <div>
    <h1>${tareas.titulo}</h1>
    <p>${tareas.descripcion}</p>
    <p>${tareas.fechaInicio}</p>
    <p>${tareas.fechaFin}</p>
    <div class="botonesTarget">
        <button id="modificar"><img src="img/icons8-editar.svg" alt="Modificar"></button>
        <button id="cambiarEstado"><img src="img/swap-svgrepo-com.svg" alt="Cambiar estado"></button>
        <button id="eliminar"><img src="img/close-svgrepo-com.svg" alt="Eliminar"></button>
        </div>
        </div>
                `;
    doTask.appendChild(div);

} else if (tareas.task === 2) {
    div.innerHTML = `
    <div>
    <h1>${tareas.titulo}</h1>
    <p>${tareas.descripcion}</p>
    <p>${tareas.fechaInicio}</p>
    <p>${tareas.fechaFin}</p>
    <div class="botonesTarget">
        <button id="modificar"><img src="img/icons8-editar.svg" alt="Modificar"></button>
        <button id="cambiarEstado"><img src="img/swap-svgrepo-com.svg" alt="Cambiar estado"></button>
        <button id="eliminar"><img src="img/close-svgrepo-com.svg" alt="Eliminar"></button>
        </div>
        </div>
                `;
    doingTask.appendChild(div);

}else if (tareas.task === 2) {
    div.innerHTML = `
    <div>
    <h1>${tareas.titulo}</h1>
    <p>${tareas.descripcion}</p>
    <p>${tareas.fechaInicio}</p>
    <p>${tareas.fechaFin}</p>
    <div class="botonesTarget">
        <button id="modificar"><img src="img/icons8-editar.svg" alt="Modificar"></button>
        <button id="cambiarEstado"><img src="img/swap-svgrepo-com.svg" alt="Cambiar estado"></button>
        <button id="eliminar"><img src="img/close-svgrepo-com.svg" alt="Eliminar"></button>
        </div>
        </div>
                `;
    doneTask.appendChild(div);

}
