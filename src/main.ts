import './style.css';
import { Player } from './clases/Player.clase';
import { arrayPlataformas } from './clases/Plataforma.clase';
import { Enemigo } from './clases/Enemigo.clase';
import { colisionEntreObjetos, reiniciarJuego } from './Utilidades/funciones.utilidades';
import { MoverJugador } from './Utilidades/direccionTeclas';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) {
        throw new Error('Canvas element not found');
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('2D context not supported');
    }

    canvas.width = 800;
    canvas.height = 600;

    const player = new Player(50, 50, 40, 40, 10);

    const enemigos: Enemigo[] = []; // Array para almacenar personajes

    // Crear personajes y agregarlos al array
    for (let i = 0; i < 6; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const width = 30;
        const height = 30;
        const speed = 2 + Math.random() * 2;
        const enemigo = new Enemigo(x, y, width, height, speed);
        enemigos.push(enemigo);
    }



    // const enemigo = new Enemigo(40,40,20,20,3);
    // const enemigo2 = new Enemigo(40,40,20,20,3);

    const direccionJugador = new MoverJugador(player); // Crea una instancia de InputHandler

    function gameLoop() {
        if (canvas) {
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }

            if (ctx !== null) {

                enemigos.forEach(enemigo => {
                    enemigo.draw(ctx);
                    enemigo.updatePosition(canvas.width, canvas.height);

                    //Colision entre jugador y enemigo
                    if (colisionEntreObjetos(player, enemigo)) {
                        reiniciarJuego(player, enemigos, canvas);
                    }
                });
                // enemigo.draw(ctx);
                // enemigo2.draw(ctx);

                // enemigo.updatePosition(canvas.width,canvas.height);
                // enemigo2.updatePosition(canvas.width,canvas.height);
                player.update();
                player.dibujar(ctx);

            }


            arrayPlataformas.forEach(plataforma => {
                plataforma.dibujar(ctx);
                // Llamar a la función actualizar para actualizar las propiedades si es necesario
                // plataforma.actualizar();
            });


            //Cuando Ganas el Juego
            let hasWon = false; // Inicialmente el jugador no ha ganado

            if (player.getY() + player.getAlto() >= canvas.height && player.getX() <= 0) {
                hasWon = true;
            }

            if (hasWon) {
                if (ctx) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.font = '30px Arial';
                    ctx.fillStyle = 'green';
                    ctx.textAlign = 'center';
                    ctx.fillText('¡Ganaste! Ahora supera el próximo nivel', canvas.width / 2, canvas.height / 2);
                }
            } else {
                player.update(); // Actualiza la posición del jugador
                player.dibujar(ctx); // Dibuja al jugador
            }

            direccionJugador.update()
        }

        requestAnimationFrame(gameLoop);
    }

    gameLoop();
});
