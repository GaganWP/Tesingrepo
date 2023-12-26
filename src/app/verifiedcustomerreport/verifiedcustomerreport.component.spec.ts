import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedcustomerreportComponent } from './verifiedcustomerreport.component';

describe('VerifiedcustomerreportComponent', () => {
  let component: VerifiedcustomerreportComponent;
  let fixture: ComponentFixture<VerifiedcustomerreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifiedcustomerreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifiedcustomerreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
