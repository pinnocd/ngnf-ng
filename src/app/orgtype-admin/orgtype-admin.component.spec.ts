import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgtypeAdminComponent } from './orgtype-admin.component';

describe('OrgtypeAdminComponent', () => {
  let component: OrgtypeAdminComponent;
  let fixture: ComponentFixture<OrgtypeAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgtypeAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgtypeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
