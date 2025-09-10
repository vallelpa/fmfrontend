import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalciatoreDetail } from './calciatore-detail';

describe('CalciatoreDetail', () => {
  let component: CalciatoreDetail;
  let fixture: ComponentFixture<CalciatoreDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalciatoreDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalciatoreDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
