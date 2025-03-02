import { Negociacao } from '../models/Negociacao.js';
export class NegociacaoController {
    constructor() {
        this.inputData = document.querySelector('#data');
        this.inputQuantidade = document.querySelector('#quantidade');
        this.inputValor = document.querySelector('#valor');
    }
    adiciona() {
        const negociacao = this.criaNegociacao();
        console.log(negociacao);
    }
    criaNegociacao() {
        const regExp = /-/g;
        const date = new Date(this.inputData.value.replace(regExp, ','));
        const quantidade = parseInt(this.inputQuantidade.value);
        const valor = parseFloat(this.inputValor.value);
        return new Negociacao(date, quantidade, valor);
    }
}
