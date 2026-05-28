/*
 * BUG: `this` se pierde cuando se pasa un metodo como callback.
 *
 * Sintoma:
 *     `Cannot read properties of undefined (reading 'multiplicador')`
 *
 * Como debuggearlo:
 *     1. Breakpoint dentro del metodo `escalar`.
 *     2. Cuando se ejecute, mirar `this` en el panel Scope: es `undefined`
 *        (en strict mode) o el objeto global.
 *     3. Comparar con la siguiente version (`bind` o arrow function).
 *
 * Fix:
 *     - `numeros.map(this.escalar.bind(this))`
 *     - O reescribir `escalar` como arrow function (que NO tiene su propio `this`).
 *     - O usar `numeros.map(n => this.escalar(n))`.
 */

class Multiplicador {
    constructor(multiplicador) {
        this.multiplicador = multiplicador;
    }

    escalar(n) {
        return n * this.multiplicador;
    }

    aplicar(numeros) {
        // Bug: pasamos this.escalar como callback. Pierde el `this`.
        return numeros.map(this.escalar);
    }
}

const m = new Multiplicador(3);
try {
    console.log(m.aplicar([1, 2, 3]));
} catch (e) {
    console.log('Error:', e.message);
}
