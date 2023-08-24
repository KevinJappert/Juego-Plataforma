import { Player } from '../clases/Player.clase';

export class MoverJugador {
    private jugador: Player;
    private moverIzquierdaPresionado: boolean;
    private moverDerechaPresionado: boolean;

    constructor(jugador: Player) {
        this.jugador = jugador;
        this.moverIzquierdaPresionado = false;
        this.moverDerechaPresionado = false;

        document.addEventListener('keydown', this.teclaAbajo.bind(this));
        document.addEventListener('keyup', this.teclaArriba.bind(this));
    }

    private teclaAbajo(event: KeyboardEvent) {
        if (event.key === 'ArrowLeft') {
            this.moverIzquierdaPresionado = true;
        } else if (event.key === 'ArrowRight') {
            this.moverDerechaPresionado = true;
        } else if (event.key === 'ArrowUp') {
            this.jugador.metodoSalto(); // Llamar al método de salto del jugador
        }
    }

    private teclaArriba(event: KeyboardEvent) {
        if (event.key === 'ArrowLeft') {
            this.moverIzquierdaPresionado = false;
        } else if (event.key === 'ArrowRight') {
            this.moverDerechaPresionado = false;
        }
    }

    public cargar() {
        if (this.moverIzquierdaPresionado) {
            this.jugador.moverIzquierda();
        }

        if (this.moverDerechaPresionado) {
            this.jugador.moverDerecha();
        }
    }
}
