document.addEventListener('keydown', jump);

function jump(event) {
    if (event.code === 'Space') {
        const paulinho = document.querySelector('.paulinho');
        let position = 0;

        const upInterval = setInterval(() => {
            if (position >= 300) {
                clearInterval(upInterval);
                const downInterval = setInterval(() => {
                    if (position === 0) {
                        clearInterval(downInterval);
                    } else {
                        position -= 15;
                        paulinho.style.bottom = position + 'px';
                    }
                }, 20);
            } else {
                position += 20;
                paulinho.style.bottom = position + 'px';
            }
        }, 20);
    }
}

const mosquito = document.querySelector('.mosquito');

function randomizeMosquitoPosition() {
    const randomPosition = Math.random() > 0.5 ? 20 : 70; // Altera entre 20px e 70px
    mosquito.style.bottom = randomPosition + 'px';
}

mosquito.addEventListener('animationiteration', randomizeMosquitoPosition);

function checkCollision() {
    const paulinho = document.querySelector('.paulinho');
    const paulinhoRect = paulinho.getBoundingClientRect();
    const mosquitoRect = mosquito.getBoundingClientRect();

    const collisionBuffer = 30; // Ajuste este valor para a precisão desejada

    if (
        paulinhoRect.left < mosquitoRect.right - collisionBuffer &&
        paulinhoRect.right > mosquitoRect.left + collisionBuffer &&
        paulinhoRect.bottom > mosquitoRect.top + collisionBuffer &&
        paulinhoRect.top < mosquitoRect.bottom - collisionBuffer
    ) {
        mensagemDeErro('Game Over: Puxa que pena !!! ' + '\n' + 'O MOSQUITO DA DENGUE LHE PICOU');
        clearInterval(collisionCheckInterval);
        clearInterval(upInterval); // Parar o movimento ascendente do Paulinho
        clearInterval(downInterval); // Parar o movimento descendente do Paulinho
        clearInterval(mosquitoAnimationInterval); // Parar a animação do mosquito (necessário se o mosquito se move com animação)

    }
}

const collisionCheckInterval = setInterval(checkCollision, 35);

function mensagemDeErro(message) {
  let caixaDeMensagem = document.createElement('div');
  caixaDeMensagem.className = 'message-box';
  caixaDeMensagem.textContent = message;
  document.body.appendChild(caixaDeMensagem);

  // essa função remove a mensagem após alguns segundos. 
  setTimeout(function () {
    document.body.removeChild(caixaDeMensagem);
  }, 5000);
  // esse numero de 5000 equivale á 5 segundos , é o tempo que a mensagem fica na tela
}

const restarButton = document.getElementById('restartButton');

  restartButton.addEventListener('click', () => {
   paulinho.style.bottom = '10px';
   mosquito.style.bottom = '20px';
   mosquito.style.right = '-60px';
   clearInterval(collisionCheckInterval);
   collisionCheckInterval = setInterval(checkCollision, 35);
   document.addEventListener('keydown', jump);
    
}
);
