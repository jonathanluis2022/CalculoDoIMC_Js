const form = document.querySelector('#formulario');  // Captura o formulário

form.addEventListener('submit', function (e) { // Previne a atualização da página ou envio
    e.preventDefault();

    const inputPeso = e.target.querySelector('#peso');  // Captura o campo de peso
    const inputAltura = e.target.querySelector('#altura');  // Captura o campo de altura

    // Converte o valor para número
    const peso = parseFloat(inputPeso.value.replace(',', '.').trim());
    const altura = parseFloat(inputAltura.value.replace(',', '.').trim());

    if (!peso || peso <= 0) { // Verifica se o peso é válido
        setResultado('Peso inválido', false);
        return;
    }

    if (!altura || altura <= 0) { // Verifica se a altura é válida
        setResultado('Altura inválida', false);
        return;
    }

    const imc = getImc(peso, altura);  // Calcula o IMC
    const nivelImc = getNivelImc(imc);  // Obtém o nível do IMC

    const msg = `Seu IMC é ${imc} (${nivelImc})`;

    setResultado(msg, true);  // Exibe o resultado
});

// Função para formatar os valores de altura enquanto o usuário digita
function formatarAltura(input) {
    let valor = input.value.replace(/\D/g, '');  // Remove tudo que não for número
    valor = valor.replace(/(\d)(\d{2})$/, '$1,$2');  // Coloca vírgula antes das últimas duas casas
    input.value = valor;
}

const inputAltura = document.querySelector('#altura');

// Aplica a formatação enquanto o usuário digita apenas no campo de altura
inputAltura.addEventListener('input', function() {
    formatarAltura(inputAltura);
});

function getImc(peso, altura) {
    const imc = peso / altura ** 2;  // Função para calcular o IMC
    return imc.toFixed(2);  // Retorna o IMC com 2 casas decimais
}

function getNivelImc(imc) {
    const nivel = ['Abaixo do peso', 'Peso normal', 'Sobrepeso', 'Obesidade grau 1', 'Obesidade grau 2', 'Obesidade grau 3'];

    if (imc >= 39.9) return nivel[5];
    if (imc >= 34.9) return nivel[4];
    if (imc >= 29.9) return nivel[3];
    if (imc >= 24.9) return nivel[2];
    if (imc >= 18.5) return nivel[1];
    if (imc < 18.5) return nivel[0];
}

function setResultado(msg, isvalid) {
    const resultado = document.querySelector('#resultado');  // Captura a área de resultado
    resultado.innerHTML = '';  // Limpa o conteúdo anterior

    const p = document.createElement('p');  // Cria um novo parágrafo

    // Define a cor com base na validade do resultado
    if (isvalid) {
        p.classList.add('grenvalido');
    } else {
        p.classList.add('redfalse');
    }

    p.innerHTML = msg;
    resultado.appendChild(p);  // Adiciona o parágrafo ao resultado
}
