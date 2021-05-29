import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpReportComponent } from './exp-report.component';

describe('ExpReportComponent', () => {
  let component: ExpReportComponent;
  let fixture: ComponentFixture<ExpReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
