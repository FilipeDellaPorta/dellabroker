var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacoesViews('#negociacoesView');
        this.mensagemView = new MensagemView('#mensagemView');
        this.negociacoesService = new NegociacoesService();
        this.negociacoesView.update(this.negociacoes);
    }
    adiciona() {
        const negociacao = Negociacao.criaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
        if (!this.ehDiaDeSemana(negociacao.data)) {
            this.mensagemView.update('Apenas negociações em dias de semana são aceitas.');
            return;
        }
        this.negociacoes.adiciona(negociacao);
        imprimir(negociacao, this.negociacoes);
        this.limpaFormulario();
        this.atualizaView();
    }
    importaDados() {
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
    ehDiaDeSemana(data) {
        return (data.getDay() > DiasDaSemana.DOMINGO &&
            data.getDay() < DiasDaSemana.SABADO);
    }
    limpaFormulario() {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }
    atualizaView() {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso!');
    }
}
__decorate([
    domInjector('#data')
], NegociacaoController.prototype, "inputData", void 0);
__decorate([
    domInjector('#quantidade')
], NegociacaoController.prototype, "inputQuantidade", void 0);
__decorate([
    domInjector('#valor')
], NegociacaoController.prototype, "inputValor", void 0);
__decorate([
    inspect,
    logarRuntime()
], NegociacaoController.prototype, "adiciona", null);
//# sourceMappingURL=NegociacaoController.js.map