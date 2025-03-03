import { Negociacao } from './Negociacao.js';

export class Negociacoes {
  private negociacoes: Negociacao[] = [];

  adiciona(negocicao: Negociacao): void {
    this.negociacoes.push(negocicao);
  }

  lista(): readonly Negociacao[] {
    return this.negociacoes;
  }
}
