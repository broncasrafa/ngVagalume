import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistaDetalhesComponent } from './artista-detalhes.component';

describe('ArtistaDetalhesComponent', () => {
  let component: ArtistaDetalhesComponent;
  let fixture: ComponentFixture<ArtistaDetalhesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistaDetalhesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistaDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
