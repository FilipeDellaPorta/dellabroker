import { Negociacao } from './Negociacao.js';

export class Negociacoes {
  private negociacoes: Array<Negociacao> = [];

  adiciona(negocicao: Negociacao): void {
    this.negociacoes.push(negocicao);
  }

  lista(): Array<Negociacao> {
    return this.negociacoes;
  }
}
