import { Imprimivel } from '../utils/Imprimivel.js';

export class Negociacao extends Imprimivel {
  constructor(
    private _data: Date,
    public readonly quantidade: number,
    public readonly valor: number
  ) {
    super();
  }

  public static criaDe(
    dataString: string,
    quantidadeString: string,
    valorString: string
  ): Negociacao {
    const regExp = /-/g;
    const date = new Date(dataString.replace(regExp, ','));
    const quantidade = parseInt(quantidadeString);
    const valor = parseFloat(valorString);
    return new Negociacao(date, quantidade, valor);
  }

  get volume(): number {
    return this.quantidade * this.valor;
  }

  get data(): Date {
    const data = new Date(this._data.getTime());
    return data;
  }

  public paraTexto(): string {
    return `
      Data: ${this.data}, 
      Quantidade: ${this.quantidade},
      Valor: ${this.valor}`;
  }
}
