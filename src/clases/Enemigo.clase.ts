export class Enemigo {
    private x: number;
    private y: number;
    private ancho: number;
    private alto: number;
    private velocidad: number;

    constructor(x: number, y: number, width: number, height: number, speed: number) {
        this.x = x;
        this.y = y;
        this.ancho = width;
        this.alto = height;
        this.velocidad = speed;
    }

    reiniciarPosicion(canvas: HTMLCanvasElement) {
        this.x = Math.random() * canvas.width; // Nueva posición x aleatoria
        this.y = Math.random() * canvas.height; // Nueva posición y aleatoria
    }

    dibujar(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.ancho, this.alto);
    }

    traerAnchoEnemigo(): number {
        return this.ancho;
    }
    traerAltoEnemigo(): number {
        return this.alto;
    }
    traerXEnemigo(): number {
        return this.x;
    }
    traerYEnemigo(): number {
        return this.y;
    }

    cargarPosicion(canvasWidth: number, canvasHeight: number) {
        // Generar un cambio de posición aleatorio
        this.x += this.velocidad * (Math.random() < 0.5 ? -1 : 1);
        this.y += this.velocidad * (Math.random() < 0.5 ? -1 : 1);

        // Mantener al personaje dentro de los límites del canvas
        if (this.x + this.ancho > canvasWidth) {
            this.x = canvasWidth - this.ancho;
        }
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.y + this.alto > canvasHeight) {
            this.y = canvasHeight - this.alto;
        }
        if (this.y < 0) {
            this.y = 0;
        }
    }
}



