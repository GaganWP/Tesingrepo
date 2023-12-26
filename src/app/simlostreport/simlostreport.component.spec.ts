import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimlostreportComponent } from './simlostreport.component';

describe('SimlostreportComponent', () => {
  let component: SimlostreportComponent;
  let fixture: ComponentFixture<SimlostreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimlostreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimlostreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
