class IMCCalculator {
    constructor(formId, resultadoId) {
        this.form = document.querySelector(formId);
        this.resultado = document.querySelector(resultadoId);

        this.form.addEventListener('submit', (e) => this.handleSubmit(e)); // Vincula o evento de submit
    }

    handleSubmit(event) {
        event.preventDefault();  // Previne a recarga da página

        const peso = Number(this.form.querySelector('#peso').value);
        const altura = Number(this.form.querySelector('#altura').value);

        if (!peso) {
            this.setResultado('Peso inválido', false);
            return;
        }

        if (!altura) {
            this.setResultado('Altura inválida', false);
            return;
        }

        const imc = this.calculateImc(peso, altura);
        const nivelImc = this.getNivelImc(imc);
        const msg = `Seu IMC é ${imc} (${nivelImc})`;

        this.setResultado(msg, true);
    }

    calculateImc(peso, altura) {
        return (peso / altura ** 2).toFixed(2);  // Fórmula do IMC com 2 casas decimais
    }

    getNivelImc(imc) {
        const niveis = ['Abaixo do peso', 'Peso normal', 'Sobrepeso', 'Obesidade grau 1', 'Obesidade grau 2', 'Obesidade grau 3'];

        if (imc >= 39.9) return niveis[5];
        if (imc >= 34.9) return niveis[4];
        if (imc >= 29.9) return niveis[3];
        if (imc >= 24.9) return niveis[2];
        if (imc >= 18.5) return niveis[1];
        return niveis[0];
    }

    setResultado(msg, isValid) {
        this.resultado.innerHTML = '';  // Limpa o conteúdo anterior

        const p = document.createElement('p');
        p.innerHTML = msg;

        if (isValid) {
            p.classList.add('grenvalido');
        } else {
            p.classList.add('redfalse');
        }

        this.resultado.appendChild(p);  // Adiciona o novo parágrafo ao DOM
    }
}

// Cria uma instância da classe IMCCalculator, passando os IDs dos elementos do formulário e do resultado
new IMCCalculator('#formulario', '#resultado');
