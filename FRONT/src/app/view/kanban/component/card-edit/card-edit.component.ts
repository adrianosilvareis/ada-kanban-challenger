import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.scss']
})
export class CardEditComponent implements OnInit{

  @Input() id: string = '';
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() list: string = '';

  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  form = this.formBuilder.group({
    id: new FormControl('', { nonNullable:true }),
    titulo: new FormControl('', { nonNullable:true }),
    conteudo: new FormControl('', { nonNullable:true }),
    lista: new FormControl('', { nonNullable:true })
  })

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form.setValue({
      id: this.id,
      titulo: this.title,
      conteudo: this.content,
      lista: this.list
    })
  }

  onCancel() {
    this.cancel.emit();
  }

  onSave() {
    this.save.emit(this.form.value);
  }
}
