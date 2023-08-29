// utils.ts
import { Jugador } from "../Clases/jugador.clase";
import { Enemigo } from "../Clases/enemigo.clases";

// Función para detectar colisiones entre dos objetos rectangulares
export function colisionEntreObjetos(jugador: Jugador, enemigo: Enemigo): boolean {
    return (
        jugador.traerPosicionX() < enemigo.traerXEnemigo() + enemigo.traerAnchoEnemigo() &&
        jugador.traerPosicionX() + jugador.traerAnchoX() > enemigo.traerXEnemigo() &&
        jugador.traerPosicionY() < enemigo.traerYEnemigo() + enemigo.traerAltoEnemigo() &&
        jugador.traerPosicionY() + jugador.traerAltoY() > enemigo.traerYEnemigo()
    );
    
}

// Función para reiniciar el juego
export function reiniciarJuego(jugador: Jugador, enemigos: Enemigo[], canvas: HTMLCanvasElement): void {
    // Reiniciar la posición del jugador
    jugador.reiniciarPosicion();
    

    // Reiniciar la posición de los enemigos
    enemigos.forEach(enemigo => {
        enemigo.reiniciarPosicion(canvas);
    });

    // Otras acciones de reinicio que puedas necesitar
}