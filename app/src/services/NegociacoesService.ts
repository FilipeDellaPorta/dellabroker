import { NegociacoesApi } from '../interfaces/NegociacoesApi.js';
import { Negociacao } from '../models/Negociacao.js';

export class NegociacoesService {
  public obterNegociacoes(): Promise<Negociacao[]> {
    return fetch('http://localhost:8080/dados')
      .then((res) => res.json())
      .then((dados: NegociacoesApi[]) => {
        return dados.map((dado) => {
          return new Negociacao(new Date(), dado.vezes, dado.montante);
        });
      });
  }
}
