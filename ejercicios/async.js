/*
 * EJERCICIO 2 - Async/Await.
 *
 * Hay funciones que usan async/await mal. Arregla los bugs para que pasen
 * los tests.
 */

// Simulamos una DB.
const USUARIOS = {
    1: { id: 1, nombre: 'Alice',   amigos: [2, 3] },
    2: { id: 2, nombre: 'Bob',     amigos: [1] },
    3: { id: 3, nombre: 'Charlie', amigos: [1, 2] },
};

function obtenerUsuario(id) {
    return new Promise(resolve => {
        setTimeout(() => resolve(USUARIOS[id] || null), 10);
    });
}


function nombresDeAmigos(usuario) {
    // Bug: el .map sobre amigos devuelve promises, pero no las resolvemos.
    // Deberia devolver ['Bob', 'Charlie'] para Alice.
    return usuario.amigos.map(id => obtenerUsuario(id).then(u => u.nombre));
}


async function tieneAmigo(usuarioId, posibleAmigoId) {
    // Bug subtil: el await deberia estar antes del .amigos.
    const usuario = obtenerUsuario(usuarioId);
    return usuario.amigos.includes(posibleAmigoId);
}


async function totalDeAmigos(usuarioIds) {
    // Bug: en serie en lugar de paralelo. Tarda 30ms en lugar de 10ms.
    let total = 0;
    for (const id of usuarioIds) {
        const u = await obtenerUsuario(id);
        total += u.amigos.length;
    }
    return total;
}

module.exports = { obtenerUsuario, nombresDeAmigos, tieneAmigo, totalDeAmigos };
