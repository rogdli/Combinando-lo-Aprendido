const readline = require('readline-sync');
const Tarea = require('./Tarea');

let lista = [];

///Función mayormente pura que muestra los encontrados tomando lista como parámetro
function mostrarEncontrados(lista) {
    //Si la lista no está vacía...
    if (lista.length > 0) {
        //Para cada tarea, se muestra la consola con su índice y su título
        lista.forEach((tarea, indice) => {
            console.log(`${indice + 1}. ${tarea.titulo}`);
        });
    } else {
        console.log("No se encontró ningún tarea");
    }
}

///Función mayormente pura que muestra todas las tareas
function verTodas(lista) {
    //Si la lista no está vacía...
    if (lista.length > 0) {
        //Para cada tarea, se muestra la tarea en consola con su índice y su título
        lista.forEach((tarea, indice) => {
            console.log(`${indice + 1}. ${tarea.titulo}`);
        });
    } else {
        console.log("La agenda está vacía");
    }
}

///Función mayormente pura que muestra las tareas pendientes
function verPendientes(lista) {
    //Si la lista no está vacía...
    if (lista.length > 0) {
        //Para cada tarea, se muestra la tarea consola con su índice y su título
        lista.forEach((tarea, indice) => {
            //Si el estado es 1, el cual corresponde a "pendiente", se muestra la tarea
            if (tarea.estado === 1) { 
                console.log(`${indice + 1}. ${tarea.titulo}`);
            }
        });
    } else {
        console.log("La agenda está vacía");
    }
}

///Función mayormente pura que muestra las tareas en curso
function verEnCurso(lista) {
    //Si la lista no está vacía...
    if (lista.length > 0) {
        //Para cada tarea, se muestra la tarea consola con su índice y su título
        lista.forEach((tarea, indice) => {
            //Si el estado es 2, el cual corresponde a "en curso", se muestra la tarea
            if (tarea.estado === 2) {
                console.log(`${indice + 1}. ${tarea.titulo}`);
            }
        });
    } else {
        console.log("La agenda está vacía");
    }
}

///Función mayormente pura que muestra las tareas terminadas
function verTerminadas(lista) {
    //Si la lista no está vacía...
    if (lista.length > 0) {
        //Para cada tarea, se muestra la tarea consola con su índice y su título
        lista.forEach((tarea, indice) => {
            //Si el estado es 3, el cual corresponde a "terminada", se muestra la tarea
            if (tarea.estado === 3) {
                console.log(`${indice + 1}. ${tarea.titulo}`);
            }
        });
    } else {
        console.clear();
        console.log("La agenda está vacía");
    }
}

///Función no pura, ya que interactúa con la e/s al utilizar rl.question
function editarDetalle(lista, indice) {
    //Se declara la constante asignándole un valor booleano, que será true si indice !== -1
    //Ayuda a verificar si el índice dado a la función como argumento es válido
    const esIndiceValido = indice !== -1;
    //Si el índice es válido...
    if (esIndiceValido) {
        //A selección se le asigna lo ingresado por el usuario
        const seleccion = readline.question(`Si deseas modificar esta tarea, presiona "e". Si no, presiona cualquier otra tecla.\n`);
        //El condicional if llama a esta función para verificar si la selección = "e"
        if (esSeleccionE(seleccion)) {
            //Si la selección es igual a "e", se procede a editar la tarea (en módulo Tarea)
            Tarea.editar(lista[indice - 1]);
        }
    }
}

///Función pura ya que toma un parámetro s y devuelve un resultado basado sólamente en ese parámetro
function esSeleccionE(s) {
    //Convierte en minúscula y compara
    return s.toLowerCase() === "e";
}

///Función no pura que se llama desde el módulo menu
function detalleTarea(lista) {
    //Asigna a selección lo ingresado por teclado, que se convierte en entero por parseInt
    const seleccion = parseInt(readline.question("Si desea ver en detalle una de estas tareas, seleccione su indice. Si no, presione 0 u otra tecla distinta de los indices existentes\n"), 10);
    if (esSeleccionValida(seleccion, lista.length)) {
        //Se llama a una función complemento con la lista y el índice seleccionado como parámetro
        complementoDetalleTarea(lista, seleccion);
        return seleccion;
    } else {
        return -1;
    }
}

///La sig. función pura verifica si la selección es válida, analizando si es un número entero, 
///...y si está dentro del rango de los índices
function esSeleccionValida(seleccion, longitudLista) {
    //Devuelve la respuesta que será tomada por el condicional if de la función detalleTarea
    return !isNaN(seleccion) && seleccion > 0 && seleccion <= longitudLista;
}

///Función pura que depende solamente de los argumentos
function complementoDetalleTarea(lista, indice) {
    //A la constante tarea se le asigna la tarea con su índice correspondiente
    const tarea = lista[indice - 1];
    //Función pura que depende solamente del argumento tarea[i].estado
    function obtenerTextoEstado(estado) {
        switch (estado) {
            case 1:
                return `Pendiente`;
            case 2:
                return `En curso`;
            case 3:
                return `Finalizado`;
            default:
                return 'Desconocido';
        }
    }

    console.log("Detalles de la tarea:");
    console.log(`Titulo: ${tarea.titulo}`);
    console.log(`Descripcion: ${tarea.descripcion}`);
    //Le retorna el estado correspondiente a la tarea
    console.log(`Estado: ${obtenerTextoEstado(tarea.estado)}`);
    //Le retorna la dificultad correspondiente a la tarea
    console.log(`Dificultad: ${obtenerTextoDificultad(tarea.dificultad)}`);
    console.log(`Fecha de creacion: ${formatDate(tarea.creacion)}`);
    console.log(`Ultima edicion: ${formatDate(tarea.ultima_edicion)}`);
    console.log(`Fecha de vencimiento: ${formatDate(tarea.vencimiento) || 'No especificada'}`);
    
}

///Función pura que depende sólamente del argumento tarea[i].dificultad
function obtenerTextoDificultad(dificultad) {
    switch (dificultad) {
        case 1:
            return `Facil`;
        case 2:
            return `Medio`;
        case 3:
            return `Dificil`;
        default:
            return 'Desconocido';
    }
}


function formatDate(dateString) {
    //Verifica si la cadena está vacía
    if (!dateString) {
        return '';
    }
    //Si dateString tiene un valor, se crea un nuevo objeto de fecha Date
    const date = new Date(dateString);
    //Después de crear el objeto de fecha, se usa el sig. método para obtener la fecha/hora de manera local
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

module.exports = {
    lista,
    verTodas,
    verPendientes,
    verEnCurso,
    verTerminadas,
    detalleTarea,
    editarDetalle,
    complementoDetalleTarea,
    formatDate,
    mostrarEncontrados
};









