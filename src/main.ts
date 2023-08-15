import './style.css';
import { Player } from './clases/Player.clase';
import {  Plataforma,arrayPlataformas } from './clases/Plataforma.clase';

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

    function gameLoop() {
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            if (moveLeftKeyPressed) {
              player.moveLeft();
          }
  
          if (moveRightKeyPressed) {
              player.moveRight();
          }  

            player.update();
            player.dibujar(ctx);

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
