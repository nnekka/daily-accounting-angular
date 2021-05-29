import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainOverviewsComponent } from './main-overviews.component';

describe('MainOverviewsComponent', () => {
  let component: MainOverviewsComponent;
  let fixture: ComponentFixture<MainOverviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainOverviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainOverviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
