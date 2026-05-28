/*
 * BUG de performance: tareas independientes ejecutadas en SERIE en lugar de
 * en paralelo.
 *
 * Sintoma:
 *     Bajar 3 URLs deberia tardar ~ max(t1, t2, t3) si se hace en paralelo.
 *     El codigo las hace en serie, asi que tarda t1 + t2 + t3.
 *
 * Como debuggearlo:
 *     1. Logpoint (o console.time) antes y despues del bloque problematico.
 *     2. Observar que el tiempo total es la SUMA de las simulaciones.
 *     3. Mirar el call stack: cada await pausa la funcion antes de empezar
 *        el siguiente.
 *
 * Fix:
 *     Usar `Promise.all([...])` para iniciar todas al mismo tiempo:
 *
 *         const [a, b, c] = await Promise.all([
 *             bajarUrl('a'), bajarUrl('b'), bajarUrl('c'),
 *         ]);
 */

function bajarUrl(nombre, ms) {
    return new Promise(resolve => {
        setTimeout(() => resolve(`contenido de ${nombre}`), ms);
    });
}

async function main() {
    console.time('total');

    // Bug: en serie. Cada await espera a que el anterior termine.
    const a = await bajarUrl('a', 500);
    const b = await bajarUrl('b', 500);
    const c = await bajarUrl('c', 500);

    console.log({ a, b, c });
    console.timeEnd('total');  // Imprime ~1500ms. Con Promise.all seria ~500ms.
}

main();
