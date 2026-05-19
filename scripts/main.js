
let balanceActual = 0;

const inputMonto = document.getElementById("monto");
const vistaSaldo = document.getElementById("saldo");
// Ya no necesitamos capturar "mensaje" porque usaremos alertas emergentes

// 1. RE-ACTIVAMOS esta función para que el saldo visual se actualice
const refrescarPantalla = () => {
    vistaSaldo.textContent = `$${balanceActual.toFixed(2)}`;
};

// 2. MODIFICAMOS esta función para usar la alerta nativa del navegador
const lanzarAlerta = (texto) => {
    alert(texto);
};

function depositar() {
    const cantidad = parseFloat(inputMonto.value);

    if (isNaN(cantidad) || cantidad <= 0) {
        lanzarAlerta("⚠️ Por favor, ingresa un monto válido a abonar.");
        return; 
    }

    balanceActual += cantidad;
    refrescarPantalla();
    lanzarAlerta("✅ Abono procesado correctamente.");
    inputMonto.value = ""; 
}

function retirar() {
    const cantidad = parseFloat(inputMonto.value);

    if (isNaN(cantidad) || cantidad <= 0) {
        lanzarAlerta("⚠️ Por favor, ingresa un monto válido a extraer.");
        return;
    }

    if (cantidad > balanceActual) {
        lanzarAlerta("❌ Fondos insuficientes en la billetera.");
        return;
    }

    balanceActual -= cantidad;
    refrescarPantalla();
    lanzarAlerta("💸 Extracción completada.");
    inputMonto.value = ""; 
}

function consultarSaldo() {
    lanzarAlerta(`💰 Tu balance disponible es: $${balanceActual.toFixed(2)}`);
}