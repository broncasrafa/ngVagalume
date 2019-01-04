import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscografiaDetalhesComponent } from './discografia-detalhes.component';

describe('DiscografiaDetalhesComponent', () => {
  let component: DiscografiaDetalhesComponent;
  let fixture: ComponentFixture<DiscografiaDetalhesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscografiaDetalhesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscografiaDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
