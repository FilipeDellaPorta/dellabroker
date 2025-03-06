import { DiasDaSemana } from '../enums/DiasDaSemana.js';
import { Negociacao } from '../models/Negociacao.js';
import { Negociacoes } from '../models/Negociacoes.js';
import { MensagemView } from '../views/MensagemView.js';
import { NegociacoesViews } from '../views/NegociacoesView.js';
export class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacoesViews('#negociacoesView', true);
        this.mensagemView = new MensagemView('#mensagemView', false);
        this.inputData = document.querySelector('#data');
        this.inputQuantidade = document.querySelector('#quantidade');
        this.inputValor = document.querySelector('#valor');
        this.negociacoesView.update(this.negociacoes);
    }
    adiciona() {
        const negociacao = Negociacao.criaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
        if (!this.ehDiaDeSemana(negociacao.data)) {
            this.mensagemView.update('Apenas negociações em dias de semana são aceitas.');
            return;
        }
        this.negociacoes.adiciona(negociacao);
        this.limpaFormulario();
        this.atualizaView();
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
