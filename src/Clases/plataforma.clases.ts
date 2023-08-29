export class Plataforma {
    private posicionEnX : number;
    private posicionEnY : number;
    private anchoX : number;
    private altoY : number;
    
        constructor(posicionEnX : number, posicionEnY : number, anchoX : number, altoY : number){
            this.posicionEnX = posicionEnX;
            this.posicionEnY = posicionEnY;
            this.anchoX = anchoX;
            this.altoY = altoY;
        }
    
        traerX(): number {
            return this.posicionEnX;
        }
        traerY(): number {
            return this.posicionEnY;
        }
        traerAnchoX(): number {
            return this.anchoX;
        }
        traerAltoY(): number {
            return this.altoY;
        }
    
        dibujar(ctx: CanvasRenderingContext2D | null){
            if (ctx) {
                ctx.fillStyle = 'green';
                ctx.fillRect(this.posicionEnX,this.posicionEnY,this.anchoX,this.altoY);
            }
        }
    }
    
    const arrayPlataforma = [
        new Plataforma(0,250,1630,10),
        new Plataforma(800,350,700,10),
        new Plataforma(320,550,1250,10),
        new Plataforma(520,650,550,10)
    ]
    
    export{
        arrayPlataforma
    }