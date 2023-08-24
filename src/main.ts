import './style.css';
import { Player } from './clases/Player.clase';
import { arrayPlataformas } from './clases/Plataforma.clase';
import { Enemigo } from './clases/Enemigo.clase';
import { colisionEntreObjetos, reiniciarJuego } from './Utilidades/funciones.utilidades';
import { MoverJugador } from './Utilidades/direccionTeclas';
import { iniciarCanvas } from './clases/iniciarCanvas.clase';

    const canvas = iniciarCanvas.initCanvas( 800, 600);
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    const jugador = new Player(50, 50, 40, 40, 8);

    const enemigos: Enemigo[] = []; // Array para almacenar personajes

    // Crear personajes enemigos y agregar al array
    for (let i = 0; i < 5; i++) {
        const xEnemigo = Math.random() * canvas.width;
        const yEnemigo = Math.random() * canvas.height;
        const anchoEnemigo = 30;
        const altoEnemigo = 30;
        const velocidadEnemigo = 2 + Math.random() * 2;
        const enemigo = new Enemigo(xEnemigo, yEnemigo, anchoEnemigo, altoEnemigo, velocidadEnemigo);
        enemigos.push(enemigo);
    }

    
    const direccionJugador = new MoverJugador(jugador); // Crea una instancia de InputHandler

// Función principal del bucle de juego
function gameLoop() {
    // Verificar si canvas y ctx existen
    if (canvas && ctx) {
        // Borrar el contenido previo del canvas en cada iteración
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dibujar y actualizar enemigos
        enemigos.forEach(enemigo => {
            enemigo.dibujar(ctx);
            enemigo.cargarPosicion(canvas.width, canvas.height);

            // Verificar colisión entre jugador y enemigo
            if (colisionEntreObjetos(jugador, enemigo)) {
                reiniciarJuego(jugador, enemigos, canvas);
            }
        });

        // Dibujar plataformas
        arrayPlataformas.forEach(plataforma => {
            plataforma.dibujar(ctx);
        });

        // Verificar si el jugador ha ganado
        let hasWon = jugador.traerY() + jugador.traerAlto() >= canvas.height && jugador.traerX() <= 0;

        // Mostrar mensaje de victoria si el jugador ha ganado
        if (hasWon) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = '30px Arial';
            ctx.fillStyle = 'green';
            ctx.textAlign = 'center';
            ctx.fillText('¡Ganaste! Ahora supera el próximo nivel', canvas.width / 2, canvas.height / 2);
        } else {
            // Actualizar y dibujar al jugador si no ha ganado
            jugador.cargar();
            jugador.dibujar(ctx);
        }

        // Actualizar la dirección del jugador
        direccionJugador.cargar();
    }

    // Solicitar la siguiente animación del bucle de juego
    requestAnimationFrame(gameLoop);
}

// Iniciar el bucle del juego
gameLoop();
