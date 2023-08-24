// import { Player } from "../clases/Player.clase";
// import { Plataforma, arrayPlataformas } from "../clases/Plataforma.clase";
// import { Enemigo } from "../clases/Enemigo.clase";
// import { arrayPlataformas } from "../clases/Plataforma.clase";

// export class chequearColision {
//     constructor() {}

//     detectarColisionPlataforma(player: Player, platforms: Plataforma[]) {
//         // Lógica de detección de colisiones entre el jugador y las plataformas

//          arrayPlataformas.forEach(plataforma => {
//             if (
//                 this.y + this.altoY >= plataforma.getY() && // Colisión vertical (parte inferior del jugador)
//                 this.y < plataforma.getY() + plataforma.getAlto() && // Colisión vertical (parte superior del jugador)
//                 this.x + this.anchoX > plataforma.getX() && // Colisión horizontal (lado derecho del jugador)
//                 this.x < plataforma.getX() + plataforma.getAncho() // Colisión horizontal (lado izquierdo del jugador)
//             ) {
//                 if (this.yVelocity > 0) {
//                     // El jugador está cayendo y colisiona con la plataforma desde abajo
//                     this.yVelocity = 0;
//                     this.isJumping = false;
//                     this.y = plataforma.getY() - this.altoY; // Alinear el jugador con la parte superior de la plataforma
//                 } else if (this.yVelocity < 0) {
//                     // El jugador está saltando hacia arriba, pero colisiona con la plataforma
//                     // Detén el salto y cambia la dirección de la velocidad vertical para hacerlo caer
//                     this.yVelocity = 0;
//                     this.isJumping = false;
//                     this.y = plataforma.getY() + plataforma.getAlto(); // Alinear el jugador con la parte inferior de la plataforma
//                 } else {
//                     // El jugador está encima de la plataforma
//                     this.yVelocity = 0;
//                     this.isJumping = false;
//                     this.y = plataforma.getY() - this.altoY; // Alinear el jugador con la parte superior de la plataforma
//                 }
//             }
//         });
//     }

//     detectarColisionEnemigo(player: Player, enemies: Enemigo[]) {
//         // Lógica de detección de colisiones entre el jugador y los enemigos
//     }
// }
