// 1. Estado interno de la billetera
let balanceActual = 0;

// 2. Referencias del DOM (Guardar los elementos en constantes es una mejor práctica)
const inputMonto = document.getElementById("monto");
const vistaSaldo = document.getElementById("saldo");
const cajaMensaje = document.getElementById("mensaje");

// 3. Funciones auxiliares (Usando funciones flecha modernas)
const refrescarPantalla = () => {
    vistaSaldo.textContent = `$${balanceActual.toFixed(2)}`;
};

const lanzarAlerta = (texto, colorClase) => {
    cajaMensaje.textContent = texto;
    // Mantenemos la estructura del diseño oscuro, solo cambiamos el color dinámico
    cajaMensaje.className = `mt-6 text-center text-sm font-bold min-h-[24px] ${colorClase}`;
    
    // Un toque extra: el mensaje desaparece solo después de 3.5 segundos
    setTimeout(() => {
        cajaMensaje.textContent = "";
    }, 3500);
};

// 4. Funciones Principales (Conectadas a los botones del HTML)

function depositar() {
    const cantidad = parseFloat(inputMonto.value);

    // Validación: Si no es un número o es menor a 0, detenemos la función aquí
    if (isNaN(cantidad) || cantidad <= 0) {
        lanzarAlerta("⚠️ Por favor, ingresa un monto válido a abonar.", "text-yellow-400");
        return; 
    }

    // Si pasa la validación, hacemos la matemática
    balanceActual += cantidad;
    refrescarPantalla();
    lanzarAlerta("✅ Abono procesado correctamente.", "text-teal-400");
    inputMonto.value = ""; // Limpiamos la caja de texto por comodidad
}

function retirar() {
    const cantidad = parseFloat(inputMonto.value);

    // Validación 1: Que sea un número válido
    if (isNaN(cantidad) || cantidad <= 0) {
        lanzarAlerta("⚠️ Por favor, ingresa un monto válido a extraer.", "text-yellow-400");
        return;
    }

    // Validación 2: Que no intente sacar más de lo que tiene
    if (cantidad > balanceActual) {
        lanzarAlerta("❌ Fondos insuficientes en la billetera.", "text-rose-400");
        return;
    }

    // Si pasa ambas validaciones, descontamos el dinero
    balanceActual -= cantidad;
    refrescarPantalla();
    lanzarAlerta("💸 Extracción completada.", "text-blue-400");
    inputMonto.value = ""; // Limpiamos la caja de texto
}

function consultarSaldo() {
    lanzarAlerta(`💰 Tu balance disponible es: $${balanceActual.toFixed(2)}`, "text-gray-300");
}