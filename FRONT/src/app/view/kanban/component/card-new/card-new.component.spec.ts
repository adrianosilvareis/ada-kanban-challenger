import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { CardNewComponent } from './card-new.component';

describe('CardNewComponent', () => {
  let component: CardNewComponent;
  let fixture: ComponentFixture<CardNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardNewComponent ],
      imports:[
        AppMaterialModule,
        SharedModule,
        AppRoutingModule,
        RouterModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
