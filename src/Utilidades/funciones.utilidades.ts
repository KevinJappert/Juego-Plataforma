// utils.ts
import { Player } from "../clases/Player.clase";
import { Enemigo } from "../clases/Enemigo.clase";

// Función para detectar colisiones entre dos objetos rectangulares
export function colisionEntreObjetos(player: any, enemigo: any): boolean {
    return (
        player.x < enemigo.x + enemigo.width &&
        player.x + player.anchoX > enemigo.x &&
        player.y < enemigo.y + enemigo.height &&
        player.y + player.altoY > enemigo.y
    );
}

// Función para reiniciar el juego
export function reiniciarJuego(player: Player, enemigos: Enemigo[], canvas: HTMLCanvasElement): void {
    // Reiniciar la posición del jugador
    player.reiniciarPosicion();

    // Reiniciar la posición de los enemigos
    enemigos.forEach(enemigo => {
        enemigo.reiniciarPosicion(canvas);
    });

    // Otras acciones de reinicio que puedas necesitar
}