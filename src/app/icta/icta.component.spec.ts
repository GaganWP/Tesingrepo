import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IctaComponent } from './icta.component';

describe('IctaComponent', () => {
  let component: IctaComponent;
  let fixture: ComponentFixture<IctaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IctaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IctaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
