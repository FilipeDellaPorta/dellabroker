export class Negociacoes {
    constructor() {
        this.negociacoes = [];
    }
    adiciona(negocicao) {
        this.negociacoes.push(negocicao);
    }
    lista() {
        return [...this.negociacoes];
    }
}
