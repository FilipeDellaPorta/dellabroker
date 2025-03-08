import { Negociacao } from './Negociacao.js';

export class Negociacoes {
  private negociacoes: Negociacao[] = [];

  public adiciona(negocicao: Negociacao): void {
    this.negociacoes.push(negocicao);
  }

  public lista(): readonly Negociacao[] {
    return this.negociacoes;
  }
}
