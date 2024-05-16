let deck = [];
const tipos = ['C','D','H','S']
const especiales = ['A','J','Q','K']

let puntosJugador = 0;
let puntosPc = 0;
// referencias html
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
const htmlPuntos = document.querySelectorAll('small');
const jugadorCartas = document.querySelector('#jugador-cartas');
const maquinaCartas = document.querySelector('#maquina-cartas');


const crearDeck = () =>{
    for(let i =2; i <=10;i++){
        for(let tipo of tipos){
            deck.push(i + tipo)

        }
    }
    
    for( let tipo of tipos ){
        for(let especial of especiales){
            deck.push(especial + tipo)
        }
    }
    
    // console.log(deck);
    deck = _.shuffle(deck);
    // console.log(deck);

    return deck;
    
}

crearDeck();

// console.log(deck);

const pedirCarta = ()=>{
    // deck.pop();
    // console.log(deck.pop);
    const carta = deck.pop();
    // console.log(deck);
    // console.log(carta);
    return carta;
}

const valorCarta = ( carta) =>{
    const valor = carta.substring(0, carta.length -1);

     return (isNaN(valor))?
                     (valor === 'A')?11:10
                     :valor * 1;

    // if( isNaN(valor)){
    //     // console.log('bad');
    // }else{
    //     console.log('number');
    //     valor = valor * 1;
    // }

}

const valor = valorCarta(pedirCarta());
// console.log({valor});

// console.log(btnPedir);

// turno pc 

const turnoPc = (puntosMinimos)=>{
    
        do{
            const carta = pedirCarta();
            const imgCarta = document.createElement('img')
            puntosPc = puntosPc + valorCarta(carta);
            console.log(puntosPc);
            console.log(puntosJugador);
        
            // htmlPuntos = puntosPc
            htmlPuntos[1].innerText=(puntosPc);
            // console.log(htmlPuntos);
            
            imgCarta.src = `assets/cartas/${carta}.png`
            imgCarta.classList.add('carta');
        
            maquinaCartas.append(imgCarta);

            if(puntosMinimos>21){
                break;
            }
    
        } while((puntosPc <= puntosMinimos) && puntosMinimos <=21);

        setTimeout(() => {
            
            if(puntosPc >21){
                // console.log('ganaste');
                alert('ganaste')
            } else if (puntosMinimos> 21){
                // console.log('pc gana');
                alert('pc gana')
            }

            
        }, 10);

}




// Eventos
btnPedir.addEventListener('click',()=>{
    const carta = pedirCarta();
    // console.log(carta);
    puntosJugador = puntosJugador + valorCarta(carta);
    // console.log(puntosJugador);

    // htmlPuntos = puntosJugador
    htmlPuntos[0].innerText=(puntosJugador);
    // console.log(htmlPuntos);

    const imgCarta = document.createElement('img')
    imgCarta.src = `assets/cartas/${carta}.png`
    imgCarta.classList.add('carta');
    jugadorCartas.append(imgCarta);

    if(puntosJugador >21){
        console.error('perdiste')
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoPc(puntosJugador);
    }else if(puntosJugador === 21){
        console.warn('ganaste');
        btnPedir.disabled =true;
        btnDetener.disabled = true;

    }

});

btnDetener.addEventListener('click',()=>{
    btnDetener.disabled = true;
    btnPedir.disabled = true;
    turnoPc(puntosJugador);
});
// console.log(puntosJugador);
// turnoPc(23);

console.log(deck);


btnNuevo.addEventListener('click',()=>{
    // console.clear();

    deck=[];
    deck = crearDeck();
    // console.log(deck);
    puntosJugador = 0;
    puntosPc = 0;
    htmlPuntos[0].innerText = 0;
    htmlPuntos[1].innerText = 0;
    
    maquinaCartas.innerHTML = '';
    jugadorCartas.innerHTML = '';

    btnDetener.disabled = false;
    btnPedir.disabled = false;

    console.log(deck);
});

console.log(deck);
