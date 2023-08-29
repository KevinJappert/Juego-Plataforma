// Variable que indica si el juego está en pausa o no
export let estaEnPausa = false;

// Variable para almacenar el tiempo de pausa
let tiempoPausa = 0;

// Variable para almacenar el último valor de timestamp
let ultimaMarcaTiempo: number;

// Callback para el bucle de juego
let correrJuegoCallBack: ((marcaTiempo: number) => void) | null = null;

// Establecer el callback del bucle de juego
export function setearCorrerJuegoCallBack(callback: (marcaTiempo: number) => void) {
    correrJuegoCallBack = callback;
}

// Función del bucle de juego
function correrJuego(marcaTiempo: number) {
    if (!ultimaMarcaTiempo) {
        ultimaMarcaTiempo = marcaTiempo;
    }

    // Si el juego está en pausa, actualizar el tiempo de pausa
    if (estaEnPausa) {
        tiempoPausa = marcaTiempo - ultimaMarcaTiempo;
        return;
    }

    // Calcular el tiempo transcurrido teniendo en cuenta la pausa
    ultimaMarcaTiempo = marcaTiempo - tiempoPausa;

    // Ejecutar el callback del bucle de juego si está definido
    if (correrJuegoCallBack) {
        correrJuegoCallBack(ultimaMarcaTiempo);
    }

    // Continuar el bucle de juego
    requestAnimationFrame(correrJuego);
}

// Iniciar el bucle de juego con un timestamp inicial
export function comenzarJuego(inicializarMarcaTiempo: number) {
    ultimaMarcaTiempo = inicializarMarcaTiempo;
    correrJuego(inicializarMarcaTiempo);
}

// Pausar el juego
export function juegoPausado() {
    estaEnPausa = true;
    tiempoPausa = performance.now();
}

// Reanudar el juego
export function juegoReanudar() {
    if (estaEnPausa) {
        const tiempoCorrido = performance.now();
        tiempoPausa = tiempoCorrido - tiempoPausa;
        estaEnPausa = false;
        comenzarJuego(tiempoCorrido);
    }
}

// Interfaz que define el estado del juego
export interface EstadoJuego {
    estaEnPausa: boolean;
    ultimaMarcaTiempo: number;
    tiempoPausa: number;
}

// Estado inicial del juego
export const estadoJuego: EstadoJuego = {
    estaEnPausa: false,
    ultimaMarcaTiempo: 0,
    tiempoPausa: 0
};
