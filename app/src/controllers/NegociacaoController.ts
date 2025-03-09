import { domInjector } from '../decorators/Dom-Injector.js';
import { inspect } from '../decorators/Inspect.js';
import { logarRuntime } from '../decorators/LogarRuntime.js';
import { DiasDaSemana } from '../enums/DiasDaSemana.js';
import { NegociacoesApi } from '../interfaces/NegociacoesApi.js';
import { Negociacao } from '../models/Negociacao.js';
import { Negociacoes } from '../models/Negociacoes.js';
import { MensagemView } from '../views/MensagemView.js';
import { NegociacoesViews } from '../views/NegociacoesView.js';

export class NegociacaoController {
  @domInjector('#data')
  private inputData: HTMLInputElement;
  @domInjector('#quantidade')
  private inputQuantidade: HTMLInputElement;
  @domInjector('#valor')
  private inputValor: HTMLInputElement;
  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesViews('#negociacoesView');
  private mensagemView = new MensagemView('#mensagemView');

  constructor() {
    this.negociacoesView.update(this.negociacoes);
  }

  @inspect
  @logarRuntime()
  public adiciona(): void {
    const negociacao = Negociacao.criaDe(
      this.inputData.value,
      this.inputQuantidade.value,
      this.inputValor.value
    );
    if (!this.ehDiaDeSemana(negociacao.data)) {
      this.mensagemView.update(
        'Apenas negociações em dias de semana são aceitas.'
      );
      return;
    }
    this.negociacoes.adiciona(negociacao);
    this.limpaFormulario();
    this.atualizaView();
  }

  public importaDados(): void {
    fetch('http://localhost:8080/dados')
      .then((res) => res.json())
      .then((dados: NegociacoesApi[]) => {
        return dados.map((dado) => {
          return new Negociacao(new Date(), dado.vezes, dado.montante);
        });
      })
      .then((negociacoesApi) => {
        for (let negociacao of negociacoesApi) {
          this.negociacoes.adiciona(negociacao);
        }
        this.negociacoesView.update(this.negociacoes);
      });
  }

  private ehDiaDeSemana(data: Date) {
    return (
      data.getDay() > DiasDaSemana.DOMINGO &&
      data.getDay() < DiasDaSemana.SABADO
    );
  }

  private limpaFormulario(): void {
    this.inputData.value = '';
    this.inputQuantidade.value = '';
    this.inputValor.value = '';
    this.inputData.focus();
  }

  private atualizaView(): void {
    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update('Negociação adicionada com sucesso!');
  }
}
