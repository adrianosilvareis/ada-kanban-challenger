import { Pipe, PipeTransform } from '@angular/core';
import { Card } from '../board.component';

@Pipe({
  name: 'list'
})
export class ListPipe implements PipeTransform {

  transform(list: Card[] | null, type: string): Card[] | null{
    if (list === null) {
      return null
    }
    return list.filter(card => card.lista === type);
  }

}
