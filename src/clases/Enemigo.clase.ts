export class Enemigo {
    private posicionEnX: number;
    private posicionEnY: number;
    private ancho: number;
    private alto: number;
    private velocidad: number;

    constructor(posicionEnX: number, posicionEnY: number, width: number, height: number, speed: number) {
        this.posicionEnX = posicionEnX;
        this.posicionEnY = posicionEnY;
        this.ancho = width;
        this.alto = height;
        this.velocidad = speed;
    }

    reiniciarPosicion(canvas: HTMLCanvasElement) {
        this.posicionEnX = Math.random() * canvas.width; // Nueva posición x aleatoria
        this.posicionEnY = Math.random() * canvas.height; // Nueva posición y aleatoria
    }

    dibujar(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.posicionEnX, this.posicionEnY, this.ancho, this.alto);
    }

    traerAnchoEnemigo(): number {
        return this.ancho;
    }
    traerAltoEnemigo(): number {
        return this.alto;
    }
    traerXEnemigo(): number {
        return this.posicionEnX;
    }
    traerYEnemigo(): number {
        return this.posicionEnY;
    }

    cargarPosicion(canvasWidth: number, canvasHeight: number) {
        // Generar un cambio de posición aleatorio
        this.posicionEnX += this.velocidad * (Math.random() < 0.5 ? -1 : 1);
        this.posicionEnY += this.velocidad * (Math.random() < 0.5 ? -1 : 1);

        // Mantener al personaje dentro de los límites del canvas
        if (this.posicionEnX + this.ancho > canvasWidth) {
            this.posicionEnX = canvasWidth - this.ancho;
        }
        if (this.posicionEnX < 0) {
            this.posicionEnX = 0;
        }
        if (this.posicionEnY + this.alto > canvasHeight) {
            this.posicionEnY = canvasHeight - this.alto;
        }
        if (this.posicionEnY < 0) {
            this.posicionEnY = 0;
        }
    }
}



