import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {Staff} from '../../models/staff.model';

@Component({
  selector: 'app-staff-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './staff-detail.html',
  styleUrls: ['./staff-detail.css']
})
export class StaffDetail {
  private location = inject(Location);
  private fb = inject(FormBuilder);

  mode: 'create' | 'edit' = 'create';
  staffId?: number;

  form: FormGroup = this.fb.group({
    type: ['', Validators.required],
    nome: ['', Validators.required],
    tipoDocumento: ['', Validators.required],
    numeroDocumento: ['', Validators.required]
  });

  constructor() {
    // Recupera lo state dalla navigazione
    const state = this.location.getState() as {
      mode?: 'create' | 'edit';
      staff?: Staff;
      teamId?: number;
    };
    this.mode = state.mode ?? 'create';
    // this.teamId = state.teamId ?? 0;

    if (this.mode === 'edit' && state.staff) {
      this.form.patchValue({
        type: state.staff.tipo,
        nome: state.staff.nome,
        tipoDocumento: state.staff.tipoDocumento,
        numeroDocumento: state.staff.numeroDocumento
      });
    }
  }

  salva() {
    if (this.form.valid) {
      console.log(`${this.mode === 'create' ? 'Creazione' : 'Modifica'} staff:`, this.form.value);
      // Qui puoi aggiungere chiamata al backend
    }
  }

  tornaAllaSquadra() {
    this.location.back();
  }
}
