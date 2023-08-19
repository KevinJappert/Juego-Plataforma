export class Enemigo {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;

    constructor(x: number, y: number, width: number, height: number, speed: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }

    reiniciarPosicion(canvas: HTMLCanvasElement) {
        this.x = Math.random() * canvas.width; // Nueva posición x aleatoria
        this.y = Math.random() * canvas.height; // Nueva posición y aleatoria
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    updatePosition(canvasWidth: number, canvasHeight: number) {
        // Generar un cambio de posición aleatorio
        this.x += this.speed * (Math.random() < 0.5 ? -1 : 1);
        this.y += this.speed * (Math.random() < 0.5 ? -1 : 1);

        // Mantener al personaje dentro de los límites del canvas
        if (this.x + this.width > canvasWidth) {
            this.x = canvasWidth - this.width;
        }
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.y + this.height > canvasHeight) {
            this.y = canvasHeight - this.height;
        }
        if (this.y < 0) {
            this.y = 0;
        }
    }
}



