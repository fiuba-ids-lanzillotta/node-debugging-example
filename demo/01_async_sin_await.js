/*
 * BUG: una funcion async devuelve una Promise pero el caller la usa como si
 * fuera el valor resuelto.
 *
 * Sintoma:
 *     `obtenerNombreUsuario(...)` deberia devolver 'Alice' pero imprime
 *     `Promise { <pending> }` o `undefined`.
 *
 * Como debuggearlo:
 *     1. Breakpoint en la linea `const nombre = obtenerNombreUsuario(1);`.
 *     2. Step Over y hacer hover sobre `nombre`. Es una Promise, no un string.
 *     3. Conclusion: olvidamos `await`.
 *
 * Fix:
 *     `const nombre = await obtenerNombreUsuario(1);`
 *     (y la funcion que lo llama tiene que ser async tambien).
 */

const USUARIOS = {
    1: { id: 1, nombre: 'Alice',   email: 'alice@example.com' },
    2: { id: 2, nombre: 'Bob',     email: 'bob@example.com' },
    3: { id: 3, nombre: 'Charlie', email: 'charlie@example.com' },
};

// Simulamos una DB lenta.
async function obtenerNombreUsuario(id) {
    await new Promise(resolve => setTimeout(resolve, 100));
    return USUARIOS[id]?.nombre;
}

async function main() {
    // Bug: falta await.
    const nombre = obtenerNombreUsuario(1);

    console.log(`Hola, ${nombre}!`);
    console.log(`Tipo de "nombre":`, typeof nombre);
    console.log(`Es Promise?`, nombre instanceof Promise);
}

main();
