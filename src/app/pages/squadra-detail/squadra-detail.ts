import {Component, inject, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {NoteGaraDialog} from '../note-gara-dialog/note-gara-dialog';
import {MatDialog} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {Staff} from '../../models/staff.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-squadra-detail',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './squadra-detail.html',
  styleUrls: ['./squadra-detail.css']
})
export class SquadraDetail implements OnInit {
  nomeSquadra: string = '';
  teamId!: number;
  campionato: string = '';

  staffList: Staff[] = [];
  calciatoriList: Calciatore[] = [];

  selectedStaffIds: number[] = [];
  selectedCalciatoreIds: number[] = [];

  private location = inject(Location);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);

  constructor() {
    const state = this.location.getState() as { teamName?: string };
    this.nomeSquadra = state.teamName ?? 'Squadra';
  }

  ngOnInit(): void {
    this.teamId = Number(this.route.snapshot.paramMap.get('teamId'));

    const state = this.location.getState() as { teamName?: string; campionato?: string };
    this.nomeSquadra = state.teamName ?? 'Squadra';
    this.campionato = state.campionato ?? '';

    this.loadStaff();
    this.loadCalciatori();
  }


  loadStaff() {
    this.http.get<Staff[]>(`${environment.apiHost}/api/squadra/${this.teamId}/staff`)
      .subscribe({
        next: data => this.staffList = data,
        error: err => console.error('Errore caricamento staff', err)
      });
  }

  loadCalciatori() {
    this.http.get<Calciatore[]>(`${environment.apiHost}/api/squadra/${this.teamId}/calciatori`)
      .subscribe({
        next: data => this.calciatoriList = data,
        error: err => console.error('Errore caricamento calciatori', err)
      });
  }

  tornaAllaDashboard() {
    this.router.navigate(['/dashboard']);
  }

  addStaff() {
    this.router.navigate(['/staff-detail'], {state: {mode: 'create'}});
  }

  editStaff(id: number) {
    const staff = this.staffList.find(s => s.id === id);
    if (staff) {
      this.router.navigate(['/staff-detail'], {
        state: { mode: 'edit', staff, teamId: this.teamId }
      });
    }
  }

  addCalciatore() {
    this.router.navigate(['/calciatore-detail'], {state: {mode: 'create'}});
  }

  editCalciatore(id: number) {
    const calciatore = this.calciatoriList.find(c => c.id === id);
    if (calciatore) {
      this.router.navigate(['/calciatore-detail'], {
        state: { mode: 'edit', calciatore, teamId: this.teamId }
      });
    }
  }

  toggleCalciatoreSelection(id: number) {
    if (this.selectedCalciatoreIds.includes(id)) {
      this.selectedCalciatoreIds = this.selectedCalciatoreIds.filter(cid => cid !== id);
    } else if (this.selectedCalciatoreIds.length < 12) {
      this.selectedCalciatoreIds.push(id);
    } else {
      this.snackBar.open('Puoi selezionare al massimo 12 calciatori.', 'Chiudi', {
        duration: 3000
      });
    }
  }

  toggleStaffSelection(id: number) {
    if (this.selectedStaffIds.includes(id)) {
      this.selectedStaffIds = this.selectedStaffIds.filter(sid => sid !== id);
    } else if (this.selectedStaffIds.length < 4) {
      this.selectedStaffIds.push(id);
    } else {
      this.snackBar.open('Puoi selezionare al massimo 4 membri dello staff.', 'Chiudi', {
        duration: 3000
      });
    }
  }


  isStaffSelected(id: number): boolean {
    return this.selectedStaffIds.includes(id);
  }

  isCalciatoreSelected(id: number): boolean {
    return this.selectedCalciatoreIds.includes(id);
  }

  canGenerateNoteGara(): boolean {
    return this.selectedCalciatoreIds.length > 0;
  }

  openNoteGaraDialog() {
    const selectedCalciatori = this.calciatoriList
      .filter(c => this.isCalciatoreSelected(c.id))
      .map(c => c.id);

    const selectedStaff = this.staffList
      .filter(s => this.isStaffSelected(s.id));

    const dialogRef = this.dialog.open(NoteGaraDialog, {
      width: '100%',
      maxWidth: '95vw',
      panelClass: 'note-gara-dialog-panel',
      data: {
        calciatori: selectedCalciatori,
        staff: selectedStaff,
        campionato: this.campionato,
        squadra: this.nomeSquadra
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Campionato:', result.campionato);
        console.log('Partita:', result.partita);
        console.log('Tipo:', result.tipo);
        console.log('Staff:', result.staff);
        console.log('Calciatori:', result.calciatori);
      }
    });
  }




}
