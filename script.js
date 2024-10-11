const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

const perguntas = [
    {
        enunciado: "Qual foi o primeiro piloto a vencer um campeonato mundial de Fórmula 1?",
        alternativas: ["Juan Manuel Fangio", "Giuseppe Farina"],
        correta: 1
    },
    {
        enunciado: "Em que ano a Fórmula 1 introduziu a regra do DRS (Drag Reduction System)?",
        alternativas: ["2009", "2011"],
        correta: 1
    },
    {
        enunciado: "Qual equipe detém o recorde de mais vitórias consecutivas em uma temporada?",
        alternativas: ["Mercedes", "Red Bull Racing"],
        correta: 0
    },
    {
        enunciado: "Quem é o único piloto a ter vencido corridas com cinco equipes diferentes?",
        alternativas: ["Lewis Hamilton", "Fernando Alonso"],
        correta: 1
    },
    {
        enunciado: "Qual é o nome da pista que sediou o primeiro Grande Prêmio de Fórmula 1?",
        alternativas: ["Silverstone", "Monza"],
        correta: 0
    }
];

let atual = 0;
let perguntaAtual;
let pontuacao = 0;
let tempoRestante = 30; // Tempo em segundos
let cronometro;

function mostraPergunta() {
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.innerHTML = '';
    tempoRestante = 30; // Reinicia o tempo
    document.getElementById('tempo').textContent = tempoRestante;

    // Inicia o cronômetro
    cronometro = setInterval(() => {
        tempoRestante--;
        document.getElementById('tempo').textContent = tempoRestante;
        if (tempoRestante <= 0) {
            clearInterval(cronometro);
            verificaResposta(-1); // Considera resposta como errada
        }
    }, 1000);

    perguntaAtual.alternativas.forEach((alternativa, index) => {
        const botao = document.createElement('button');
        botao.textContent = alternativa;
        botao.setAttribute('data-index', index);
        botao.addEventListener('click', () => {
            clearInterval(cronometro); // Para o cronômetro ao responder
            verificaResposta(index);
        });
        caixaAlternativas.appendChild(botao);
    });
}

function verificaResposta(selecionada) {
    clearInterval(cronometro); // Para o cronômetro
    const botoes = caixaAlternativas.querySelectorAll('button');
    
    // Destaca a resposta correta e a resposta errada
    botoes.forEach((botao, index) => {
        if (index === perguntaAtual.correta) {
            botao.style.backgroundColor = 'green'; // Resposta correta
        } else if (index === selecionada) {
            botao.style.backgroundColor = 'red'; // Resposta errada
        }
        botao.disabled = true; // Desabilita todos os botões após a resposta
    });

    if (selecionada === perguntaAtual.correta) {
        pontuacao++;
    }
    atual++;
    if (atual < perguntas.length) {
        setTimeout(mostraPergunta, 1000); // Espera um segundo antes de mostrar a próxima pergunta
    } else {
        mostraResultado();
    }
}

function mostraResultado() {
    caixaPrincipal.style.display = 'none'; // Esconde a caixa de perguntas
    caixaResultado.style.display = 'block'; // Mostra a caixa de resultado
    setTimeout(() => caixaResultado.classList.add('mostrar'), 10);

    let mensagem;
    if (pontuacao === perguntas.length) {
        mensagem = "Parabéns! Você acertou todas as perguntas!";
    } else if (pontuacao >= perguntas.length / 2) {
        mensagem = "Bom trabalho! Você acertou mais da metade!";
    } else {
        mensagem = "Você pode melhorar! Tente novamente.";
    }

    let emoji;
    if (pontuacao === perguntas.length) {
        emoji = "🎉"; // Emojis de comemoração
    } else if (pontuacao >= perguntas.length / 2) {
        emoji = "👍"; // Emojis de positivo
    } else {
        emoji = "😞"; // Emojis de desapontamento
    }

    textoResultado.textContent = `${emoji} ${mensagem} Você acertou ${pontuacao} de ${perguntas.length} perguntas!`;

    const botaoReiniciar = document.createElement('button');
    botaoReiniciar.textContent = 'Reiniciar';
    botaoReiniciar.addEventListener('click', () => {
        atual = 0;
        pontuacao = 0;
        caixaResultado.classList.remove('mostrar');
       
