const assert = require('node:assert');
const { test } = require('node:test');

const { nombresDeAmigos, tieneAmigo, totalDeAmigos, obtenerUsuario } = require('./async');


test('nombresDeAmigos devuelve un array de strings', async () => {
    const alice = await obtenerUsuario(1);
    const nombres = await nombresDeAmigos(alice);
    assert.deepStrictEqual(nombres, ['Bob', 'Charlie']);
});


test('tieneAmigo devuelve true si son amigos', async () => {
    const resultado = await tieneAmigo(1, 2);
    assert.strictEqual(resultado, true);
});


test('tieneAmigo devuelve false si no son amigos', async () => {
    const resultado = await tieneAmigo(2, 3);
    assert.strictEqual(resultado, false);
});


test('totalDeAmigos suma correctamente', async () => {
    const total = await totalDeAmigos([1, 2, 3]);
    // Alice: 2, Bob: 1, Charlie: 2 -> 5
    assert.strictEqual(total, 5);
});
