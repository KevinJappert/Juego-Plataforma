
export class Plataforma{
    private x: number;
    private y: number;
    private ancho: number;
    private altoY: number;
    private movimientoDerecha: boolean;

    constructor(x: number, y: number, ancho:number, altoY:number ){
        //Esta parte mas adelante la podemos poner como herencia
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.altoY = altoY;
        this.movimientoDerecha = true;
        
    }

    dibujar(ctx : CanvasRenderingContext2D | null){
        if (ctx) {
            ctx.fillStyle = 'green';
            ctx.fillRect(this.x,this.y,this.ancho,this.altoY);
        }
    }
    // actualizar(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D | null) {
    //     // if (this.movimientoDerecha) {
    //     //     this.x += this.velocidad;
    //     // } else {
    //     //     this.x -= this.velocidad;
    //     // }

    //     // if (this.x + this.ancho >= canvas.width || this.x <= 0) {
    //     //     this.movimientoDerecha = !this.movimientoDerecha;
    //     // }
    // }
}

const arrayPlataformas = [
    new Plataforma(0,250,700,10),
    new Plataforma(120,350,500,10)
];

export {
    arrayPlataformas,
}