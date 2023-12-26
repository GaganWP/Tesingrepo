import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerrecordsComponent } from './dealerrecords.component';

describe('DealerrecordsComponent', () => {
  let component: DealerrecordsComponent;
  let fixture: ComponentFixture<DealerrecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerrecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerrecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
