import { Negociacao } from '../app/models/Negociacao.ts';

const negociacao = new Negociacao(new Date());
negociacao.quantidade = 10;
console.log(negociacao.volume);
