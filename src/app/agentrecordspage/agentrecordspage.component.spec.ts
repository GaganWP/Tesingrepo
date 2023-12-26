import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentrecordspageComponent } from './agentrecordspage.component';

describe('AgentrecordspageComponent', () => {
  let component: AgentrecordspageComponent;
  let fixture: ComponentFixture<AgentrecordspageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentrecordspageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentrecordspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
