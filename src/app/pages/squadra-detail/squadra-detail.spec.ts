import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadraDetail } from './squadra-detail';

describe('SquadraDetail', () => {
  let component: SquadraDetail;
  let fixture: ComponentFixture<SquadraDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquadraDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SquadraDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
