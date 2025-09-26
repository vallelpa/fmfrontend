import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {CommonModule} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ETICHETTE_TIPO_STAFF, Staff, TipoStaff, TUTTI_TIPI_STAFF} from '../../models/staff.model';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-note-gara-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogActions,
    MatDialogContent,
    FormsModule,
    MatDatepickerInput,
    MatDatepicker,
    MatDatepickerToggle
  ],
  templateUrl: './note-gara-dialog.html'
})
export class NoteGaraDialog implements OnInit {
  form: FormGroup;
  dirigenti: Staff[] = [];

  tipiStaffDirigente: TipoStaff[] = TUTTI_TIPI_STAFF;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      calciatori: number[];
      staff: Staff[];
      campionato: string;
      squadra: string;
    },
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NoteGaraDialog>,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      nomeEvento: [this.data.campionato, Validators.required],
      squadraAvversaria: ['', Validators.required],
      dataEvento: [new Date(), Validators.required],
      tipo: ['', Validators.required],
      dirigenti: this.fb.array([])
    });
  }


  ngOnInit(): void {
    this.dirigenti = this.data.staff;

    const dirigenteControls = this.dirigenti.map(d =>
      this.fb.group({
        id: [d.id],
        tipo: [d.tipo ?? null, this.isTipoBloccato(d.tipo) ? [] : Validators.required]
      })
    );

    this.form.setControl('dirigenti', this.fb.array(dirigenteControls));
  }

  get dirigentiFormArray(): FormArray {
    return this.form.get('dirigenti') as FormArray;
  }

  isTipoBloccato(tipo: TipoStaff | null): boolean {
    return tipo === 'ALLENATORE' || tipo === 'ALLENATORE_IN_SECONDA';
  }

  tipiValidi(): boolean {
    return this.dirigentiFormArray.controls.every(ctrl => {
      const tipo = ctrl.get('tipo')?.value;
      return tipo !== null || this.isTipoBloccato(tipo);
    });
  }

  formValido(): boolean {
    return this.form.valid && this.tipiValidi();
  }

  chiudi(): void {
    this.dialogRef.close();
  }

  getEtichetta(tipo: TipoStaff): string {
    return ETICHETTE_TIPO_STAFF[tipo] ?? tipo;
  }

  generaNote(): void {
    const staff = this.dirigentiFormArray.value.map((d: any) => ({
      id: d.id,
      tipo: d.tipo
    }));

    const tipo = this.form.value.tipo;
    const squadraAvversaria = this.form.value.squadraAvversaria;
    const squadraPrincipale = this.data.squadra ?? 'Futsal Montevarchi';

    const result = {
      dataEvento: this.formattaData(this.form.value.dataEvento),
      squadraCasa: tipo === 'casa' ? squadraPrincipale : squadraAvversaria,
      squadraTrasferta: tipo === 'trasferta' ? squadraPrincipale : squadraAvversaria,
      campionato: this.form.value.nomeEvento,
      calciatoriIds: this.data.calciatori,
      capitanoId: this.data.calciatori[0],
      viceCapitanoId: this.data.calciatori[1],
      staff: staff
    };

    this.http.post('https://fmbackend-cend.onrender.com/api/notegara/genera', result, {
      observe: 'response',
      responseType: 'blob'
    }).subscribe({
      next: (res) => {
        const contentDisposition = res.headers.get('Content-Disposition');
        const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
        const filename = filenameMatch ? filenameMatch[1] : 'note-gara.docx';

        const url = window.URL.createObjectURL(res.body!);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);

        this.dialogRef.close();
      },
      error: (err) => {
        console.error('Errore nella generazione:', err);
        alert('Errore durante la generazione delle note gara.');
      }
    });
  }

  private formattaData(data: Date): string {
    return new Date(data).toISOString().split('T')[0];
  }
}
