import { Jugador } from "./jugador.clase";

export class MoverJugador {
    private jugador: Jugador;
    private moverIzquierdaPresionado: boolean;
    private moverDerechaPresionado: boolean;

    constructor(jugador: Jugador) {
        // Inicializar el objeto MoverJugador con el jugador proporcionado y banderas de movimiento
        this.jugador = jugador;
        this.moverIzquierdaPresionado = false;
        this.moverDerechaPresionado = false;

        // Agregar oyentes de eventos de teclado
        document.addEventListener('keydown', this.teclaAbajo.bind(this));
        document.addEventListener('keyup', this.teclaArriba.bind(this));
    }

    // Manejador de evento para cuando se presiona una tecla
    private teclaAbajo(event: KeyboardEvent) {
        if (event.key === 'ArrowLeft') {
            this.moverIzquierdaPresionado = true;
        } else if (event.key === 'ArrowRight') {
            this.moverDerechaPresionado = true;
        } else if (event.key === 'ArrowUp') {
            this.jugador.moverSalto(); // Llamar al método de salto del jugador cuando se presiona la tecla de flecha arriba
        }
    }

    // Manejador de evento para cuando se suelta una tecla
    private teclaArriba(event: KeyboardEvent) {
        if (event.key === 'ArrowLeft') {
            this.moverIzquierdaPresionado = false;
        } else if (event.key === 'ArrowRight') {
            this.moverDerechaPresionado = false;
        }
    }

    // Método para actualizar el movimiento del jugador
    public cargar() {
         if (this.moverIzquierdaPresionado) {
            this.jugador.moverIzquierda(); // Mover el jugador hacia la izquierda si la tecla izquierda está presionada
         }
    
         if (this.moverDerechaPresionado) {
            this.jugador.moverDerecha(); // Mover el jugador hacia la derecha si la tecla derecha está presionada
        }
    }
}