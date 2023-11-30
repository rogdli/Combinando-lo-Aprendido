const readline = require('readline-sync');

///Creación de objeto prototipo Tarea
var Tarea = {
    titulo: "",
    descripcion: "",
    estado: 1, // Por defecto en estado "pendiente"
    creacion: new Date(),
    ultimaEdicion: new Date(),
    vencimiento: new Date(),
    dificultad: 0
};

///Función constructora para tarea
function crearTarea(titulo, descripcion, vencimiento, dificultad) {
    //Se crea un nuevo objeto que hereda del prototipo Tarea
    var nuevo = Object.create(Tarea);
    nuevo.titulo = titulo;
    nuevo.descripcion = descripcion;
    nuevo.vencimiento = vencimiento;
    nuevo.dificultad = dificultad;
    nuevo.creacion = new Date();
    nuevo.ultimaEdicion = new Date();
    return nuevo;
}

///Función no pura para ingresar atributos de la tarea
///Para atributos como fecha vencimiento y dificultad, se divide en dos funciones específicas para que sea más funcional
function ingresar() {
    const titulo = readline.question("Titulo: \n");
    const descripcion = readline.question("Descripcion: \n");
    return crearTarea(titulo, descripcion, ingresarFechaVencimiento(), ingresarDificultad());
}

///Función no del todo pura, pero con comportamiento determinista al crear la fecha
///...ya que si le das la misma fecha, se obtiene siempre el mismo resultado
///Le da el argumento de la fecha de vencimiento a CrearTarea
function ingresarFechaVencimiento() {
    const fechaTexto = readline.question('Ingresa fecha de vencimiento (YYYY-MM-DD):\n');
    //Creación de Objeto Date
    const vencimiento = new Date(fechaTexto);

    if (isNaN(vencimiento.getTime())) {
        console.log('Fecha no valida. Por favor, ingresa una fecha en el formato correcto.');
        //Recursividad para simular bucle
        return ingresarFechaVencimiento();
    }

    return vencimiento;
}

///Función que le devuelve el argumento de la dificultad en estrellas a CrearTarea
///Esta dificultad luego pasa a la función leerDificultad, donde se le asigna un número correspondiente
function ingresarDificultad() {
    console.log('Elige la nueva dificultad:');
    console.log('1. Facil 2. Medio 3. Dificil');
    ///Se le asigna por teclado a la constante opción 
    const opcion = readline.questionInt('Ingrese el numero correspondiente a la dificultad (1-3): ');
    //Si el número ingresado está fuera del rango...
    if (![1, 2, 3].includes(opcion)) {
        console.log('Opcion no valida. Por favor, elige una dificultad valida.');
        return ingresarDificultad();
    }
    //Se define estrellas como string y se le asignan a cada caso las correspondientes
    let estrellas = '';
    switch (opcion) {
        case 1:
            estrellas = '★';
            break;
        case 2:
            estrellas = '★★';
            break;
        case 3:
            estrellas = '★★★';
            break;
    }

    console.log(`Dificultad seleccionada: ${estrellas}`);
    return estrellas;
}

///Función que permite editar la tarea, llamada por editarDetalle en el módulo Lista
function editar(x) {
    x.titulo = readline.question("Titulo: \n");
    x.descripcion = readline.question("Descripcion: \n");
    //Se le asigna lo devuelto por la función leerEstado, que será un número al que le corresponderá un estado
    x.estado = leerEstado();
    //Se le asigna un objeto Date
    x.ultimaEdicion = new Date();
    //Se le asigna lo devuelto por la función leerFecha
    x.vencimiento = leerFecha();
    //Se le asigna lo devuelto por la función leerDificultad, que será un número al que le corresponderá una dificultad
    x.dificultad = leerDificultad();

    console.log("Datos guardados!\n");
}

///Función no del todo pura que devuelve un número correspondiente al estado ingresado por el usuario
function leerEstado() {
    console.log('1. Pendiente\n 2. En curso\n 3. Finalizado\n');
    //El usuario ingresa un estado y se le asigna a la constante estado
    const estado = readline.questionInt('Ingrese el numero correspondiente al estado (1-3): ');
    //Si el valor de estado es 1, 2, o 3, devuelve su valor. Si no, se hace una llamada recursiva
    //...para que se vuelva a ingresar el valor
    return (estado === 1 || estado === 2 || estado === 3) ? estado : leerEstado();
}

///Función no del todo pura que devuelve un número correspondiente a la dificultad ingresada por el usuario
function leerDificultad() {
    console.log('1. Facil\n 2. Medio\n 3. Dificil\n');
    //El usuario ingresa una dificultad y se le asigna a la constante dificultad
    const dificultad = readline.questionInt('Ingrese el numero correspondiente a la dificultad (1-3): ');
    //Si el valor de la dificultad es 1, 2, o 3, devuelve su valor. Si no, se hace una llamada recursiva
    return (dificultad === 1 || dificultad === 2 || dificultad === 3) ? dificultad : leerDificultad();
}

///Función no del todo pura que devuelve la fecha
function leerFecha() {
    //El usuario ingresa la fecha por teclado. Debe ser ingresado de forma correcta o puede causar errores
    //...lo ingresado se le asigna a la constante fechaTexto
    const fechaTexto = readline.question('Ingrese fecha límite (AAAA-MM-DD): ');
    const fecha = new Date(fechaTexto);
    //Verifica si el valor devuelto por fecha.getTime es válido (numérico). Si no, se hace una llamada recursiva
    return isNaN(fecha.getTime()) ? leerFecha() : fecha;
}

///Función que sirve para la búsqueda de tareas
function buscar(lista) {
    //A la constante cadenaABuscar se le asigna el título ingresado por el usuario, que se pasa a minúsculas
    const cadenaABuscar = readline.question("Ingrese el título de la tarea que desea buscar: ").toLowerCase();
    //El método filter crea un nuevo array tareasEncontradas, que contendrá solo las tareas que
    //...coincidan con el título ingresado
    const tareasEncontradas = lista.filter((object) => {
        return object.titulo.toLowerCase().includes(cadenaABuscar);
    });
    // Devuelve el array de tareasEncontradas que cumplen con la condición de búsqueda
    return tareasEncontradas;
}

module.exports = {
    crearTarea,
    ingresar,
    editar,
    buscar
};






