'use strict';

const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=number]');
const operadores = document.querySelectorAll('[id*=operador]');

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador !== undefined;

const calcular = () => {
    if (operacaoPendente()) {
        const numeroAtual = parseFloat(display.textContent.replace(',','.'));
         novoNumero = true;
        if (operador == '+'){
            atualizarDisplay(numeroAnterior + numeroAtual);
        }else if (operador == '-') {
            atualizarDisplay(numeroAnterior - numeroAtual);
        }else if (operador == '*') {
            atualizarDisplay(numeroAnterior * numeroAtual);
        }else if (operador == '/') {
            atualizarDisplay(numeroAnterior / numeroAtual);
        }
    }
}

const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto;
        novoNumero = false;
    }else {
        display.textContent += texto;
    }
    
}

const inserindoNumero = (e) => atualizarDisplay(e.target.textContent);
numeros.forEach (numeros => numeros.addEventListener('click', inserindoNumero));

const selecionarOperador = (e) => {
    if (!novoNumero){
        calcular()
        novoNumero = true;
        operador = e.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',','.'));
}
}

operadores.forEach (operador => operador.addEventListener('click', selecionarOperador));


const ativarIgual = () => {
    calcular();
    operador = undefined;
}
document.getElementById('igual').addEventListener('click', ativarIgual);

const limparDisplay = () => display.textContent = '';

document.getElementById('limpDisplay').addEventListener('click', limparDisplay);


const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}
document.getElementById('limpCalc').addEventListener('click', limparCalculo);


const removeUltimo = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removeUltimo);

const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay (display.textContent * -1)
};
document.getElementById('invereter').addEventListener('click', inverterSinal);

const existeDecimal = () => display.textContent.indexOf(',') !== -1;
const existeValor = () => display.textContent.length > 0;
const inserirDecimal = () => {
    if (!existeDecimal()){
        if (existeValor()){
            atualizarDisplay('.');
        }else{
            atualizarDisplay('0.');
        }
    }
}
document.getElementById('ponto').addEventListener('click',inserirDecimal);
