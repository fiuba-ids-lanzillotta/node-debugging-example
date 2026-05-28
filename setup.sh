#!/bin/bash

set -e

echo "=== Configuración del ambiente Node ==="

# Verificar e instalar Node si es necesario
if ! command -v node &> /dev/null; then
    echo "Node.js no está instalado. Instalando..."
    if command -v apt-get &> /dev/null; then
        curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
        sudo apt-get install -y nodejs
    elif command -v yum &> /dev/null; then
        curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo -E bash -
        sudo yum install -y nodejs
    elif command -v brew &> /dev/null; then
        brew install node
    else
        echo "No se pudo instalar Node.js automáticamente."
        echo "Por favor, descargalo desde https://nodejs.org/ (versión 18 o superior)."
        exit 1
    fi
else
    echo "✓ Node.js ya está instalado: $(node --version)"
fi

# Verificar version >= 18
NODE_MAJOR=$(node -p "process.versions.node.split('.')[0]")
if [ "$NODE_MAJOR" -lt 18 ]; then
    echo "❌ Error: Se requiere Node.js 18 o superior. Versión actual: $(node --version)"
    exit 1
fi

echo "✓ Sin dependencias externas a instalar."

echo ""
echo "=== ✓ Configuración completada ==="
echo "Para correr los tests de los ejercicios (deberían FALLAR — los bugs son intencionales):"
echo "  npm test"
echo ""
echo "Para correr una demo:"
echo "  node demo/01_async_sin_await.js"
echo ""
