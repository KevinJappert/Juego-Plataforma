import { Jugador } from "../Clases/jugador.clase";


export function chequearVictoria(jugador1 : Jugador, canvas: HTMLCanvasElement) {
    const jugadorEnPosicionY = jugador1.traerPosicionY() + jugador1.traerAltoY();
    const jugadorEnPosicionX = jugador1.traerPosicionX();
  
    return jugadorEnPosicionY >= canvas.height && jugadorEnPosicionX <= 0; 
  }
  
  export function mostrarVentanaDeVictoria(ctx : CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '30px Arial';
    ctx.fillStyle = 'green';
    ctx.textAlign = 'center';
    ctx.fillText('¡Ganaste! Ahora supera el próximo nivel', canvas.width / 2, canvas.height / 2);
  }
  