# Node Debugging Example

> **Aviso:** repo didactico con bugs intencionales en JavaScript para practicar
> el debugger de Node.js.

## Estructura

```
node-debugging-example/
├── demo/                           # Ejemplos anotados para usar en clase
│   ├── 01_async_sin_await.js       # Promise vs valor resuelto
│   ├── 02_promise_rejection.js     # UnhandledPromiseRejection
│   ├── 03_closure_var_loop.js      # var vs let en loops
│   ├── 04_event_loop.js            # Orden de microtasks vs macrotasks
│   ├── 05_paralelo_vs_serie.js     # await en serie cuando podria ser Promise.all
│   ├── 06_this_perdido.js          # this perdido al pasar metodo como callback
│   └── 07_breakpoint_condicional.js  # Bug en 1 de 1000 → breakpoint condicional
├── ejercicios/                     # Bugs sin solucion a la vista
│   ├── carrito.js + carrito.test.js
│   └── async.js   + async.test.js
├── package.json
├── .vscode/launch.json             # F5 listo para usar
├── INSTRUCTOR.md                   # Soluciones y guion
└── README.md
```

## Requisitos

- **Node.js 18+** (los ejercicios usan `node --test`, builtin desde 18).

```bash
node --version  # debe ser >= 18
```

No hay dependencias externas, asi que **no hace falta** `npm install`.

**Setup automatico** (verifica Node y muestra los comandos para empezar):

```bash
setup.bat        # Windows
./setup.sh       # Linux/macOS
```

## Correr

**Demos** (sin debugger):

```bash
node demo/01_async_sin_await.js
node demo/02_promise_rejection.js
# ...
```

**Demos con debugger:**
- Abrir el archivo en VS Code.
- F5 (config "Node: archivo actual").

**Ejercicios** (correr los tests):

```bash
npm test
# o uno solo:
npm run test:carrito
npm run test:async
```

**Ejercicios con debugger:**
- Abrir el archivo de tests (`carrito.test.js` o `async.test.js`).
- F5 (config "Node: test del archivo actual"). Esto corre el archivo con
  `node --test` y permite poner breakpoints tanto en los tests como en el
  codigo de produccion.

## Conceptos cubiertos

| Concepto                              | Demo                  |
|---------------------------------------|-----------------------|
| Inspeccion de Promises en debugger    | 01, 02, 05            |
| Pause on caught/uncaught exceptions   | 02                    |
| Scope panel (closure)                 | 03                    |
| Call stack durante async              | 04                    |
| Logpoint con tiempos                  | 05                    |
| Watch en `this`                       | 06                    |
| Breakpoint condicional                | 07                    |

## Debugger desde la linea de comandos

Si no tenes VS Code a mano, Node trae un inspector built-in:

```bash
node inspect demo/01_async_sin_await.js
```

Comandos basicos del REPL del inspector:

| Comando        | Que hace                              |
|----------------|---------------------------------------|
| `n`            | next (Step Over)                      |
| `s`            | step (Step Into)                      |
| `o`            | out (Step Out)                        |
| `c`            | continue                              |
| `repl`         | abrir un REPL en el contexto actual   |
| `sb('archivo.js', 10)` | setear breakpoint en linea 10  |
| `exec <expr>`  | evaluar una expresion                 |

O bien:

```bash
node --inspect-brk demo/01_async_sin_await.js
```

Y conectar Chrome DevTools desde `chrome://inspect`.

## Ver tambien

- [`INSTRUCTOR.md`](INSTRUCTOR.md) — soluciones y guion.
- Documentacion: <https://nodejs.org/en/learn/getting-started/debugging>.
