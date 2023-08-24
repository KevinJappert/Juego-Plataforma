import './style.css';
import { Player } from './clases/Player.clase';
import { arrayPlataformas } from './clases/Plataforma.clase';
import { Enemigo } from './clases/Enemigo.clase';
import { colisionEntreObjetos, reiniciarJuego } from './Utilidades/funciones.utilidades';
import { MoverJugador } from './Utilidades/direccionTeclas';
import { iniciarCanvas } from './clases/iniciarCanvas.clase';

const canvas = iniciarCanvas.initCanvas(800, 600);
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const jugador = new Player(50, 50, 40, 40, 8);

const enemigos: Enemigo[] = [];

for (let i = 0; i < 5; i++) {
    const xEnemigo = Math.random() * canvas.width;
    const yEnemigo = Math.random() * canvas.height;
    const anchoEnemigo = 30;
    const altoEnemigo = 30;
    const velocidadEnemigo = 2 + Math.random() * 2;
    const enemigo = new Enemigo(xEnemigo, yEnemigo, anchoEnemigo, altoEnemigo, velocidadEnemigo);
    enemigos.push(enemigo);
}

const direccionJugador = new MoverJugador(jugador);

let isPaused = false;
let lastTimestamp = 0;
let pauseTime = 0; // Tiempo de pausa acumulado

window.addEventListener('blur', () => {
    isPaused = true;
    pauseTime = performance.now(); // Guardar el momento en que se pausó el juego
});

window.addEventListener('focus', () => {
    if (isPaused) {
        const currentTime = performance.now();
        pauseTime = currentTime - pauseTime; // Calcular el tiempo acumulado de pausa
        isPaused = false;
        startGameLoop(currentTime); // Pasar el tiempo actual al reiniciar el bucle
    }
});

const pausarBtn = document.getElementById('pausar-btn') as HTMLButtonElement;

pausarBtn.addEventListener('click', () => {
    if (!isPaused) {
        isPaused = true;
        pauseTime = performance.now() - lastTimestamp; // Calcular el tiempo acumulado de pausa
    } else {
        isPaused = false;
        startGameLoop(performance.now() - pauseTime); // Pasar el tiempo actual ajustado al reiniciar el bucle
    }
});

function gameLoop(timestamp: number) {
    if (!lastTimestamp) {
        lastTimestamp = timestamp;
    }

    if (isPaused) {
        pauseTime = timestamp - lastTimestamp; // Actualizar el tiempo acumulado de pausa
        return; // Salir del bucle si está en pausa
    }

    lastTimestamp = timestamp - pauseTime; // Ajustar el último timestamp con el tiempo de pausa acumulado

    if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        enemigos.forEach(enemigo => {
            enemigo.dibujar(ctx);
            enemigo.cargarPosicion(canvas.width, canvas.height);

            if (colisionEntreObjetos(jugador, enemigo)) {
                reiniciarJuego(jugador, enemigos, canvas);
            }
        });

        arrayPlataformas.forEach(plataforma => {
            plataforma.dibujar(ctx);
        });

        let hasWon = jugador.traerY() + jugador.traerAlto() >= canvas.height && jugador.traerX() <= 0;

        if (hasWon) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = '30px Arial';
            ctx.fillStyle = 'green';
            ctx.textAlign = 'center';
            ctx.fillText('¡Ganaste! Ahora supera el próximo nivel', canvas.width / 2, canvas.height / 2);
        } else {
            jugador.cargar();
            jugador.dibujar(ctx);
        }

        direccionJugador.cargar();
    }

    requestAnimationFrame(gameLoop);
}

function startGameLoop(initialTimestamp: number) {
    lastTimestamp = initialTimestamp; // Inicializar el último timestamp con el tiempo actual
    gameLoop(initialTimestamp);
}

startGameLoop(performance.now());
