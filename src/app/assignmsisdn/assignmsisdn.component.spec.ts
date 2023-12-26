import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmsisdnComponent } from './assignmsisdn.component';

describe('AssignmsisdnComponent', () => {
  let component: AssignmsisdnComponent;
  let fixture: ComponentFixture<AssignmsisdnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmsisdnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmsisdnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
