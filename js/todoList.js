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
    eliminarTarea.onclick = function() { nuevaTarea.remove();}

    //agregar boton para eliminar elemento de la lista
    nuevaTarea.appendChild(eliminarTarea);

    //agregar elemento tarea a la lista
    document.getElementById("listaDeTareas").appendChild(nuevaTarea);
    //Limpiar cuadro de texto de input    
    document.getElementById("nuevaTarea").value = "";
}