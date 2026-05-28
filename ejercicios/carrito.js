/*
 * EJERCICIO 1 - Carrito de compras.
 *
 * Hay 3 funciones con bugs. Corre los tests con:
 *
 *     npm test ejercicios/carrito.test.js
 *
 * y usa el debugger para entender por que fallan.
 */

function calcularSubtotal(items) {
    let total = 0;
    for (let i = 0; i <= items.length; i++) {
        total += items[i].precio * items[i].cantidad;
    }
    return total;
}

function aplicarDescuento(subtotal, porcentaje) {
    return subtotal - porcentaje;
}

function totalConIva(subtotal, descuento) {
    const IVA = 0.21;
    const conIva = subtotal * (1 + IVA);
    return conIva - descuento;
}

module.exports = { calcularSubtotal, aplicarDescuento, totalConIva };
