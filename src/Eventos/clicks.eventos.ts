import { comenzarJuego , estadoJuego } from '../Utiles/estadoJuego.utiles';
import { jugador1 } from '../main'; // Importar jugador directamente

// Función para agregar manejadores de eventos
export function agregarManejadoresDeEventos() {
    // Obtener el botón de pausa del documento
    const pausarBtn = document.getElementById('pausar-btn') as HTMLButtonElement;

    // Agregar un oyente de eventos al botón de pausa
    pausarBtn.addEventListener('click', () => {
        if (!estadoJuego.estaEnPausa) {
            // Si el juego no está en pausa, pausarlo y guardar el tiempo de pausa
            estadoJuego.estaEnPausa = true;
            estadoJuego.tiempoPausa = performance.now() - estadoJuego.ultimaMarcaTiempo;
        } else {
            // Si el juego está en pausa, reanudarlo y ajustar el tiempo de inicio del bucle
            estadoJuego.estaEnPausa = false;
            comenzarJuego(performance.now() - estadoJuego.tiempoPausa);
        }
    });

    // Obtener el botón de reinicio del documento
    const reiniciarBtn = document.querySelector('.resetear-btn') as HTMLButtonElement;

    // Agregar un oyente de eventos al botón de reinicio
    reiniciarBtn.addEventListener('click', () => {
        // Reiniciar la posición del jugador al hacer clic en el botón de reinicio
        jugador1.reiniciarPosicion();
    });

    // Agregar un oyente de eventos para cuando la ventana pierde el enfoque (blur)
    window.addEventListener('blur', () => {
        // Pausar el juego y guardar el momento en que se pausó
        estadoJuego.estaEnPausa = true;
        estadoJuego.tiempoPausa = performance.now();
    });

    // Agregar un oyente de eventos para cuando la ventana recupera el enfoque (focus)
    window.addEventListener('focus', () => {
        if (estadoJuego.estaEnPausa) {
            // Si el juego estaba en pausa, reanudarlo y ajustar el tiempo de inicio del bucle
            const currentTime = performance.now();
            estadoJuego.tiempoPausa = currentTime - estadoJuego.tiempoPausa; // Calcular el tiempo acumulado de pausa
            estadoJuego.estaEnPausa = false;
            comenzarJuego(currentTime); // Pasar el tiempo actual al reiniciar el bucle
        }
    });
}
