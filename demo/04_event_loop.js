/*
 * DEMO conceptual: el orden de ejecucion del Event Loop no es trivial.
 *
 * Adivinar el orden de los console.log antes de correrlo. La mayoria se
 * equivoca al menos una vez.
 *
 * Como debuggearlo:
 *     1. Breakpoint en CADA console.log.
 *     2. F5. Ir presionando Continue (F5) en cada parada.
 *     3. Mirar el Call Stack en cada paso para entender DESDE DONDE se
 *        invoca cada callback.
 *
 * Tipsobre Event Loop:
 *     - El codigo sincrono se ejecuta primero, en orden, hasta terminar.
 *     - `process.nextTick` y microtasks (Promises) van DESPUES del sincrono
 *       pero ANTES de los timers/IO.
 *     - `setImmediate` vs `setTimeout(.., 0)` tienen un orden que depende del
 *       contexto.
 *
 * Orden esperado: 1, 4, 3, 5, 2  (ver INSTRUCTOR.md para la explicacion)
 */

console.log('1: sincrono inicial');

setTimeout(() => console.log('2: setTimeout 0ms'), 0);

Promise.resolve().then(() => console.log('3: microtask (Promise)'));

process.nextTick(() => console.log('4: nextTick'));

setImmediate(() => console.log('5: setImmediate'));

console.log('1.5: sincrono final (no es parte del enunciado)');
