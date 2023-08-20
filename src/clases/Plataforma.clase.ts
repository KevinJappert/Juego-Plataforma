
export class Plataforma {
    private x: number;
    private y: number;
    private ancho: number;
    private altoY: number;

    constructor(x: number, y: number, ancho: number, altoY: number) {
        //Esta parte mas adelante la podemos poner como herencia
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.altoY = altoY;

    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    getAncho(): number {
        return this.ancho;
    }

    getAlto(): number {
        return this.altoY;
    }

    dibujar(ctx: CanvasRenderingContext2D | null) {
        if (ctx) {
            ctx.fillStyle = 'green';
            ctx.fillRect(this.x, this.y, this.ancho, this.altoY);
        }
    }
}

const arrayPlataformas = [
    new Plataforma(0, 250, 700, 10),
    new Plataforma(120, 350, 500, 10)
];

export {
    arrayPlataformas,
}