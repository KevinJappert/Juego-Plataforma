
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
    
    moveLeft() {
        this.x -= this.speed;
    }
    
    moveRight() {
        this.x += this.speed;
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
        this.yVelocity += 0.5; // Incrementar la velocidad vertical
        // Simular la gravedad
        if (this.y < 600 - this.altoY) {
            this.yVelocity += 0.5; // Incrementar la velocidad vertical
        } else {
            this.yVelocity = 0;
            this.isJumping = false;
            this.y = 600 - this.altoY; // Evitar que el jugador caiga por debajo del suelo
        }
        this.y += this.yVelocity;

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
