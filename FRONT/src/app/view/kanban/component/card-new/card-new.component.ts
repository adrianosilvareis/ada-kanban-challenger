import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-card-new',
  templateUrl: './card-new.component.html',
  styleUrls: ['./card-new.component.scss']
})
export class CardNewComponent {
  @Output() save = new EventEmitter();

  form = this.formBuilder.group({
    titulo: new FormControl('', { nonNullable:true }),
    conteudo: new FormControl('', { nonNullable:true }),
  })

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.resetForm();
  }

  onSave() {
    this.save.emit(this.form.value);
    this.resetForm();
  }

  private resetForm() {
    this.form.setValue({
      titulo: '',
      conteudo: '',
    })
  }
}
