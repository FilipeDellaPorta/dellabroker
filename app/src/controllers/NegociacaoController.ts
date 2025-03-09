import { domInjector } from '../decorators/Dom-Injector.js';
import { inspect } from '../decorators/Inspect.js';
import { logarRuntime } from '../decorators/LogarRuntime.js';
import { DiasDaSemana } from '../enums/DiasDaSemana.js';
import { Negociacao } from '../models/Negociacao.js';
import { Negociacoes } from '../models/Negociacoes.js';
import { NegociacoesService } from '../services/NegociacoesService.js';
import { imprimir } from '../utils/Imprimir.js';
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
  private negociacoesService = new NegociacoesService();

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
    imprimir(negociacao, this.negociacoes);
    this.limpaFormulario();
    this.atualizaView();
  }

  public importaDados(): void {
    this.negociacoesService
      .obterNegociacoes()
      .then((negociacoesApi) => {
        return negociacoesApi.filter((negociacoesApi) => {
          return !this.negociacoes
            .lista()
            .some((negociacao) => negociacao.ehIgual(negociacoesApi));
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
