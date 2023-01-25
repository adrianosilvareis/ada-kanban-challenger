import { List } from "../enum/list";

export interface Card {
  id: string,
  titulo: string,
  conteudo: string,
  lista: List
}
