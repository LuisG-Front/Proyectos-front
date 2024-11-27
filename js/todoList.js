document.addEventListener("DOMContentLoaded", function () {
    const formAgregarTarea = document.getElementById('formAgregarTarea');
    const listaDeTareas = document.getElementById("listaDeTareas");
    const listaDeTareasEliminadas = document.getElementById("listaDeTareasEliminadas");
    const listaDeTareasTerminadas = document.getElementById("listaDeTareasTerminadas");

    cargarTareas();

    formAgregarTarea.addEventListener("submit", function (event) {
        event.preventDefault();
        agregarTarea();
        guardarTareas();
    });

    function agregarTarea() {
        const nuevaTareaTexto = document.getElementById("nuevaTarea").value;

        if (nuevaTareaTexto === "") {
            alert("Ingresar nueva tarea!");
            return;
        }

        crearTarea(nuevaTareaTexto, "pendiente");
        document.getElementById("nuevaTarea").value = "";
        
        guardarTareas(); 
    }

     function crearTarea(text, estado) {
        const nuevaTarea = document.createElement("li");
        nuevaTarea.textContent = text + " ";

        const eliminarTarea = document.createElement("button");
        eliminarTarea.textContent = "Eliminar";
        eliminarTarea.onclick = function () {
            nuevaTarea.remove();
            listaDeTareasEliminadas.appendChild(nuevaTarea);
            nuevaTarea.removeChild(eliminarTarea);
            nuevaTarea.removeChild(terminarTarea);
            nuevaTarea.removeChild(editarTarea);
            guardarTareas(); // Guardar cambios
        };

        const terminarTarea = document.createElement("button");
        terminarTarea.textContent = "Completar";
        terminarTarea.onclick = function () {
            nuevaTarea.remove();
            listaDeTareasTerminadas.appendChild(nuevaTarea);
            terminarTarea.remove();
            nuevaTarea.removeChild(eliminarTarea);
            guardarTareas(); 
        };

        // Botón "Editar"
        const editarTarea = document.createElement("button");
        editarTarea.textContent = "Editar";
        editarTarea.onclick = function () {
            const nuevoTexto = prompt("Edita la tarea:", text);
            if (nuevoTexto !== null && nuevoTexto !== "") {
                nuevaTarea.firstChild.textContent = nuevoTexto + " ";
                guardarTareas(); 
            }
        };

        nuevaTarea.appendChild(eliminarTarea);
        nuevaTarea.appendChild(terminarTarea);
        nuevaTarea.appendChild(editarTarea);

        if (estado === "pendiente") {
            listaDeTareas.appendChild(nuevaTarea);
        } else if (estado === "terminada") {
            listaDeTareasTerminadas.appendChild(nuevaTarea);
        } else if (estado === "eliminada") {
            listaDeTareasEliminadas.appendChild(nuevaTarea);
        }
    }

    // guardo en localStorage
    function guardarTareas() {
        const tareas = {
            pendientes: [],
            terminadas: [],
            eliminadas: [],
        };

        //guardo tareas pendientes
        listaDeTareas.querySelectorAll('li').forEach(function (item) {
            tareas.pendientes.push(item.firstChild.textContent.trim());
        });

        //guardo tareas completadas
        listaDeTareasTerminadas.querySelectorAll('li').forEach(function (item) {
            tareas.terminadas.push(item.firstChild.textContent.trim());
        });

        //guardo tareas eliminadas
        listaDeTareasEliminadas.querySelectorAll('li').forEach(function (item) {
            tareas.eliminadas.push(item.firstChild.textContent.trim());
        });

        // Guardo en localStorage
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }

    // Cargo tareas desde local storage
    function cargarTareas() {
        const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || {
            pendientes: [],
            terminadas: [],
            eliminadas: [],
        };

        //cargo pendientes
        tareasGuardadas.pendientes.forEach((text) => crearTarea(text, "pendiente"));

        //cargo terminadas
        tareasGuardadas.terminadas.forEach((text) => crearTarea(text, "terminada"));
        
        //cargo eliminadas
        tareasGuardadas.eliminadas.forEach((text) => crearTarea(text, "eliminada"));

    }
    nuevaTarea.removeChild(terminarTarea);
    nuevaTarea.removeChild(editarTarea);
});
