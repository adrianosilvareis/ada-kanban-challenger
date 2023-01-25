import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './component/board/board.component';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardComponent } from './component/card/card.component';
import { CardEditComponent } from './component/card-edit/card-edit.component';
import { ListPipe } from './component/board/pipe/list.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { CardNewComponent } from './component/card-new/card-new.component';


@NgModule({
  declarations: [
    BoardComponent,
    CardComponent,
    CardEditComponent,
    ListPipe,
    CardNewComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    BoardComponent
  ]
})
export class KanbanModule { }
