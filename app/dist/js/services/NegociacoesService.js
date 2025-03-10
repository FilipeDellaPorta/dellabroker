import { Negociacao } from '../models/Negociacao.js';
export class NegociacoesService {
    obterNegociacoes() {
        return fetch('http://localhost:8080/dados')
            .then((res) => res.json())
            .then((dados) => {
            return dados.map((dado) => {
                return new Negociacao(new Date(), dado.vezes, dado.montante);
            });
        });
    }
}
//# sourceMappingURL=NegociacoesService.js.map