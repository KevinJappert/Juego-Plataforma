// generarElementos.ts
import { Jugador } from '../Clases/jugador.clase';
import { Enemigo } from '../Clases/enemigo.clases';
import {  arrayPlataforma } from '../Clases/plataforma.clases';
import { colisionEntreObjetos, reiniciarJuego } from '../Utiles/funciones.utiles';

export function dibujarEnemigos(ctx: CanvasRenderingContext2D, enemigos: Enemigo[], jugador: Jugador, canvas: HTMLCanvasElement) {
    enemigos.forEach(enemigo => {
        enemigo.dibujar(ctx);
        enemigo.cargarPosicion(canvas.width, canvas.height);

        if (colisionEntreObjetos(jugador, enemigo)) {
            reiniciarJuego(jugador, enemigos, canvas);
        }
    });
}


export function generarEnemigos(anchoCanvas: number, altoCanvas: number, cantidad: number): Enemigo[] {
    const enemigos: Enemigo[] = [];

    for (let i = 0; i < cantidad; i++) {
        const xEnemigo = Math.random() * anchoCanvas;
        const yEnemigo = Math.random() * altoCanvas;
        const anchoEnemigo = 30;
        const altoEnemigo = 30;
        const velocidadEnemigo = 2 + Math.random() * 2;
        const enemigo = new Enemigo(xEnemigo, yEnemigo, anchoEnemigo, altoEnemigo, velocidadEnemigo);
        enemigos.push(enemigo);
    }

    return enemigos;
}

export function generarPlataformas(ctx: CanvasRenderingContext2D) {
    arrayPlataforma.forEach(plataforma => {
        plataforma.dibujar(ctx);
    });
}
