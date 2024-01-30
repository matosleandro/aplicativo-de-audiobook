const audioCapitulo = document.getElementById('audio-capitulo');
const botaoPlayPause = document.getElementById('play-pause');

const numeroCapitulos = 10;
let taTocando = 0;

function tocarFaixa() {
    audioCapitulo.play();
}
function pausarFaixa() {
    audioCapitulo.pause();
}
// Função para tocar ou pausar a faixa de audio
function tocarOuPausar() {
    if ( taTocando === 0) {
        tocarFaixa();
    } else {
        pausarFaixa();
    }
}

botaoPlayPause.addEventListener('click', tocarFaixa);