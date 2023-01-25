import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/app/environments/environments';
import { Card } from '../model/card.model';

type newCardProp = {
  titulo: string,
  conteudo: string,
  lista: string
}

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private URL = `${environments.baseUrl}/cards`

  constructor (private http: HttpClient) {}

  getAll(): Observable<Card[]> {
    return this.http.get<Card[]>(this.URL);
  }

  newCard(card: newCardProp) {
    return this.http.post(this.URL, card)
  }

  saveCard(card:Card): Observable<Card> {
    return this.http.put<Card>(`${this.URL}/${card.id}`, card);
  }

  delete(id: string):Observable<Card> {
    return this.http.delete<Card>(`${this.URL}/${id}`)
  }
}
