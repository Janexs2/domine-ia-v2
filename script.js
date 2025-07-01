document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const telas = document.querySelectorAll('.tela');
    const btnIniciar = document.getElementById('iniciarJornada');
    const pathCards = document.querySelectorAll('.cyber-path-card');
    const btnPegarOferta = document.getElementById('pegarOferta');
    const btnAvancarTroféu = document.getElementById('avancarTroféu');
    const btnFinalizarCompra = document.getElementById('finalizarCompra');
    const xpValue = document.getElementById('xp-value');
    const trilhaEscolhida = document.getElementById('trilha-escolhida');
    const countdownTimer = document.getElementById('countdown-timer');
    const ebook3d = document.querySelector('.ebook-3d');
    
    // Variáveis de estado
    let telaAtual = 0;
    let trilhaSelecionada = null;
    let xp = 0;
    let countdownInterval;

    // Inicialização
    mostrarTela(telaAtual);
    iniciarCountdown();
    criarParticulas();

    // Event Listeners
    btnIniciar.addEventListener('click', function() {
        adicionarXP(10);
        proximaTela();
    });

    pathCards.forEach(card => {
        card.addEventListener('click', function() {
            pathCards.forEach(c => c.classList.remove('selecionado'));
            this.classList.add('selecionado');
            trilhaSelecionada = this.getAttribute('data-path');
            
            const nomeTrilha = this.querySelector('h3').textContent;
            trilhaEscolhida.textContent = `Trilha selecionada: ${nomeTrilha}`;
            trilhaEscolhida.style.opacity = '1';
            
            adicionarXP(20);
            
            setTimeout(() => {
                proximaTela();
            }, 1500);
        });
    });

    btnPegarOferta.addEventListener('click', function() {
        this.classList.add('clicked');
        setTimeout(() => this.classList.remove('clicked'), 300);
        adicionarXP(15);
        proximaTela();
    });

    btnAvancarTroféu.addEventListener('click', function() {
        adicionarXP(10);
        proximaTela();
    });

    btnFinalizarCompra.addEventListener('click', function() {
        this.disabled = true;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
        
        setTimeout(() => {
            window.open('https://pay.kiwify.com.br/tPCTaAk', '_blank');
        }, 2000);
    });

    if (ebook3d) {
        ebook3d.addEventListener('mouseenter', () => {
            ebook3d.style.animationPlayState = 'paused';
        });
        
        ebook3d.addEventListener('mouseleave', () => {
            ebook3d.style.animationPlayState = 'running';
        });
    }

    // Funções
    function mostrarTela(indice) {
        telas.forEach(tela => tela.classList.remove('ativa'));
        telas[indice].classList.add('ativa');
        
        if (indice === 3) {
            document.querySelectorAll('.digitando-item').forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 500);
            });
        }
        
        if (indice === 4) {
            document.querySelectorAll('.terminal-line').forEach((line, index) => {
                setTimeout(() => {
                    line.style.opacity = '1';
                    line.style.transform = 'translateX(0)';
                }, index * 1000);
            });
        }
    }

    function proximaTela() {
        if (telaAtual < telas.length - 1) {
            telaAtual++;
            mostrarTela(telaAtual);
        }
    }

    function adicionarXP(pontos) {
        xp += pontos;
        xpValue.textContent = xp;
        
        // Feedback visual
        const feedback = document.createElement('div');
        feedback.className = 'xp-gain-feedback';
        feedback.textContent = `+${pontos} XP`;
        document.body.appendChild(feedback);
        
        setTimeout(() => feedback.remove(), 1500);
    }

    function iniciarCountdown() {
        let minutos = 4;
        let segundos = 59;
        
        countdownInterval = setInterval(() => {
            countdownTimer.textContent = 
                `00:0${minutos}:${segundos < 10 ? '0' + segundos : segundos}`;
            
            if (segundos === 0) {
                if (minutos === 0) {
                    clearInterval(countdownInterval);
                } else {
                    minutos--;
                    segundos = 59;
                }
            } else {
                segundos--;
            }
        }, 1000);
    }

    function criarParticulas() {
        const container = document.getElementById('particles');
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Posição aleatória
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Tamanho aleatório
            const size = Math.random() * 3 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Atraso aleatório na animação
            particle.style.animationDelay = `${Math.random() * 5}s`;
            
            container.appendChild(particle);
        }
    }
});
