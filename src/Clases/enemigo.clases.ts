export class Enemigo {
    private posicionEnX: number;
    private posicionEnY: number;
    private anchoX: number;
    private altoY: number;
    private velocidad: number;

    constructor(posicionEnX: number, posicionEnY: number, anchoX: number, altoY: number, velocidad: number) {
        this.posicionEnX = posicionEnX;
        this.posicionEnY = posicionEnY;
        this.anchoX = anchoX;
        this.altoY = altoY;
        this.velocidad = velocidad;
    }

    reiniciarPosicion(canvas: HTMLCanvasElement) {
        this.posicionEnX = Math.random() * canvas.width; // Nueva posición x aleatoria
        this.posicionEnY = Math.random() * canvas.height; // Nueva posición y aleatoria
    }

    dibujar(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.posicionEnX, this.posicionEnY, this.anchoX, this.altoY);
    }

    traerAnchoEnemigo(): number {
        return this.anchoX;
    }
    traerAltoEnemigo(): number {
        return this.altoY;
    }
    traerXEnemigo(): number {
        return this.posicionEnX;
    }
    traerYEnemigo(): number {
        return this.posicionEnY;
    }

    cargarPosicion(anchoCanvas: number, altoCanvas: number) {
        // Generar un cambio de posición aleatorio
        this.posicionEnX += this.velocidad * (Math.random() < 0.5 ? -1 : 1);
        this.posicionEnY += this.velocidad * (Math.random() < 0.5 ? -1 : 1);

        // Mantener al personaje dentro de los límites del canvas
        if (this.posicionEnX + this.anchoX > anchoCanvas) {
            this.posicionEnX = anchoCanvas - this.anchoX;
        }
        if (this.posicionEnX < 0) {
            this.posicionEnX = 0;
        }
        if (this.posicionEnY + this.altoY > altoCanvas) {
            this.posicionEnY = altoCanvas - this.altoY;
        }
        if (this.posicionEnY < 0) {
            this.posicionEnY = 0;
        }
    }
}



