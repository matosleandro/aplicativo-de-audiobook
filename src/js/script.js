const botaoPlayPause = document.getElementById('play-pause');
const botaoAvancar = document.getElementById('proximo');
const botaoVoltar = document.getElementById('anterior');
const botaoAcelerar = document.getElementById('acelerar');
const botaoRepetir = document.getElementById('repetir');
const botaoAleatorio = document.getElementById('aleatorio');
const nomeCapitulo = document.getElementById('capitulo');
const audioCapitulo = document.getElementById('audio-capitulo');
const barraProgresso = document.getElementById('barra-progresso');
const tempoAtual = document.getElementById('tempo-atual');
const tempoTotal = document.getElementById('tempo-total');

const numeroCapitulos = 10;
let taTocando = 0;
let capituloAtual = 1;
let repetir = false;

function tocarFaixa() {
    audioCapitulo.play();
    botaoPlayPause.classList.remove('bi-play-fill');
    botaoPlayPause.classList.add('bi-pause-fill');
}
function pausarFaixa() {
    audioCapitulo.pause();
    botaoPlayPause.classList.remove('bi-pause-fill');
    botaoPlayPause.classList.add('bi-play-fill');
}
// Função para tocar ou pausar a faixa de audio
function tocarOuPausar() {
    if (taTocando === 0) {
        tocarFaixa();
        taTocando = 1;
    } else {
        pausarFaixa();
        taTocando = 0;
    }
}
// Função para voltar para a faixa anterior
function trocarNomeFaixa () {
    nomeCapitulo.innerText = 'Capítulo ' + capituloAtual;
}
// função para a barra de progresso da faixa
function atualizarBarraProgresso() {
    const porcentagem = (audioCapitulo.currentTime / audioCapitulo.duration) * 100;
    barraProgresso.style.width = porcentagem + '%';

    // Atualiza o tempo atual
    const tempoAtualMinutos = Math.floor(audioCapitulo.currentTime / 60);
    const tempoAtualSegundos = Math.floor(audioCapitulo.currentTime % 60);
    tempoAtual.innerText = `${tempoAtualMinutos}:${tempoAtualSegundos}`;

    // Atualiza o tempo total
    const tempoTotalMinutos = Math.floor(audioCapitulo.duration / 60);
    const tempoTotalSegundos = Math.floor(audioCapitulo.duration % 60);
    tempoTotal.innerText = `${tempoTotalMinutos}:${tempoTotalSegundos}`;
}
// Função para avançar de faixa
function proximaFaixa() {
    if (capituloAtual === numeroCapitulos) {
        capituloAtual = 1;
    } else {
        capituloAtual = capituloAtual + 1
    }

    audioCapitulo.src = './src/books/dom-casmurro/' + capituloAtual + '.mp3';
    tocarFaixa();
    taTocando = 1;
    trocarNomeFaixa();

    if (repetir) {
        audioCapitulo.addEventListener('ended', proximaFaixa);
    }
}
// Função para voltar para a faixa anterior
function voltarFaixa() {
    if (capituloAtual === 1) {
        capituloAtual = numeroCapitulos;
    } else {
        capituloAtual = capituloAtual - 1
    }

    audioCapitulo.src = './src/books/dom-casmurro/' + capituloAtual + '.mp3';
    tocarFaixa();
    taTocando = 1;
    trocarNomeFaixa();
}
 // Aumenta a taxa de reprodução em 0.1
function acelerarFaixa() {
    audioCapitulo.playbackRate += 0.1;
}
// Função para repetir a faixa continuamente
function alternarRepeticao() {
    repetir = !repetir;
    if (repetir) {
        botaoRepetir.classList.add('ativo');
        tocarFaixa();
    } else {
        botaoRepetir.classList.remove('ativo');
    }
}
// Função para tocar aleatoriamente as faixas
function tocarAleatoriamente() {
    const novoCapitulo = Math.floor(Math.random() * numeroCapitulos) + 1;
    capituloAtual = novoCapitulo;
    audioCapitulo.src = './src/books/dom-casmurro/' + capituloAtual + '.mp3';
    tocarFaixa();
    taTocando = 1;
    trocarNomeFaixa();

    if (repetir) {
        audioCapitulo.addEventListener('ended', tocarAleatoriamente);
    }

    if (tocarAleatoriamente) {
        botaoAleatorio.classList.add('ativo');
        tocarFaixa();
    } else {
        botaoAleatorio.classList.remove('ativo');
    }
}

botaoPlayPause.addEventListener('click', tocarOuPausar);
botaoAvancar.addEventListener('click', proximaFaixa);
botaoVoltar.addEventListener('click', voltarFaixa);
botaoAcelerar.addEventListener('click', acelerarFaixa);
botaoRepetir.addEventListener('click', alternarRepeticao);
botaoAleatorio.addEventListener('click', tocarAleatoriamente);
audioCapitulo.addEventListener('timeupdate', atualizarBarraProgresso);