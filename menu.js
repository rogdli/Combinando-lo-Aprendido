const readline = require('readline-sync');
const Tarea = require('./Tarea');
const Lista = require('./Lista');

///Función donde se maneja todo lo que es menú
///No es 100% pura, ya que no siempre devuelve el mismo output dado el mismo input
function menu() { 
    menuPrincipal();
    //A opcion le asigna lo devuelto por opcionIngresada
    const opcion = opcionIngresada();
    procesarOpcion(opcion);
    if (opcion !== 4) {
        //Uso de recursividad para simular bucle
        menu();
    }
}

///Función pura (no tiene efectos secundarios observables)
///Esta función sirve para ser reutilizada, y el código se vuelve más legible
function menuPrincipal() {
    console.log('1. Ver tarea');
    console.log('2. Buscar Tarea');
    console.log('3. Agregar Tarea');
    console.log('4. Cerrar');
}

///Función no 100% pura por la interacción con el usuario, no muy determinista ya que la entrada depende del usuario
///Sin embargo, resulta útil y reutilizable a lo largo del código
function opcionIngresada() {
    try {
        //Ingreso por teclado que se le asigna a x
        const x = readline.question('Ingresa una de estas opciones:\n');
        //Si x no es un número
        if (isNaN(x)) {
            console.log('Error, el valor ingresado no es un numero');
            return opcionIngresada();
        } else {
            //x se convierte en entero y se le asigna a z
            const z = parseInt(x);
            //Se devuelve z y se le asigna a const opcion en la función menu
            return z;
        }

    } catch (error) {
        console.log('Ha surgido un error, intentelo de nuevo');
        //Recursividad
        return opcionIngresada();
    }
}

///Función pura que procesa el menú principal a través de la opción elegida
///Traté de hacer la función lo menos impredecible posible
///Antes tenía un do-while para procesar el menu principal, logré dividirlo en funciones para que no sea necesario
function procesarOpcion(opcion) {
    switch (opcion) {
        case 1:
            iniciaMenuCasoUno();
            break;
        case 2:
            //A la constante encontrados se le asigna la tarea encontrada que devuelva la función buscar en el módulo Tarea
            const encontrados = Tarea.buscar(Lista.lista);
            //Se invoca la función mostrarEncontrados para que muestre la tarea encontrada recientemente
            //Esta solo muestra el índice y el titulo
            Lista.mostrarEncontrados(encontrados);
            //Si la tarea existe...
            if (encontrados.length > 0) {
                //Se muestran los detalles de la tarea
                Lista.detalleTarea(encontrados);
            }
            break;
        case 3:
            //Se agrega una nueva tarea a la lista mediante la función ingresar del módulo Tarea
            //Se utiliza el método push un elemento al final del array lista
            Lista.lista.push(Tarea.ingresar());
            break;
        case 4:
            console.log('Gracias por usar el programa');
            break;
        default:
            console.log('Opcion incorrecta');
            break;
    }
}

///Funcion que lleva a cabo la muestra y el proceso del menu del caso uno
///No es pura
function iniciaMenuCasoUno() {
    menuCasoUno();
    //A opcion le asigna lo devuelto por opcionIngresada
    const opcion = opcionIngresada();
    procesarMenuCasoUno(opcion);
    if (opcion !== 5) {
        //Llamada recursiva que simula estructura de bucle
        iniciaMenuCasoUno();
    }
}

///Función pura (no tiene efectos secundarios observables)
///Esta función sirve para ser reutilizada, y el código se vuelve más legible
function menuCasoUno() {
    console.log('1. Todas');
    console.log('2. Pendientes');
    console.log('3. Tareas en curso');
    console.log('4. Tareas finalizadas');
    console.log('5. Volver');
}

///Función pura (sin efectos secundarios observables)
///Procesa el menú del caso uno a través de la opción elegida
///Antes tenía bucles para procesar esto, opté por cambiarlo usando condicionales if
function procesarMenuCasoUno(opcion) {
    switch (opcion) {
        //Para cada caso, se muestra la tarea con el estado correspondiente
        case 1:
            //Se invoca la función del módulo Lista
            Lista.verTodas(Lista.lista);
            //Si la lista no está vacía...
            if (Lista.lista.length > 0) {
                //Se le pregunta al usuario si quiere editar la tarea
                //Nuevamente se invoca otra función, con lista y el indice devuelto por detalleTarea 
                Lista.editarDetalle(Lista.lista, Lista.detalleTarea(Lista.lista));
            }
            break;
        case 2:
            Lista.verPendientes(Lista.lista);
            if (Lista.lista.length > 0) {
                Lista.editarDetalle(Lista.lista, Lista.detalleTarea(Lista.lista));
            }
            break;
        case 3:
            Lista.verEnCurso(Lista.lista);
            if (Lista.lista.length > 0) {
                Lista.editarDetalle(Lista.lista, Lista.detalleTarea(Lista.lista));
            }
            break;
        case 4:
            Lista.verTerminadas(Lista.lista);
            if (Lista.lista.length > 0) {
                Lista.editarDetalle(Lista.lista, Lista.detalleTarea(Lista.lista));
            }
            break;
        case 5:
            break;
        default:
            console.log('El valor ingresado es incorrecto, intentelo de nuevo \n');
            break;
    }
}

console.log('Bienvenido');
menu();

