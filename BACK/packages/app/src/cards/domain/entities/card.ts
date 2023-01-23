export enum LIST_NAME {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE'
}

export class Card {
  public constructor(
    public id: string,
    public titulo: string,
    public conteudo: string,
    public lista: LIST_NAME,
  ) { }
}
