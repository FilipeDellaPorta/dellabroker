import { Comparavel } from '../interfaces/Comparavel.js';
import { Imprimivel } from '../utils/Imprimivel.js';
import { Negociacao } from './Negociacao.js';

export class Negociacoes implements Imprimivel, Comparavel<Negociacoes> {
  private negociacoes: Negociacao[] = [];

  public adiciona(negocicao: Negociacao): void {
    this.negociacoes.push(negocicao);
  }

  public lista(): readonly Negociacao[] {
    return this.negociacoes;
  }

  public paraTexto(): string {
    return JSON.stringify(this.negociacoes, null, 2);
  }

  public ehIgual(negociacoes: Negociacoes): boolean {
    return JSON.stringify(this.negociacoes) === JSON.stringify(negociacoes);
  }
}
