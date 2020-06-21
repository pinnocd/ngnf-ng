import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppWorkbookComponent } from './app-workbook.component';

describe('AppWorkbookComponent', () => {
  let component: AppWorkbookComponent;
  let fixture: ComponentFixture<AppWorkbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppWorkbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppWorkbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
