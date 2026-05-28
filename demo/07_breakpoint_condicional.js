/*
 * DEMO de BREAKPOINTS CONDICIONALES en VS Code.
 *
 * Procesamos 1000 productos y uno tiene un precio negativo (lo que no deberia
 * pasar). Encontrarlo a mano es inviable.
 *
 * Como debuggearlo:
 *     1. Breakpoint en `precioFinal = precio * (1 - descuento);`.
 *     2. Click derecho sobre el breakpoint → "Edit Breakpoint" → "Expression":
 *
 *            precioFinal < 0
 *
 *     3. F5. El debugger se detiene SOLO cuando la condicion es true.
 *     4. Inspeccionar `producto` y encontrar el id problematico.
 *
 * Bug subyacente:
 *     Uno de los productos tiene `precio: -50` (probablemente un error de carga).
 *     El sistema deberia validar al ingresarlo.
 */

const productos = [];
for (let i = 0; i < 1000; i++) {
    productos.push({ id: i, precio: Math.floor(Math.random() * 1000) + 1 });
}
// Insertamos un bug deterministico: el producto 666 tiene precio negativo.
productos[666].precio = -50;

let problemas = 0;
for (const producto of productos) {
    const descuento = 0.2;
    const precio = producto.precio;
    const precioFinal = precio * (1 - descuento);

    if (precioFinal < 0) problemas++;
}

console.log(`Productos con problemas: ${problemas} / ${productos.length}`);
console.log('(deberia ser 1, pero a mano no podemos encontrar cual)');
