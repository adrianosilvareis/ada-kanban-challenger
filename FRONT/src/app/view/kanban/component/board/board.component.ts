import { Component, OnInit } from '@angular/core';
import { CardService } from '../../service/card.service';
import { List } from '../../enum/list';
import { map, Observable, of } from 'rxjs';

export interface Card {
  id: string,
  titulo: string,
  conteudo: string,
  lista: List,
  isEdit: boolean
}

type newCardProp = {
  titulo: string,
  conteudo: string,
  lista: string
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  cards$: Observable<Card[]> = of([]);

  constructor(private cardService: CardService) {}

  ngOnInit() {
    this.cards$ = this.loadAllCards()
  }

  onAdded(card: newCardProp) {
    card.lista = List.TODO;
    this.cardService.newCard(card).subscribe(response => {
      if (response) {
        this.cards$ = this.loadAllCards()
      }
    })
  }

  onSave(card: Card) {
    this.cardService.saveCard(card).subscribe(response => {
      if (response) {
        this.cards$ = this.loadAllCards()
      }
    })
  }

  onCancel(card: Card) {
    card.isEdit = false
  }

  onDelete(id: string) {
    this.cardService.delete(id).subscribe(response => {
      if (response) {
        this.cards$ = this.loadAllCards()
      }
    })
  }

  onForward(card: Card) {
    if(card.lista === List.TODO) {
      card.lista = List.DOING
    } else {
      card.lista = List.DONE
    }
    this.saveCard(card)
  }

  onBack(card: Card) {
    if(card.lista === List.DONE) {
      card.lista = List.DOING
    } else {
      card.lista = List.TODO
    }
    this.saveCard(card)
  }

  private saveCard(card: Card) {
    this.cardService.saveCard(card).subscribe(value => {
      if (value) {
        this.cards$ = this.loadAllCards()
      }
    })
  }

  private loadAllCards() {
    return this.cardService
      .getAll()
      .pipe(map(cards => cards.map(card => ({ ...card, isEdit: false }))))
  }
}
