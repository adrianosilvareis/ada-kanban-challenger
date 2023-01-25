import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppMaterialModule } from '../../app-material/app-material.module';

import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarComponent ],
      imports: [AppMaterialModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'ADA - Kanban'`, () => {
    component.title = 'ADA - Kanban';
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ADA - Kanban');
  });
});
