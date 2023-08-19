import { Player } from '../clases/Player.clase';

export class MoverJugador {
    private player: Player;
    private moveLeftKeyPressed: boolean;
    private moveRightKeyPressed: boolean;

    constructor(player: Player) {
        this.player = player;
        this.moveLeftKeyPressed = false;
        this.moveRightKeyPressed = false;

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    private handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'ArrowLeft') {
            this.moveLeftKeyPressed = true;
        } else if (event.key === 'ArrowRight') {
            this.moveRightKeyPressed = true;
        } else if (event.key === 'ArrowUp') {
            this.player.jump(); // Llamar al método de salto del jugador
        }
    }

    private handleKeyUp(event: KeyboardEvent) {
        if (event.key === 'ArrowLeft') {
            this.moveLeftKeyPressed = false;
        } else if (event.key === 'ArrowRight') {
            this.moveRightKeyPressed = false;
        }
    }

    public update() {
        if (this.moveLeftKeyPressed) {
            this.player.moveLeft();
        }

        if (this.moveRightKeyPressed) {
            this.player.moveRight();
        }
    }
}
