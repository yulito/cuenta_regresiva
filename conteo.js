const body          = document.querySelector('.fondo');
const circulo       = document.querySelector('.circulo');
const min           = document.querySelector('#idMinutos');
const conteo        = document.querySelector('.conteo');
const iniciar       = document.querySelector('.btn1');
const reiniciar     = document.querySelector('.btn2');
let minuto;
let tiempo = null;

min.addEventListener('change',seleccionarMin);
iniciar.addEventListener('click',cuentaRegresiva);
reiniciar.addEventListener('click',resetear);

function resetear(){
    location.reload();
}
function seleccionarMin(){       
    minuto = Number(min.value); 
    numActual();
    min.disabled=true;
}
function cuentaRegresiva(){
    if(iniciar.textContent =='Iniciar'||iniciar.textContent =='Continuar'){
        iniciar.textContent = "Pausa";
        iniciar.style.backgroundColor='rgb(16, 51, 149)'; 
        comienzoConteo();
    }else{
        iniciar.textContent = "Continuar";
        iniciar.style.backgroundColor='rgba(142, 166, 104, 0.808)';
        detenerConteo();
    }    
}
function numActual(){
    conteo.textContent = `${minuto}`;
}
function detenerConteo(){
    clearInterval(tiempo);
}
function comienzoConteo(){
    tiempo = setInterval(()=>{
        minuto--;
        numActual();
        if(minuto==10){
            sonido('440'); 
            body.classList.toggle('fondoDos');
            circulo.classList.toggle('circuloFin');                       
        }
        else if(minuto < 10 && minuto>0){
            sonido('440');
        }
        else if(minuto==0){
            sonido('880');
            detenerConteo();
            iniciar.hidden=true;
        }
    },1000);
}

var contexto = new AudioContext();

function sonido(frecuencia){
    var osc = contexto.createOscillator();
    g = contexto.createGain();
    osc.connect(g);
    osc.type='triangle'; 
    osc.frequency.value= frecuencia;
    g.connect(contexto.destination);
    osc.start(0);
    g.gain.exponentialRampToValueAtTime(0.00001, contexto.currentTime + 1.5)
} 