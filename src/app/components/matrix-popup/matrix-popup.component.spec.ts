import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixPopupComponent } from './matrix-popup.component';

describe('MatrixPopupComponent', () => {
  let component: MatrixPopupComponent;
  let fixture: ComponentFixture<MatrixPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrixPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
