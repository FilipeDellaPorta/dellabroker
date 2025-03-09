import { Imprimivel } from '../utils/Imprimivel.js';
export class Negociacoes extends Imprimivel {
    constructor() {
        super(...arguments);
        this.negociacoes = [];
    }
    adiciona(negocicao) {
        this.negociacoes.push(negocicao);
    }
    lista() {
        return this.negociacoes;
    }
    paraTexto() {
        return JSON.stringify(this.negociacoes, null, 2);
    }
}
