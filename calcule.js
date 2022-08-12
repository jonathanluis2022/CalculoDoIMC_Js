const form = document.querySelector('#formulario');  // form capiturado



form.addEventListener('submit', function (e) { // previnir que a pagina atualize ou envie 
    e.preventDefault();

    const inputPeso = e.target.querySelector('#peso') //selecionei o input com e.target para saber onde estou clicando 
    const inputAltura = e.target.querySelector('#altura')

    const peso = Number(inputPeso.value); // number para pegar valor só de Number 
    const altura = Number(inputAltura.value);

    if (!peso) { //si for diferente é falso 
        setResultado('peso Invalido', false); //setado como invalido , (false para eu mudar a cor para vermelho)
        return;
    }

    if (!altura) {
        setResultado('altura Invalida', false);
        return;
    }


    const imc = getImc(peso, altura); //criado as duas funçoes  , colocado em variaveis para ficar facil para colocar na mensagem (msg)
    const nivelImc = getNivelImc(imc);

    const msg = `Seu IMC é ${imc} (${nivelImc})`;

    setResultado(msg, true); //chamei a funçao setResultado(msg)  e setei ela como true(verdadeira)
});

function getImc(peso, altura) {
    const imc = peso / altura ** 2;  // função para calcular o imc ( com parametro peso e altura )
    return imc.toFixed(2); //para ser 2casas decimais 

}


function getNivelImc(imc) { //funçao 
    //arrays para obtermos valores 
    //indice = 0             1               2               3                    4                      5
    const nivel = ['abaixo do peso ', 'peso normal', 'sobre-peso', 'obesidade grau 1 ', 'obesidade grau 2 ', 'obesidade grau 3 '];

    if (imc >= 39.9) return nivel[5];
    if (imc >= 34.9) return nivel[4];
    if (imc >= 29.9) return nivel[3];// o valor que der no imc for maior ou menor que essas porcentagens  retornara os niveis 
    if (imc >= 24.9) return nivel[2];// que sao os indices de 0 a 5 
    if (imc >= 18.5) return nivel[1];
    if (imc < 18.5) return nivel[0];

}


function criP() {
    const p = document.createElement('p');  //função só para criar o <p>
    return p;

}

function setResultado(msg, isvalid) {

    const resultado = document.querySelector('#resultado'); //resultado capturado 
    resultado.innerHTML = ''; //vazio para exibir o que for dado no calculo do imc 
    const p = criP();

    if (isvalid) {//si for valido crieii uma classe para mudar a cor no css
        p.classList.add('grenvalido');//criado uma class pra editar no css
    } else {
        p.classList.add('redfalse');
    }
    p.innerHTML = msg
    resultado.appendChild(p); //add  o <p> no resultado 
}
