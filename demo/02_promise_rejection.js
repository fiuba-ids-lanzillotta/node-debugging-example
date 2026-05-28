/*
 * BUG: una Promise rechazada NO atrapada por ningun `.catch`.
 *
 * Sintoma:
 *     El script termina aparentemente bien, pero Node imprime:
 *     `UnhandledPromiseRejection: ...`
 *     y en futuras versiones de Node, eso mata el proceso con codigo distinto
 *     de cero.
 *
 * Como debuggearlo:
 *     1. Activar el breakpoint "Caught + Uncaught Exceptions" en VS Code.
 *     2. F5 con la config "Node: archivo actual".
 *     3. El debugger se detiene en el `throw` dentro del .then.
 *     4. Mirar el call stack: la cadena de promises no tiene un `.catch`.
 *
 * Fix:
 *     - Encadenar `.catch(err => ...)` al final.
 *     - O usar `try/await/catch` en una funcion async.
 */

function obtenerUsuario(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id < 0) {
                reject(new Error(`ID invalido: ${id}`));
            } else {
                resolve({ id, nombre: `Usuario ${id}` });
            }
        }, 50);
    });
}

obtenerUsuario(-1)
    .then(u => console.log('Usuario:', u))
    // Falta el .catch
    .then(() => console.log('Termine'));
