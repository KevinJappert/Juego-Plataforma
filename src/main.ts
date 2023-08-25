// Importar estilos y clases necesarias
import './style.css';
import { iniciarCanvas } from './clases/iniciarCanvas.clase';
import { Player } from './clases/Player.clase';
import { Enemigo } from './clases/Enemigo.clase';
import { colisionEntreObjetos, reiniciarJuego } from './Utilidades/funciones.utilidades';
import { MoverJugador } from './Utilidades/direccion.utilidades.teclas';
import { estadoJuego  } from './Utilidades/estadoJuego.utilidades';
import { arrayPlataformas } from './clases/Plataforma.clase';
import { agregarManejadoresDeEventos } from './Eventos/clicks'; // Importar función de eventos

// Inicializar el canvas y su contexto
const canvas = iniciarCanvas.initCanvas(800, 600);
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

// Crear al jugador y enemigos
const jugador = new Player(50, 50, 40, 40, 8);
const enemigos: Enemigo[] = [];

// Generar enemigos aleatorios y agregarlos al arreglo
for (let i = 0; i < 5; i++) {
    const xEnemigo = Math.random() * canvas.width;
    const yEnemigo = Math.random() * canvas.height;
    const anchoEnemigo = 30;
    const altoEnemigo = 30;
    const velocidadEnemigo = 2 + Math.random() * 2;
    const enemigo = new Enemigo(xEnemigo, yEnemigo, anchoEnemigo, altoEnemigo, velocidadEnemigo);
    enemigos.push(enemigo);
}

// Crear manejador de movimiento para el jugador
const direccionJugador = new MoverJugador(jugador);

// Agregar manejadores de eventos (pausa, reinicio)
agregarManejadoresDeEventos();

// Función principal del bucle de juego
function gameLoop() {
    if (!estadoJuego.isPaused) {
        if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Dibujar plataformas
            arrayPlataformas.forEach(plataforma => {
                plataforma.dibujar(ctx);
            });

            // Dibujar enemigos y comprobar colisiones
            enemigos.forEach(enemigo => {
                enemigo.dibujar(ctx);
                enemigo.cargarPosicion(canvas.width, canvas.height);

                if (colisionEntreObjetos(jugador, enemigo)) {
                    reiniciarJuego(jugador, enemigos, canvas);
                }
            });

            // Verificar si el jugador ha ganado
            let hasWon = jugador.traerY() + jugador.traerAlto() >= canvas.height && jugador.traerX() <= 0;

            if (hasWon) {
                // Mostrar mensaje de victoria
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.font = '30px Arial';
                ctx.fillStyle = 'green';
                ctx.textAlign = 'center';
                ctx.fillText('¡Ganaste! Ahora supera el próximo nivel', canvas.width / 2, canvas.height / 2);
            } else {
                // Dibujar al jugador y manejar su movimiento
                jugador.cargar();
                jugador.dibujar(ctx);
            }

            // Cargar movimiento del jugador
            direccionJugador.cargar();
        }
    }

    // Continuar con el bucle de juego
    requestAnimationFrame(gameLoop);
}

// Iniciar el bucle del juego
gameLoop();

// Exportar al jugador para usar en otros archivos
export {
    jugador
};
