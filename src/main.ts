import './style.css'
import { iniciarCanvas } from './Clases/iniciarCanvas.clases'
import { Jugador } from './Clases/jugador.clase'
import { MoverJugador } from './Clases/moverJugador.clases';
import { generarPlataformas, generarEnemigos, dibujarEnemigos} from './Utiles/generarElementos.utiles';
import { estadoJuego } from './Utiles/estadoJuego.utiles';
import { agregarManejadoresDeEventos } from './Eventos/clicks.eventos';
import { chequearVictoria, mostrarVentanaDeVictoria } from './Utiles/chequearVictoria.utiles';

//Iniciar Canvas y su Contexto
const canvas = iniciarCanvas.iniciar(1000 , 800);
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

//Creamos el jugador
export const jugador1 = new Jugador(50,50,40,40,8);

// Generar enemigos aleatorios y agregarlos al arreglo
const enemigos = generarEnemigos(canvas.width, canvas.height, 5);

//Cramos el manejador de movimientos del jugador
const direccionJugador = new MoverJugador(jugador1);

// Agregar manejadores de eventos (pausa, reinicio)
agregarManejadoresDeEventos();


//Funcion principal
function correrJuego(){
if (!estadoJuego.estaEnPausa ) {
  
  if (canvas && ctx) {
    //Limpiamos canvas
    ctx.clearRect( 0, 0, canvas.width, canvas.height);

    //Dibujamos la plataforma en el bucle
    generarPlataformas(ctx)

    //Dibujamos enemigos y comprobamos colisiones
    dibujarEnemigos(ctx, enemigos, jugador1, canvas)

    //Chequear Win
    const haGanado = chequearVictoria(jugador1,canvas); //Retorna la posicion
    if (haGanado) {
      mostrarVentanaDeVictoria(ctx ,canvas);
      return; //Detiene el bucle
    }

    //Cargar movimiento del jugador
    direccionJugador.cargar()

    //dibujamos el jugador
    jugador1.dibujar(ctx);
    jugador1.cargar()

  }
} 
requestAnimationFrame(correrJuego);
console.log(requestAnimationFrame)
}

correrJuego();


