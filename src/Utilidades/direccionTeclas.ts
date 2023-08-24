import { Player } from '../clases/Player.clase';

export class MoverJugador {
    private player: Player;
    private moveLeftKeyPressed: boolean;
    private moveRightKeyPressed: boolean;

    constructor(player: Player) {
        this.player = player;
        this.moveLeftKeyPressed = false;
        this.moveRightKeyPressed = false;

        document.addEventListener('keydown', this.teclaAbajo.bind(this));
        document.addEventListener('keyup', this.teclaArriba.bind(this));
    }

    private teclaAbajo(event: KeyboardEvent) {
        if (event.key === 'ArrowLeft') {
            this.moveLeftKeyPressed = true;
        } else if (event.key === 'ArrowRight') {
            this.moveRightKeyPressed = true;
        } else if (event.key === 'ArrowUp') {
            this.player.metodoSalto(); // Llamar al método de salto del jugador
        }
    }

    private teclaArriba(event: KeyboardEvent) {
        if (event.key === 'ArrowLeft') {
            this.moveLeftKeyPressed = false;
        } else if (event.key === 'ArrowRight') {
            this.moveRightKeyPressed = false;
        }
    }

    public cargar() {
        if (this.moveLeftKeyPressed) {
            this.player.moverIzquierda();
        }

        if (this.moveRightKeyPressed) {
            this.player.moverDerecha();
        }
    }
}
