import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredTouristReportsComponent } from './expired-tourist-reports.component';

describe('ExpiredTouristReportsComponent', () => {
  let component: ExpiredTouristReportsComponent;
  let fixture: ComponentFixture<ExpiredTouristReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiredTouristReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredTouristReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
