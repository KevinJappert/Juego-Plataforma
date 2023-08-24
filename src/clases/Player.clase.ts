import { arrayPlataformas } from "./Plataforma.clase";
export class Player {

    private posicionEnX: number;
    private posicionEnY: number;
    private anchoX: number;
    private altoY: number;
    private velocidadPlayer: number;
    private yVelocity: number; // Velocidad vertical para la gravedad
    private salto: boolean; // Bandera para controlar si está saltando

    constructor(posicionEnX: number, posicionEnY: number, anchoX: number, altoY: number, speed: number) {
        this.posicionEnX = posicionEnX;
        this.posicionEnY = posicionEnY;
        this.anchoX = anchoX;
        this.altoY = altoY;
        this.velocidadPlayer = speed;
        this.yVelocity = 0;
        this.salto = false;
    }

    traerY(): number {
        return this.posicionEnY;
    }

    traerAlto(): number {
        return this.altoY;
    }

    traerX(): number {
        return this.posicionEnX
    }

    traerAncho(): number {
        return this.anchoX;
    }

    traerVelocidadY(): number {
        return this.yVelocity;
    }

    reiniciarPosicion() {
        this.posicionEnX = 50; // Valores iniciales de posición
        this.posicionEnY = 50; // Valores iniciales de posición
        this.yVelocity = 0; // Restablecer la velocidad vertical
        this.salto = false; // Restablecer la bandera de salto
    }

    // Asegurarse de que el jugador no se salga del canvas
    moverIzquierda() {
        if (this.posicionEnX > 0) {
            this.posicionEnX -= this.velocidadPlayer;
        }
    }

    moverDerecha() {
        if (this.posicionEnX + this.anchoX < 800) { // Ancho del canvas
            this.posicionEnX += this.velocidadPlayer;
        }
    }

    metodoSalto() {
        if (!this.salto || this.posicionEnY + this.altoY === 600) { // Verifica si el jugador está en el suelo
            this.yVelocity = -10; // Aplicar un impulso hacia arriba
            this.salto = true;
        }
    }
    

    aplicarGravedad() {
        this.yVelocity += 0.4; // Incrementar la velocidad vertical debido a la gravedad

        // Actualizar la posición vertical
        this.posicionEnY += this.yVelocity;

        // Restringir el jugador para que no caiga por debajo del suelo
        if (this.posicionEnY + this.altoY > 600) {
            this.yVelocity = 0;
            this.posicionEnY = 600 - this.altoY; // Asegurarse de que el jugador no caiga por debajo del suelo
        }


        arrayPlataformas.forEach(plataforma => {
            if (
                this.posicionEnY + this.altoY >= plataforma.traerY() && // Colisión vertical (parte inferior del jugador)
                this.posicionEnY < plataforma.traerY() + plataforma.traerAlto() && // Colisión vertical (parte superior del jugador)
                this.posicionEnX + this.anchoX > plataforma.traerX() && // Colisión horizontal (lado derecho del jugador)
                this.posicionEnX < plataforma.traerX() + plataforma.traerAncho() // Colisión horizontal (lado izquierdo del jugador)
            ) {
                if (this.yVelocity > 0) {
                    // El jugador está cayendo y colisiona con la plataforma desde abajo
                    this.yVelocity = 0;
                    this.salto = false;
                    this.posicionEnY = plataforma.traerY() - this.altoY; // Alinear el jugador con la parte superior de la plataforma
                } else if (this.yVelocity < 0) {
                    // El jugador está saltando hacia arriba, pero colisiona con la plataforma
                    // Detén el salto y cambia la dirección de la velocidad vertical para hacerlo caer
                    this.yVelocity = 0;
                    this.salto = false;
                    this.posicionEnY = plataforma.traerY() + plataforma.traerAlto(); // Alinear el jugador con la parte inferior de la plataforma
                } else {
                    // El jugador está encima de la plataforma
                    this.yVelocity = 0;
                    this.salto = false;
                    this.posicionEnY = plataforma.traerY() - this.altoY; // Alinear el jugador con la parte superior de la plataforma
                }
            }
        });
        
    }


    dibujar(ctx: CanvasRenderingContext2D | null) {
        if (ctx) {
            ctx.fillStyle = 'blue';
            ctx.fillRect(this.posicionEnX, this.posicionEnY, this.anchoX, this.altoY);
        }
    }

    detenerjugador() {
        this.velocidadPlayer = 0;
    }


    cargar() {

        this.aplicarGravedad(); // Llamada en cada actualización para aplicar la gravedad
    }

}
//VELOCIDAD EXPLICADA DEL MOVIMIENTO
// El algoritmo detrás de esto es bastante simple:
// en cada actualización del bucle de juego,
// el valor de la posición horizontal del personaje (la propiedad x)
// se modifica sumándole o restándole el valor de velocidad
// multiplicado por el tiempo transcurrido desde la última actualización.
// Esto se conoce como "movimiento basado en velocidad" y se basa en la fórmula: