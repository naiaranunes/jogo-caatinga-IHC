let pontos = 0;
let cardAtual = 0;
let quizRespondidos = {};

const cards = [
  {
    titulo: 'Tatu-bola',
    texto: 'O tatu-bola é um animal típico da Caatinga e do Cerrado. Ele consegue se enrolar como uma bola para se proteger.',
    quiz: false
  },
  {
    titulo: 'Habitat',
    texto: 'Ele vive em regiões secas, com vegetação baixa e arbustos, como a Caatinga.',
    quiz: false
  },
  {
    titulo: 'Alimentação',
    texto: 'O tatu-bola se alimenta principalmente de insetos, formigas, cupins e pequenos invertebrados.',
    quiz: false
  },
  {
    titulo: 'Desafio 1',
    texto: 'Do que o tatu-bola se alimenta?',
    quiz: true,
    opcoes: [
      { texto: 'Frutas e folhas', correta: false },
      { texto: 'Insetos e pequenos invertebrados', correta: true },
      { texto: 'Peixes e algas', correta: false }
    ]
  },
  {
    titulo: 'Desafio 2',
    texto: 'Em qual bioma brasileiro o tatu-bola pode ser encontrado?',
    quiz: true,
    opcoes: [
      { texto: 'Pantanal', correta: false },
      { texto: 'Caatinga', correta: true },
      { texto: 'Pampa', correta: false }
    ]
  },
  {
    titulo: 'Desafio 3',
    texto: 'Qual é o principal mecanismo de defesa do tatu-bola?',
    quiz: true,
    opcoes: [
      { texto: 'Correr rapidamente', correta: false },
      { texto: 'Subir em árvores', correta: false },
      { texto: 'Enrolar-se formando uma bola', correta: true }
    ]
  },
  {
    titulo: 'Preservação',
    texto: 'O tatu-bola sofre com a caça e a destruição do habitat. Preservar a Caatinga ajuda a proteger essa espécie.',
    quiz: false
  },
  {
    titulo: 'Missão concluída',
    texto: 'Você explorou o habitat, alimentação, preservação e características do tatu-bola. Pontuação máxima: 30 pontos.',
    quiz: false
  }
];

export function abrirOuFecharCard() {
  const card = document.getElementById('cardJogo');

  if (card.style.display === 'block') {
    card.style.display = 'none';
  } else {
    cardAtual = 0;
    card.style.display = 'block';
    mostrarCard();
  }
}

function mostrarCard() {
  const card = cards[cardAtual];

  document.getElementById('cardTitulo').innerText = card.titulo;
  document.getElementById('cardTexto').innerText = card.texto;
  document.getElementById('feedback').innerText = '';

  const opcoesQuiz = document.getElementById('opcoesQuiz');
  opcoesQuiz.innerHTML = '';

  if (card.quiz) {
    card.opcoes.forEach((opcao) => {
      const botao = document.createElement('button');

      botao.innerText = opcao.texto;
      botao.style.display = 'block';
      botao.style.margin = '8px 0';
      botao.style.padding = '8px';
      botao.style.cursor = 'pointer';

      botao.onclick = function () {
        responderQuiz(opcao.correta);
      };

      opcoesQuiz.appendChild(botao);
    });
  }

  document.getElementById('pontuacao').innerText = 'Pontos: ' + pontos;
}

function responderQuiz(correta) {
  const feedback = document.getElementById('feedback');

  if (quizRespondidos[cardAtual]) {
    feedback.innerText = '✅ Você já respondeu este desafio.';
    return;
  }

  quizRespondidos[cardAtual] = true;

  if (correta) {
    pontos += 10;
    document.getElementById('pontuacao').innerText = 'Pontos: ' + pontos;
    feedback.innerText = '✅ Correto! Você ganhou 10 pontos.';
  } else {
    feedback.innerText = '❌ Resposta incorreta. Continue explorando!';
  }
}

window.proximoCard = function () {
  if (cardAtual < cards.length - 1) {
    cardAtual++;
    mostrarCard();
  }
};

window.voltarCard = function () {
  if (cardAtual > 0) {
    cardAtual--;
    mostrarCard();
  }
};

window.fecharCard = function () {
  document.getElementById('cardJogo').style.display = 'none';
};