import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import { AppMaterialModule } from './app-material/app-material.module';

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class SharedModule { }
