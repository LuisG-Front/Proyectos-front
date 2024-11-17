function agregarTarea(){

    const nuevaTareaTexto = document.getElementById("nuevaTarea").value;

    if(nuevaTareaTexto === ""){
        alert("Ingresar nueva tarea!");
        return;
    }
    //crear elemento li en la lista
    const nuevaTarea = document.createElement("li");
    nuevaTarea.textContent = nuevaTareaTexto + " ";

    //boton para eliminar
    const eliminarTarea = document.createElement("button");
    eliminarTarea.textContent = "Eliminar";
    eliminarTarea.onclick = function() { 
        nuevaTarea.remove();
        const listaDeTareasEliminadas = document.getElementById("listaDeTareasEliminadas");
        listaDeTareasEliminadas.appendChild(nuevaTarea);
        nuevaTarea.removeChild(eliminarTarea);
        nuevaTarea.removeChild(terminarTarea);
        nuevaTarea.removeChild(editarTarea);
    }



    //boton terminar
    const terminarTarea = document.createElement("button");
    terminarTarea.textContent = "Completar"
    //pendiente
    terminarTarea.onclick = function() {
        const listaTareaTerminadas = document.getElementById("listaDeTareasTerminadas");
        listaTareaTerminadas.appendChild(nuevaTarea);
        terminarTarea.remove();
        nuevaTarea.removeChild(eliminarTarea);
        nuevaTarea.removeChild(terminarTarea);
    }
    
    const editarTarea = document.createElement("button");
    editarTarea.textContent = "Editar";
    editarTarea.onclick = function(){
        
    }

    //agregar boton para eliminar elemento de la lista
    nuevaTarea.appendChild(eliminarTarea);

    //agregar boton completar
    nuevaTarea.appendChild(terminarTarea)
    //agregar boton Editar 
    nuevaTarea.appendChild(editarTarea);

    //agregar elemento tarea a la lista
    document.getElementById("listaDeTareas").appendChild(nuevaTarea);
    //Limpiar cuadro de texto de input    
    document.getElementById("nuevaTarea").value = "";
}