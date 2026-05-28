@echo off
setlocal enabledelayedexpansion

echo === Configuracion del ambiente Node ===

REM Verificar que Node esta instalado
node --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ERROR: Node.js no esta instalado o no esta en el PATH.
    echo Por favor, descargalo desde https://nodejs.org/ ^(version 18 o superior^).
    exit /b 1
)

REM Verificar version >= 18
for /f "tokens=1 delims=." %%v in ('node -p "process.versions.node"') do set NODE_MAJOR=%%v
if !NODE_MAJOR! lss 18 (
    echo ERROR: Se requiere Node.js 18 o superior. Version actual:
    node --version
    exit /b 1
)
for /f "tokens=*" %%v in ('node --version 2^>^&1') do echo [OK] Node %%v instalado

REM No hay dependencias externas, asi que no hace falta npm install.
echo [OK] Sin dependencias externas a instalar.

echo.
echo === [OK] Configuracion completada ===
echo Para correr los tests de los ejercicios (deberian FALLAR — los bugs son intencionales):
echo   npm test
echo.
echo Para correr una demo:
echo   node demo\01_async_sin_await.js
echo.
