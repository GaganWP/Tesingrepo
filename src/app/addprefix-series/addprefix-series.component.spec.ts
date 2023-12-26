import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprefixSeriesComponent } from './addprefix-series.component';

describe('AddprefixSeriesComponent', () => {
  let component: AddprefixSeriesComponent;
  let fixture: ComponentFixture<AddprefixSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddprefixSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddprefixSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
