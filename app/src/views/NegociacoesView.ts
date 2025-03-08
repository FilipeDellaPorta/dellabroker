import { escape } from '../decorators/Escape.js';
import { Negociacoes } from '../models/Negociacoes.js';
import { View } from './View.js';

export class NegociacoesViews extends View<Negociacoes> {
  @escape
  protected template(model: Negociacoes): string {
    return `
         <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                </tr>
            </thead>
                <tbody>
                    ${model
                      .lista()
                      .map((negociacao) => {
                        return `
                            <tr>
                                <td>${this.formata(negociacao.data)}</td>
                                <td>${negociacao.quantidade}</td>
                                <td>${negociacao.valor}</td>
                            </tr>
                        `;
                      })
                      .join('')}
                </body>
         </table>
        `;
  }

  private formata(data: Date): string {
    return new Intl.DateTimeFormat().format(data);
  }
}
