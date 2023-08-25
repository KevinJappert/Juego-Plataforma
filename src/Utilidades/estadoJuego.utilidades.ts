// Variable que indica si el juego está en pausa o no
export let isPaused = false;

// Variable para almacenar el tiempo de pausa
let pauseTime = 0;

// Variable para almacenar el último valor de timestamp
let lastTimestamp: number;

// Callback para el bucle de juego
let gameLoopCallback: ((timestamp: number) => void) | null = null;

// Establecer el callback del bucle de juego
export function setGameLoopCallback(callback: (timestamp: number) => void) {
    gameLoopCallback = callback;
}

// Función del bucle de juego
function gameLoop(timestamp: number) {
    if (!lastTimestamp) {
        lastTimestamp = timestamp;
    }

    // Si el juego está en pausa, actualizar el tiempo de pausa
    if (isPaused) {
        pauseTime = timestamp - lastTimestamp;
        return;
    }

    // Calcular el tiempo transcurrido teniendo en cuenta la pausa
    lastTimestamp = timestamp - pauseTime;

    // Ejecutar el callback del bucle de juego si está definido
    if (gameLoopCallback) {
        gameLoopCallback(lastTimestamp);
    }

    // Continuar el bucle de juego
    requestAnimationFrame(gameLoop);
}

// Iniciar el bucle de juego con un timestamp inicial
export function startGameLoop(initialTimestamp: number) {
    lastTimestamp = initialTimestamp;
    gameLoop(initialTimestamp);
}

// Pausar el juego
export function pauseGame() {
    isPaused = true;
    pauseTime = performance.now();
}

// Reanudar el juego
export function resumeGame() {
    if (isPaused) {
        const currentTime = performance.now();
        pauseTime = currentTime - pauseTime;
        isPaused = false;
        startGameLoop(currentTime);
    }
}

// Interfaz que define el estado del juego
export interface EstadoJuego {
    isPaused: boolean;
    lastTimestamp: number;
    pauseTime: number;
}

// Estado inicial del juego
export const estadoJuego: EstadoJuego = {
    isPaused: false,
    lastTimestamp: 0,
    pauseTime: 0
};
