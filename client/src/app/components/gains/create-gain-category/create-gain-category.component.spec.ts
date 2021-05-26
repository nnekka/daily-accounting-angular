import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGainCategoryComponent } from './create-gain-category.component';

describe('CreateGainCategoryComponent', () => {
  let component: CreateGainCategoryComponent;
  let fixture: ComponentFixture<CreateGainCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGainCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGainCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
