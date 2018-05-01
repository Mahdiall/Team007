import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignemailComponent } from './signemail.component';

describe('SignemailComponent', () => {
  let component: SignemailComponent;
  let fixture: ComponentFixture<SignemailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignemailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
