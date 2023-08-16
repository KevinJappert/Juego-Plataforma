import { arrayPlataformas } from "./Plataforma.clase";
export class Player {

    private x: number;
    private y: number;
    private anchoX: number;
    private altoY: number;
    private speed: number;
    private yVelocity: number; // Velocidad vertical para la gravedad
    private isJumping: boolean; // Bandera para controlar si está saltando

    constructor(x: number, y: number, anchoX:number, altoY:number , speed: number) {
        this.x = x;
        this.y = y;
        this.anchoX = anchoX;
        this.altoY = altoY;
        this.speed = speed;
        this.yVelocity = 0;
        this.isJumping = false;
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

    // getPosition() {
    //     return { x: this.x, y: this.y };
    // }

    jump() {
        if (!this.isJumping) {
            this.yVelocity = -10; // Aplicar un impulso hacia arriba
            this.isJumping = true;
        }
    }

    applyGravity() {
        this.yVelocity += 0.4; // Incrementar la velocidad vertical debido a la gravedad
        
        // Actualizar la posición vertical
        this.y += this.yVelocity;
    
        // Restringir el jugador para que no caiga por debajo del suelo
        if (this.y + this.altoY > 600) {
            this.yVelocity = 0;
            this.isJumping = false;
            this.y = 600 - this.altoY; // Asegurarse de que el jugador no caiga por debajo del suelo
        }


            // Verificar colisiones con las plataformas
            arrayPlataformas.forEach(plataforma => {
                if (
                    this.y + this.altoY >= plataforma.getY() && // Colisión vertical
                    this.y < plataforma.getY() + plataforma.getAlto() && // Colisión vertical
                    this.x + this.anchoX > plataforma.getX() && // Colisión horizontal (lado derecho del jugador)
                    this.x < plataforma.getX() + plataforma.getAncho() // Colisión horizontal (lado izquierdo del jugador)
                ) {
                    // El jugador está encima de una plataforma, restablecer posición y velocidad vertical
                    this.yVelocity = 0;
                    this.isJumping = false;
                    this.y = plataforma.getY() - this.altoY; // Alinear el jugador con la parte superior de la plataforma
                }
            });

    }

    





    dibujar(ctx : CanvasRenderingContext2D | null){
        if (ctx) {
            ctx.fillStyle = 'blue';
            ctx.fillRect(this.x,this.y,this.anchoX,this.altoY);
        }
    }

    detenerjugador(){
        this.speed = 0;
    }
    
    
    update() {
      
        this.applyGravity(); // Llamada en cada actualización para aplicar la gravedad
    }

}
