import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristReportComponent } from './tourist-report.component';

describe('TouristReportComponent', () => {
  let component: TouristReportComponent;
  let fixture: ComponentFixture<TouristReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TouristReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TouristReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
