document.addEventListener("DOMContentLoaded", function () {
    const formAgregarTarea = document.getElementById("formAgregarTarea");
    const listaDeTareas = document.getElementById("listaDeTareas");
    const listaDeTareasEliminadas = document.getElementById("listaDeTareasEliminadas");
    const listaDeTareasTerminadas = document.getElementById("listaDeTareasTerminadas");
    const botonBorrarLocalStorage = document.getElementById("borrarLocalStorage");

    cargarTareas();

    formAgregarTarea.addEventListener("submit", function (event) {
        event.preventDefault();
        agregarTarea();
    });

    function agregarTarea() {
        const nuevaTareaTexto = document.getElementById("nuevaTarea").value;

        if (nuevaTareaTexto === "") {
            alert("No ha ingresado texto para nueva tarea");
            return;
        }

        crearTarea(nuevaTareaTexto, "pendiente");
        document.getElementById("nuevaTarea").value = "";
        guardarTareas();
    }

    function crearTarea(text, estado) {
        const nuevaTarea = document.createElement("li");
        nuevaTarea.textContent = text + " ";

        if (estado === "pendiente") {
            const eliminarTarea = document.createElement("button");
            eliminarTarea.textContent = "Eliminar";
            eliminarTarea.onclick = function () {
                nuevaTarea.remove();
                listaDeTareasEliminadas.appendChild(nuevaTarea);
                nuevaTarea.innerHTML = text; // Elimina botones al mover
                guardarTareas();
            };

            const terminarTarea = document.createElement("button");
            terminarTarea.textContent = "Completar";
            terminarTarea.onclick = function () {
                nuevaTarea.remove();
                listaDeTareasTerminadas.appendChild(nuevaTarea);
                nuevaTarea.innerHTML = text; // Elimina botones al mover
                guardarTareas();
            };

            const editarTarea = document.createElement("button");
            editarTarea.textContent = "Editar";
            editarTarea.onclick = function () {
                const nuevoTexto = prompt("Edita la tarea:", text);
                if (nuevoTexto !== null && nuevoTexto !== "") {
                    text = nuevoTexto;
                    nuevaTarea.firstChild.textContent = nuevoTexto + " ";
                    guardarTareas();
                }
                // 
            };

            nuevaTarea.appendChild(eliminarTarea);
            nuevaTarea.appendChild(terminarTarea);
            nuevaTarea.appendChild(editarTarea);
        }

        if (estado === "pendiente") {
            listaDeTareas.appendChild(nuevaTarea);
        } else if (estado === "terminada") {
            listaDeTareasTerminadas.appendChild(nuevaTarea);
        } else if (estado === "eliminada") {
            listaDeTareasEliminadas.appendChild(nuevaTarea);
        }
    }

    function guardarTareas() {
        const tareas = {
            pendientes: [],
            terminadas: [],
            eliminadas: [],
        };

        listaDeTareas.querySelectorAll("li").forEach(function (item) {
            tareas.pendientes.push(item.firstChild.textContent.trim());
        });

        listaDeTareasTerminadas.querySelectorAll("li").forEach(function (item) {
            tareas.terminadas.push(item.textContent.trim());
        });

        listaDeTareasEliminadas.querySelectorAll("li").forEach(function (item) {
            tareas.eliminadas.push(item.textContent.trim());
        });

        localStorage.setItem("tareas", JSON.stringify(tareas));
    }

    function cargarTareas() {
        const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || {
            pendientes: [],
            terminadas: [],
            eliminadas: [],
        };

        tareasGuardadas.pendientes.forEach((text) => crearTarea(text, "pendiente"));
        tareasGuardadas.terminadas.forEach((text) => crearTarea(text, "terminada"));
        tareasGuardadas.eliminadas.forEach((text) => crearTarea(text, "eliminada"));
    }

    function borrarLocalStorage(){
        localStorage.clear();
        alert("El local Storage ha sido borrado");
        location.reload();
    }
    botonBorrarLocalStorage.addEventListener('click', borrarLocalStorage);
});
