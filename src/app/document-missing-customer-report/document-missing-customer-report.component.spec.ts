import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentMissingCustomerReportComponent } from './document-missing-customer-report.component';

describe('DocumentMissingCustomerReportComponent', () => {
  let component: DocumentMissingCustomerReportComponent;
  let fixture: ComponentFixture<DocumentMissingCustomerReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentMissingCustomerReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentMissingCustomerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
