import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteGaraDialog } from './note-gara-dialog';

describe('NoteGaraDialog', () => {
  let component: NoteGaraDialog;
  let fixture: ComponentFixture<NoteGaraDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteGaraDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteGaraDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
