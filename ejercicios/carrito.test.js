const assert = require('node:assert');
const { test } = require('node:test');

const { calcularSubtotal, aplicarDescuento, totalConIva } = require('./carrito');


test('subtotal de un item', () => {
    const items = [{ precio: 100, cantidad: 2 }];
    assert.strictEqual(calcularSubtotal(items), 200);
});

test('subtotal de varios items', () => {
    const items = [
        { precio: 100, cantidad: 2 },
        { precio: 50,  cantidad: 4 },
        { precio: 25,  cantidad: 1 },
    ];
    assert.strictEqual(calcularSubtotal(items), 425);
});

test('subtotal con carrito vacio', () => {
    assert.strictEqual(calcularSubtotal([]), 0);
});

test('descuento del 10% sobre 1000', () => {
    assert.strictEqual(aplicarDescuento(1000, 10), 900);
});

test('descuento del 0% no cambia el subtotal', () => {
    assert.strictEqual(aplicarDescuento(500, 0), 500);
});

test('total con IVA sobre subtotal de 1000 sin descuento', () => {
    assert.strictEqual(totalConIva(1000, 0), 1210);
});

test('total con IVA sobre subtotal de 1000 con 100 de descuento', () => {
    assert.strictEqual(totalConIva(1000, 100), 1110);
});
