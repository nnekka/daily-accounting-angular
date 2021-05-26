import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GainsCategoriesComponent } from './gains-categories.component';

describe('GainsCategoriesComponent', () => {
  let component: GainsCategoriesComponent;
  let fixture: ComponentFixture<GainsCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GainsCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GainsCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
