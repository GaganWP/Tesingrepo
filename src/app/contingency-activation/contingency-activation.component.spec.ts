import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContingencyActivationComponent } from './contingency-activation.component';

describe('ContingencyActivationComponent', () => {
  let component: ContingencyActivationComponent;
  let fixture: ComponentFixture<ContingencyActivationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContingencyActivationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContingencyActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
