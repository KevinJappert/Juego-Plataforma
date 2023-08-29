import { arrayPlataforma } from "./plataforma.clases";
export class Jugador {
    private posicionEnX: number;
    private posicionEnY: number;
    private anchoX: number;
    private altoY: number;
    private velocidad: number;
    private velocidadYDelSalto: number;
    private salto: boolean;

    constructor(posicionEnX: number, posicionEnY: number, anchoX: number,  altoY: number, velocidad: number){
        this.posicionEnX = posicionEnX;
        this.posicionEnY = posicionEnY;
        this.anchoX = anchoX;
        this.altoY = altoY;
        this.velocidad = velocidad;
        this.velocidadYDelSalto = 0;
        this.salto = false;
    }

    traerPosicionX(): number {
        return this.posicionEnX;
    }

    traerPosicionY(): number {
        return this.posicionEnY;
    }

    traerAnchoX(): number {
        return this.anchoX;
    }

    traerAltoY(): number {
        return this.altoY;
    }

    moverIzquierda(){
        if (this.posicionEnX > 0) {
            this.posicionEnX -= this.velocidad;
        }
    }

    moverDerecha(){
        if (this.posicionEnX + this.anchoX < 1000) {
            this.posicionEnX += this.velocidad;
        }
    }

    moverSalto(){
        if (!this.salto || this.posicionEnY + this.altoY === 800) {
            this.velocidadYDelSalto = -10
            this.salto = true //si dejo en false aca tengo saltos ilimitados
        }
    }

    reiniciarPosicion() {
        this.posicionEnX = 50; // Valores iniciales de posición
        this.posicionEnY = 50; // Valores iniciales de posición
        this.velocidadYDelSalto = 0; // Restablecer la velocidad vertical
        this.salto = false; // Restablecer la bandera de salto
    }

    dibujar(ctx: CanvasRenderingContext2D | null){
        if (ctx) {
            ctx.fillStyle = 'blue';
            ctx.fillRect(this.posicionEnX,this.posicionEnY,this.anchoX,this.altoY)
        }
    }

    aplicarGravedad(){
        this.velocidadYDelSalto += 0.4; //Aumenta velocidad vertical debido a la gravedad

        this.posicionEnY += this.velocidadYDelSalto; //Actualiza la posicion vertical

             // Restringir el jugador para que no caiga por debajo del suelo
             if (this.posicionEnY + this.altoY > 800) {
                this.velocidadYDelSalto = 0;
                this.posicionEnY = 800 - this.altoY; // Asegurarse de que el jugador no caiga por debajo del suelo
            }
            arrayPlataforma.forEach(plataforma => {
                if (
                    this.posicionEnY + this.altoY >= plataforma.traerY() && // Colisión vertical (parte inferior del jugador)
                    this.posicionEnY < plataforma.traerY() + plataforma.traerAltoY() && // Colisión vertical (parte superior del jugador)
                    this.posicionEnX + this.anchoX > plataforma.traerX() && // Colisión horizontal (lado derecho del jugador)
                    this.posicionEnX < plataforma.traerX() + plataforma.traerAnchoX() // Colisión horizontal (lado izquierdo del jugador)
                ) {
                    if (this.velocidadYDelSalto > 0) {
                        // El jugador está cayendo y colisiona con la plataforma desde abajo
                        this.velocidadYDelSalto = 0;
                        this.salto = false;
                        this.posicionEnY = plataforma.traerY() - this.altoY; // Alinear el jugador con la parte superior de la plataforma
                    } else if (this.velocidadYDelSalto < 0) {
                        // El jugador está saltando hacia arriba, pero colisiona con la plataforma
                        // Detén el salto y cambia la dirección de la velocidad vertical para hacerlo caer
                        this.velocidadYDelSalto = 0;
                        this.salto = false;
                        this.posicionEnY = plataforma.traerY() + plataforma.traerAltoY(); // Alinear el jugador con la parte inferior de la plataforma
                    } else {
                        // El jugador está encima de la plataforma
                        this.velocidadYDelSalto = 0;
                        this.salto = false;
                        this.posicionEnY = plataforma.traerY() - this.altoY; // Alinear el jugador con la parte superior de la plataforma
                    }
                }
            });

    }

    cargar(){
        this.aplicarGravedad();//Llamada en cada actualizacion
    }
}