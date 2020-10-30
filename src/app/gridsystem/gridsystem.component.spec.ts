import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridsystemComponent } from './gridsystem.component';

describe('GridsystemComponent', () => {
  let component: GridsystemComponent;
  let fixture: ComponentFixture<GridsystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridsystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridsystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
