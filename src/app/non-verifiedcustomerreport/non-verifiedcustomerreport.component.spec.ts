import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonVerifiedcustomerreportComponent } from './non-verifiedcustomerreport.component';

describe('NonVerifiedcustomerreportComponent', () => {
  let component: NonVerifiedcustomerreportComponent;
  let fixture: ComponentFixture<NonVerifiedcustomerreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonVerifiedcustomerreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonVerifiedcustomerreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
