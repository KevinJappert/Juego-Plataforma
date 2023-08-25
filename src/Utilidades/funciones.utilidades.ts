// utils.ts
import { Player } from "../clases/Player.clase";
import { Enemigo } from "../clases/Enemigo.clase";

// Función para detectar colisiones entre dos objetos rectangulares
export function colisionEntreObjetos(player: Player, enemigo: Enemigo): boolean {
    return (
        player.traerX() < enemigo.traerXEnemigo() + enemigo.traerAnchoEnemigo() &&
        player.traerX() + player.traerAncho() > enemigo.traerXEnemigo() &&
        player.traerY() < enemigo.traerYEnemigo() + enemigo.traerAltoEnemigo() &&
        player.traerY() + player.traerAlto() > enemigo.traerYEnemigo()
    );
    
}

// Función para reiniciar el juego
export function reiniciarJuego(jugador: Player, enemigos: Enemigo[], canvas: HTMLCanvasElement): void {
    // Reiniciar la posición del jugador
    jugador.reiniciarPosicion();
    

    // Reiniciar la posición de los enemigos
    enemigos.forEach(enemigo => {
        enemigo.reiniciarPosicion(canvas);
    });

    // Otras acciones de reinicio que puedas necesitar
}