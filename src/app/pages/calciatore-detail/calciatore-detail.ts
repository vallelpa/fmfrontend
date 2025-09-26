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
    const state = this.location.getState() as {
      mode?: 'create' | 'edit';
      calciatore?: Calciatore;
      teamId?: number;
    };
    this.mode = state.mode ?? 'create';
    // this.teamId = state.teamId ?? 0;

    if (this.mode === 'edit' && state.calciatore) {
      this.form.patchValue({
        numeroMaglia: state.calciatore.numeroMaglia,
        nome: state.calciatore.nome,
        cartellini: state.calciatore.cartellini,
        scadenzaVisitaMedica: state.calciatore.scadenzaVisitaMedica,
        dataNascita: state.calciatore.dataNascita,
        matricolaFigc: state.calciatore.matricolaFigc,
        tipoDocumento: state.calciatore.tipoDocumento,
        numeroDocumento: state.calciatore.numeroDocumento
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
