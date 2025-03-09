export class Negociacoes {
    constructor() {
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
