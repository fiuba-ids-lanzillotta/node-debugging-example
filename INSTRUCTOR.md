# Guion para el instructor — Node

> **Aviso:** este archivo tiene las soluciones.

## Orden sugerido (40-50 min)

### Demo 01 — Async sin await (5 min)

- F5. Imprime `Promise { <pending> }` (o algo similar segun la version).
- Breakpoint en `const nombre = obtenerNombreUsuario(1);`.
- Step Over. Hover sobre `nombre`: es una Promise.
- Fix: agregar `await`.

### Demo 02 — Promise rejection (5 min)

- Activar el breakpoint **"Caught + Uncaught Exceptions"** en el panel
  Breakpoints de VS Code.
- F5. Se detiene en el `reject(...)`.
- Mirar el call stack: el `.then` no tiene `.catch` adelante.
- Fix:
  ```javascript
  obtenerUsuario(-1)
      .then(u => console.log('Usuario:', u))
      .catch(err => console.error('Error:', err.message));
  ```

### Demo 03 — var en loop (5 min)

- F5. Esperar 1s. Aparece "5, 5, 5, 5, 5".
- Breakpoint dentro del callback.
- Cuando se dispara, mirar el panel **Scope** → **Closure**: hay una sola `i`
  compartida.
- Cambiar `var` por `let` y mostrar como Scope ahora tiene **Block** con su
  propia `i` por callback.

### Demo 04 — Event loop (5 min)

- **Antes** de correr, pedirle a la clase que adivine el orden.
- Correr y mostrar el orden real: `1, 1.5, 4, 3, 5, 2` (o `1, 1.5, 4, 3, 2, 5`
  en algunos contextos).
- Explicar:
  1. Codigo sincrono: `1`, `1.5`.
  2. **process.nextTick** (mas prioritario que microtasks): `4`.
  3. **Microtasks** (Promises): `3`.
  4. **Timers / Immediate**: `2` y `5`.

### Demo 05 — Serie vs paralelo (5 min)

- F5. `console.timeEnd` imprime ~1500ms.
- Reescribir con `Promise.all`:
  ```javascript
  const [a, b, c] = await Promise.all([
      bajarUrl('a', 500), bajarUrl('b', 500), bajarUrl('c', 500),
  ]);
  ```
- Re-correr: ~500ms.
- Bonus: usar **logpoints** antes y despues de cada `bajarUrl` para mostrar
  el orden temporal.

### Demo 06 — `this` perdido (5 min)

- F5. Error: `Cannot read properties of undefined (reading 'multiplicador')`.
- Breakpoint dentro de `escalar`.
- `this` es `undefined`.
- Fix opcion A:
  ```javascript
  return numeros.map(this.escalar.bind(this));
  ```
- Fix opcion B:
  ```javascript
  return numeros.map(n => this.escalar(n));
  ```

### Demo 07 — Breakpoint condicional (5 min)

- Imprime: "Productos con problemas: 1 / 1000".
- Pero no sabemos cual.
- Breakpoint en `const precioFinal = ...`.
- Click derecho → Edit Breakpoint → Expression: `precioFinal < 0`.
- F5. Se detiene en el producto 666.
- Mostrar como `producto.precio` es `-50`.

---

## Soluciones de los ejercicios

### `carrito.js`

- `calcularSubtotal`: el `for` usa `<=` en lugar de `<`. En la ultima
  iteracion, `items[items.length]` es `undefined` y `undefined.precio`
  rompe. Fix: `i < items.length`.
- `aplicarDescuento`: trata el porcentaje como un valor absoluto en lugar
  de un porcentaje del subtotal. Fix:
  ```javascript
  return subtotal * (1 - porcentaje / 100);
  ```
- `totalConIva`: aplica el IVA antes del descuento, pero deberia ser al
  reves (segun los tests). En realidad el test que falla es
  `total con IVA sobre subtotal de 1000 sin descuento` que espera 1210 y
  la funcion da 1210 - 0 = 1210, asi que **ese test pasa**.
  El que falla es `subtotal de 1000 con 100 de descuento` que espera 1110
  (descuento de 100 sobre el subtotal, y despues sumar 21% del subtotal con
  descuento). La logica deberia ser:
  ```javascript
  const subtotalConDescuento = subtotal - descuento;
  return subtotalConDescuento * (1 + IVA);
  ```
  Hay que charlar con la clase cual es la regla de negocio correcta — el
  ejercicio sirve justamente para discutir como el debugger ayuda a entender
  que esta haciendo el codigo realmente vs lo que se esperaba.

### `async.js`

- `nombresDeAmigos`: el `.map` devuelve un array de Promises. Hay que
  resolverlas con `Promise.all`:
  ```javascript
  return Promise.all(usuario.amigos.map(async id => (await obtenerUsuario(id)).nombre));
  ```
- `tieneAmigo`: falta `await`:
  ```javascript
  const usuario = await obtenerUsuario(usuarioId);
  ```
- `totalDeAmigos`: hacer en paralelo con `Promise.all`:
  ```javascript
  const usuarios = await Promise.all(usuarioIds.map(obtenerUsuario));
  return usuarios.reduce((acc, u) => acc + u.amigos.length, 0);
  ```

---

## Tips transversales

- **Conditional breakpoint con logpoint** en VS Code: se puede combinar.
  Ej: "Log Message" con condicion en otra Expression.
- **`Debugger statement`** en JS es analogo a `breakpoint()` en Python: causa
  que el debugger se detenga si esta adjunto.
- **`node --inspect-brk`** vs **`node --inspect`**: el `-brk` espera a que se
  conecte el debugger antes de empezar a ejecutar. Util para debuggear desde
  el primer `console.log`.
