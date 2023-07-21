
const moduloBlackJack = (() => {

    'use strict';

    // Variables Relacionadas a la Baraja
    const tipos      = [ 'C', 'D', 'H', 'S' ];
    const especiales = [ 'A', 'J', 'K', 'Q' ];
    let deck         = [];

    // Variables Relacionadas al Puntaje
    let puntosJugadores = [0, 0]

    const marcadorJugadorHTML     = document.querySelector('#puntos-jugador');
    const marcadorComputadoraHTML = document.querySelector('#puntos-computadora')

    // Variables relacionadas a las cartas HTML
    const divCartasJugador     = document.querySelector('#jugador-cartas');
    const divCartasComputadora = document.querySelector('#computadora-cartas');

    // Variables Relacionadas a eventos
    const btnNew  = document.querySelector('#btn-new');
    const btnMore = document.querySelector('#btn-more');
    const btnStop = document.querySelector('#btn-stop');

    // Funcion que se encarga de crear y barajear la baraja.
    const crearDeck = () => {

        deck = [];

        for (let i = 2; i <= 10; i++){

            for (let tipo of tipos) {

                deck.push( i + tipo );

            }

        }

        for (let tipo of tipos){

            for (let especial of especiales){

                deck.push( especial + tipo );

            }

        }

        return deck = _.shuffle( deck );

    }

    // Funcion que nos permite pedir carta.
    const pedirCarta = () => {

        if (deck.length === 0) {

            throw "Ya no hay mas cartas";
        
        }

        const random = Math.floor(Math.random() * (deck.length - 0 + 1) + 0) // Arroja numero al azar que se usara para sacar la carta del deck.
        deck.splice(random, 1);
        return deck[random];

    }

    // Funcion que nos retorna el valor de la carta.
    const valorCarta = ( carta ) => {

        const valor = carta.substring(0, carta.length - 1);
        return !isNaN(valor) ? parseInt(valor) : (valor === 'A') ? 11 : 10;
        
    }

    // Funcion que retorna la imagen de la carta que se obtuvo
    const imagenCarta = ( carta, divCartas ) => {

        const cartaHTML = document.createElement('img');
        cartaHTML.src = `./assets/cartas/${ carta }.png`
        cartaHTML.classList.add('carta');

        return divCartas.append(cartaHTML);

    }

    const acumularPuntos = ( carta, turno, marcador ) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        marcador.innerText = puntosJugadores[turno];
        return puntosJugadores[turno];

    }

    // Funcion para obtener Turno de la computadora
    const turnoComputadora = ( puntosJugador ) => {

        do {

            const carta = pedirCarta();

            acumularPuntos(carta, 1, marcadorComputadoraHTML);
        
            imagenCarta(carta, divCartasComputadora);

        } while( (puntosJugadores[1] < puntosJugadores[0]) && (puntosJugadores[0] <= 21) );

        determinarGanador();

    }

    //Funcion donde se determina el ganador
    const determinarGanador = () => {

        setTimeout(() => {
            
            if (puntosJugadores[1] === puntosJugadores[0]) {
        
                alert('EMPATE');
                btnStop.disabled = true;
                btnMore.disabled = true;
        
            } else if (puntosJugadores[0] > 21) {
        
                alert('PERDISTE');
                btnStop.disabled = true;
                btnMore.disabled = true;
        
            } else if (puntosJugadores[1] > 21) {
        
                alert('GANASTE');
                btnStop.disabled = true;
                btnMore.disabled = true;
        
            } else {
        
                alert('PERDISTE')
                btnStop.disabled = true;
                btnMore.disabled = true;
        
            }

        }, 20);

    }

    //Funcion que inicializa el juego
    const inicializarJuego = () => {

        crearDeck();

        puntosJugadores[0] = 0;
        marcadorJugadorHTML.innerText = puntosJugadores[0];

        puntosJugadores[1] = 0
        marcadorComputadoraHTML.innerText = puntosJugadores[1];

        divCartasJugador.innerHTML = '';
        divCartasComputadora.innerHTML = '';

        btnStop.disabled = false;
        btnMore.disabled = false;

    }

    // Eventos
    btnNew.addEventListener('click', () => {

        inicializarJuego();

    });

    btnMore.addEventListener('click', () => {

        const carta = pedirCarta();

        acumularPuntos(carta, 0, marcadorJugadorHTML);
        
        imagenCarta(carta, divCartasJugador);

        if (puntosJugadores[0] > 21){

            turnoComputadora(puntosJugadores[0]);

        } else if (puntosJugadores[0] === 21){

            turnoComputadora(puntosJugadores[0]);

        }

    });

    btnStop.addEventListener('click', () => {

        btnStop.disabled = true;
        btnMore.disabled = true;
        turnoComputadora(puntosJugadores[0]);

    });

    return {
        nuevoJuego: inicializarJuego
    }

})();
