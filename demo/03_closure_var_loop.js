/*
 * BUG clasico: closure con `var` en un loop. Los callbacks capturan la MISMA
 * variable, que para cuando se ejecutan ya cambio.
 *
 * Sintoma esperado:
 *     Despues de 1s, esperabamos que se impriman: 0, 1, 2, 3, 4.
 *     Lo que se imprime es: 5, 5, 5, 5, 5.
 *
 * Como debuggearlo:
 *     1. Breakpoint dentro del callback de setTimeout.
 *     2. Cuando se dispare, mirar el panel "Closure" en Scope: hay una sola
 *        variable `i` compartida entre todos los callbacks.
 *     3. Cambiar `var` por `let` y mostrar como ahora Scope muestra una
 *        "Block" propia por cada callback.
 *
 * Fix:
 *     `for (let i = 0; i < 5; i++) ...`
 */

console.log('Programando 5 timeouts...');

for (var i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(`Despues de 1s: i = ${i}`);
    }, 1000);
}

console.log('Esperando 1s...');
