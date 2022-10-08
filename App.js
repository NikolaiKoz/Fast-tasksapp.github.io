document.getElementById('formTask').addEventListener('submit', saveTask); //Selecciono el id con el que quiero trabajar y le agrego una escucha.

function saveTask(e){

    /* Esta funcion tiene por objetivo capturar el cotenido de los input, title y description, convertirlos en objetos, y lo guardamos en un arreglo, previamente convirtiendolo en string y almacenarlo en en localStorage*/


    let title = document.getElementById('title').value; //Obtenemos el valor del input con id 'title'.
    let description = document.getElementById('description').value; //Obtenemos el valor del input con id 'description'.

    //* CONVERT CAPTURED ITEMS INTO OBJECTS

    const task = {
        title, //title: title
        description //description: description
    };



    /* Logica del Algoritmo:
    ! Si no existe un arreglo lo creo, tomo el objeto, lo convierto a estring, si ya existe coma el nuevo objeto conviertelo a string y agregalo.
    */
    if(localStorage.getItem('tasks') === null){
        let tasks = [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }else{
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /* Si en el local storage no existe ningun arreglo llamado 'tasks', lo creo y guardo el objeto capturado en el, convierto el objeto a string y lo almacenos en el local storage, SINO (si ya existe un arreglo 'tasks'), directamente añado el objeto al local storage con los mismos prosedimientos */

    getTasks(); //llamo a la funcion
    document.getElementById('formTask').reset();
    e.preventDefault(); //Controlamos el evento por defecto del navegador (refrescar la pagina)

};

function getTasks() {

    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.getElementById('tasks');

    tasksView.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {

        let title = tasks[i].title;
        let description = tasks[i].description;

        tasksView.innerHTML += `
        <div class="card mb-3">
            <div class="card-body navbar">
                <p>${title} - ${description}</p>
                <a class="btn btn-danger" onclick="deleteTask('${title}')">Delete</a>
            </div>
        </div>`

    }
}

function deleteTask(title){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0; i < tasks.length; i++) {
        if(tasks[i].title == title){
            tasks.splice(i, 1);
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks();
}

getTasks();


