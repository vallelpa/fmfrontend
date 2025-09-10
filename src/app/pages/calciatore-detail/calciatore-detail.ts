import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';

@Component({
  selector: 'app-calciatore-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput
  ],
  templateUrl: './calciatore-detail.html',
  styleUrls: ['./calciatore-detail.css']
})
export class CalciatoreDetail {
  private location = inject(Location);
  private fb = inject(FormBuilder);

  tornaAllaSquadra() {
    this.location.back();
  }

  mode: 'create' | 'edit' = 'create';
  calciatoreId?: number;

  form: FormGroup = this.fb.group({
    numeroMaglia: [null, Validators.required],
    nome: ['', Validators.required],
    cartellini: [0, Validators.min(0)],
    scadenzaVisitaMedica: ['', Validators.required],
    dataNascita: ['', Validators.required],
    matricolaFigc: ['', Validators.required],
    tipoDocumento: ['', Validators.required],
    numeroDocumento: ['', Validators.required]
  });

  constructor() {
    const state = this.location.getState() as { mode?: 'create' | 'edit'; id?: number };
    this.mode = state.mode ?? 'create';
    this.calciatoreId = state.id;

    if (this.mode === 'edit' && this.calciatoreId) {
      // Simula caricamento dati
      this.form.patchValue({
        numeroMaglia: 10,
        nome: 'Juber Bertocci',
        cartellini: 2,
        scadenzaVisitaMedica: '2025-11-30',
        dataNascita: '2000-04-15',
        matricolaFigc: 'FIGC001',
        tipoDocumento: 'CI',
        numeroDocumento: 'AA112233'
      });
    }
  }

  salva() {
    if (this.form.valid) {
      console.log(`${this.mode === 'create' ? 'Creazione' : 'Modifica'} calciatore:`, this.form.value);
      // Qui puoi aggiungere chiamata al backend
    }
  }

}
