export class Plataforma {
    private posicionEnX: number;
    private posicionEnY: number;
    private ancho: number;
    private altoY: number;

    constructor(posicionEnX: number, posicionEnY: number, ancho: number, altoY: number) {
        //Esta parte mas adelante la podemos poner como herencia
        this.posicionEnX = posicionEnX;
        this.posicionEnY = posicionEnY;
        this.ancho = ancho;
        this.altoY = altoY;

    }

    traerX(): number {
        return this.posicionEnX;
    }

    traerY(): number {
        return this.posicionEnY;
    }

    traerAncho(): number {
        return this.ancho;
    }

    traerAlto(): number {
        return this.altoY;
    }

    dibujar(ctx: CanvasRenderingContext2D | null) {
        if (ctx) {
            ctx.fillStyle = 'green';
            ctx.fillRect(this.posicionEnX, this.posicionEnY, this.ancho, this.altoY);
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