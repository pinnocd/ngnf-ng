import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundproviderAdminComponent } from './fundprovider-admin.component';

describe('FundproviderAdminComponent', () => {
  let component: FundproviderAdminComponent;
  let fixture: ComponentFixture<FundproviderAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundproviderAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundproviderAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
