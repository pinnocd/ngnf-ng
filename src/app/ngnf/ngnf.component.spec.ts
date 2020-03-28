import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgnfComponent } from './ngnf.component';

describe('NgnfComponent', () => {
  let component: NgnfComponent;
  let fixture: ComponentFixture<NgnfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgnfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgnfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
