import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GainsReportComponent } from './gains-report.component';

describe('GainsReportComponent', () => {
  let component: GainsReportComponent;
  let fixture: ComponentFixture<GainsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GainsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GainsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
