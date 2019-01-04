import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraducaoComponent } from './traducao.component';

describe('TraducaoComponent', () => {
  let component: TraducaoComponent;
  let fixture: ComponentFixture<TraducaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraducaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraducaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
