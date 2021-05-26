import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGainItemComponent } from './create-gain-item.component';

describe('CreateGainItemComponent', () => {
  let component: CreateGainItemComponent;
  let fixture: ComponentFixture<CreateGainItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGainItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGainItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
