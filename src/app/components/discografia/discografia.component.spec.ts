import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscografiaComponent } from './discografia.component';

describe('DiscografiaComponent', () => {
  let component: DiscografiaComponent;
  let fixture: ComponentFixture<DiscografiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscografiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscografiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
