import { arrayPlataformas } from "./Plataforma.clase";
export class Player {

    private x: number;
    private y: number;
    private anchoX: number;
    private altoY: number;
    private speed: number;
    private yVelocity: number; // Velocidad vertical para la gravedad
    private isJumping: boolean; // Bandera para controlar si está saltando

    constructor(x: number, y: number, anchoX: number, altoY: number, speed: number) {
        this.x = x;
        this.y = y;
        this.anchoX = anchoX;
        this.altoY = altoY;
        this.speed = speed;
        this.yVelocity = 0;
        this.isJumping = false;
    }

    getY(): number {
        return this.y;
    }

    getAlto(): number {
        return this.altoY;
    }

    getX(): number {
        return this.x
    }

    reiniciarPosicion() {
        this.x = 50; // Valores iniciales de posición
        this.y = 50; // Valores iniciales de posición
        this.yVelocity = 0; // Restablecer la velocidad vertical
        this.isJumping = false; // Restablecer la bandera de salto
    }

    // Asegurarse de que el jugador no se salga del canvas
    moveLeft() {
        if (this.x > 0) {
            this.x -= this.speed;
        }
    }

    moveRight() {
        if (this.x + this.anchoX < 800) { // Ancho del canvas
            this.x += this.speed;
        }
    }

    jump() {
        if (!this.isJumping || this.y + this.altoY === 600) { // Verifica si el jugador está en el suelo
            this.yVelocity = -10; // Aplicar un impulso hacia arriba
            this.isJumping = true;
        }
    }
    

    applyGravity() {
        this.yVelocity += 0.3; // Incrementar la velocidad vertical debido a la gravedad

        // Actualizar la posición vertical
        this.y += this.yVelocity;

        // Restringir el jugador para que no caiga por debajo del suelo
        if (this.y + this.altoY > 600) {
            this.yVelocity = 0;
            this.y = 600 - this.altoY; // Asegurarse de que el jugador no caiga por debajo del suelo
        }


        arrayPlataformas.forEach(plataforma => {
            if (
                this.y + this.altoY >= plataforma.getY() && // Colisión vertical (parte inferior del jugador)
                this.y < plataforma.getY() + plataforma.getAlto() && // Colisión vertical (parte superior del jugador)
                this.x + this.anchoX > plataforma.getX() && // Colisión horizontal (lado derecho del jugador)
                this.x < plataforma.getX() + plataforma.getAncho() // Colisión horizontal (lado izquierdo del jugador)
            ) {
                if (this.yVelocity > 0) {
                    // El jugador está cayendo y colisiona con la plataforma desde abajo
                    this.yVelocity = 0;
                    this.isJumping = false;
                    this.y = plataforma.getY() - this.altoY; // Alinear el jugador con la parte superior de la plataforma
                } else if (this.yVelocity < 0) {
                    // El jugador está saltando hacia arriba, pero colisiona con la plataforma
                    // Detén el salto y cambia la dirección de la velocidad vertical para hacerlo caer
                    this.yVelocity = 0;
                    this.isJumping = false;
                    this.y = plataforma.getY() + plataforma.getAlto(); // Alinear el jugador con la parte inferior de la plataforma
                } else {
                    // El jugador está encima de la plataforma
                    this.yVelocity = 0;
                    this.isJumping = false;
                    this.y = plataforma.getY() - this.altoY; // Alinear el jugador con la parte superior de la plataforma
                }
            }
        });
        
    }


    dibujar(ctx: CanvasRenderingContext2D | null) {
        if (ctx) {
            ctx.fillStyle = 'blue';
            ctx.fillRect(this.x, this.y, this.anchoX, this.altoY);
        }
    }

    detenerjugador() {
        this.speed = 0;
    }


    update() {

        this.applyGravity(); // Llamada en cada actualización para aplicar la gravedad
    }

}
//VELOCIDAD EXPLICADA DEL MOVIMIENTO
// El algoritmo detrás de esto es bastante simple:
// en cada actualización del bucle de juego,
// el valor de la posición horizontal del personaje (la propiedad x)
// se modifica sumándole o restándole el valor de velocidad
// multiplicado por el tiempo transcurrido desde la última actualización.
// Esto se conoce como "movimiento basado en velocidad" y se basa en la fórmula:
