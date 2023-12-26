import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentReportsComponent } from './resident-reports.component';

describe('ResidentReportsComponent', () => {
  let component: ResidentReportsComponent;
  let fixture: ComponentFixture<ResidentReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
