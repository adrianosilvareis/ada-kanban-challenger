import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() id: string = '';
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() list: string = '';

  @Output() edit = new EventEmitter();
  @Output() forward = new EventEmitter();
  @Output() back = new EventEmitter();
  @Output() delete = new EventEmitter();

  get isTodo() {
    return this.list === 'TODO'
  }

  get isDone() {
    return this.list === 'DONE'
  }

  goEdit() {
    this.edit.emit();
  }

  onForward() {
    this.forward.emit();
  }

  onBack() {
    this.back.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}
