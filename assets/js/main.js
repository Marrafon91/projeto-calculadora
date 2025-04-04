function criaCalculadora() {
  return {
    // Captura o elemento do display da calculadora
    display: document.querySelector(".display"),

    // Função que inicia a calculadora
    inicia() {
      this.cliqueBotoes(); // Ativa os botões da interface gráfica
      this.pressionaTeclas(); // Ativa as teclas do teclado físico
    },

    // Captura eventos de teclado para permitir entrada via teclado
    pressionaTeclas() {
      document.addEventListener("keydown", (e) => {
        // Se a tecla pressionada for um número ou operador válido, adiciona ao display
        if (this.teclaValida(e.key)) {
          e.preventDefault(); // Evita ações padrões (como rolagem)
          this.btnParaDisplay(e.key);
        }

        // Se a tecla pressionada for Enter, realiza o cálculo
        if (e.key === "Enter") {
          e.preventDefault();
          this.realizaConta();
        }

        // Se a tecla pressionada for Backspace, apaga um número
        if (e.key === "Backspace") {
          this.apagaUm();
        }

        // Se a tecla pressionada for Escape, limpa o display
        if (e.key === "Escape") {
          this.clearDisplay();
        }
      });
    },

    // Verifica se a tecla pressionada é válida (número ou operador)
    teclaValida(tecla) {
      return /[0-9+\-*/().]/.test(tecla); // Regex para aceitar apenas números e operadores
    },

    // Função que realiza o cálculo do que está no display
    realizaConta() {
      let conta = this.display.value.trim(); // Remove espaços extras

      try {
        // Se a conta estiver vazia ou com caracteres inválidos, gera erro
        if (!conta || /[^0-9+\-*/().]/.test(conta)) {
          throw new Error("Conta inválida");
        }

        // Usa eval() para calcular a expressão matemática
        conta = eval(conta);

        // Se o resultado não for um número válido, gera erro
        if (isNaN(conta) || conta === undefined || conta === Infinity) {
          throw new Error("Conta inválida");
        }

        // Se tudo estiver certo, exibe o resultado no display
        this.display.value = String(conta);
      } catch (e) {
        alert("Conta inválida"); // Exibe alerta em caso de erro
        this.clearDisplay(); // Limpa o display
      }
    },

    // Função para limpar todo o display
    clearDisplay() {
      this.display.value = "";
    },

    // Função para apagar apenas o último caractere digitado
    apagaUm() {
      this.display.value = this.display.value.slice(0, -1);
    },

    // Captura os cliques nos botões da interface gráfica
    cliqueBotoes() {
      document.addEventListener("click", (e) => {
        const el = e.target; // Elemento clicado

        // Se clicar em um número, adiciona ao display
        if (el.classList.contains("btn-num")) {
          this.btnParaDisplay(el.innerText);
        }

        // Se clicar no botão "C", limpa o display
        if (el.classList.contains("btn-clear")) {
          this.clearDisplay();
        }

        // Se clicar no botão "DEL", apaga um caractere
        if (el.classList.contains("btn-del")) {
          this.apagaUm();
        }

        // Se clicar no botão "=", executa o cálculo
        if (el.classList.contains("btn-eq")) {
          this.realizaConta();
        }
      });
    },

    // Adiciona números e operadores ao display
    btnParaDisplay(valor) {
      this.display.value += valor;
      this.display.focus(); // Mantém o cursor no campo de input
    },
  };
}

// Cria a instância da calculadora e inicia suas funcionalidades
const calculadora = criaCalculadora();
calculadora.inicia();
