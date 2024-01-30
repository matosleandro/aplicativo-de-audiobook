const audioCapitulo = document.getElementById('audio-capitulo');
const botaoPlayPause = document.getElementById('play-pause');

const numeroCapitulos = 10;

function tocarFaixa() {
    audioCapitulo.play();
}

botaoPlayPause.addEventListener('click', tocarFaixa);