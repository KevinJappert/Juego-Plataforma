import './style.css';
import { Player } from './clases/Player.clase';
import {  arrayPlataformas } from './clases/Plataforma.clase';
import { Enemigo } from './clases/Enemigo.clase';

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


    let moveLeftKeyPressed = false;
    let moveRightKeyPressed = false;

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        moveLeftKeyPressed = true;
    } else if (event.key === 'ArrowRight') {
        moveRightKeyPressed = true;
    } else if (event.key === 'ArrowUp') {
        player.jump();
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft') {
        moveLeftKeyPressed = false;
    } else if (event.key === 'ArrowRight') {
        moveRightKeyPressed = false;
    }
});





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
    
    function gameLoop() {
        if ( canvas) {
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            
            if (moveLeftKeyPressed) {
              player.moveLeft();
           }

           if (moveRightKeyPressed) {
              player.moveRight();
           }

           
            if (ctx !== null) {

                enemigos.forEach(enemigo => {
                    enemigo.draw(ctx);
                    enemigo.updatePosition(canvas.width, canvas.height);
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


        }
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
});
