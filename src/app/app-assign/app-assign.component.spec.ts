import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAssignComponent } from './app-assign.component';

describe('AppAssignComponent', () => {
  let component: AppAssignComponent;
  let fixture: ComponentFixture<AppAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
