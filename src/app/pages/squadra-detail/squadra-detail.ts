import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

interface Staff {
  id: number;
  type: 'ALLENATORE' | 'DIRIGENTE';
  nome: string;
  tipoDocumento: string;
  numeroDocumento: string;
}

interface Calciatore {
  id: number;
  numeroMaglia: number;
  nome: string;
  cartellini: number;
  scadenzaVisitaMedica: string;
  dataNascita: string;
  matricolaFigc: string;
  tipoDocumento: string;
  numeroDocumento: string;
}

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
export class SquadraDetail {
  nomeSquadra: string = '';
  selectedStaffIds: number[] = [];
  selectedCalciatoreIds: number[] = [];

  private location = inject(Location);
  private router = inject(Router);

  constructor() {
    const state = this.location.getState() as { teamName?: string };
    this.nomeSquadra = state.teamName ?? 'Squadra';
  }

  staffList: Staff[] = [
    { id: 1, type: 'ALLENATORE', nome: 'Mirko Massi', tipoDocumento: 'CI', numeroDocumento: 'AB123456' },
    { id: 2, type: 'DIRIGENTE', nome: 'Pasquale Vallelonga', tipoDocumento: 'PASSAPORTO', numeroDocumento: 'X9876543' }
  ];

  calciatoriList: Calciatore[] = [
    { id: 1, numeroMaglia: 10, nome: 'Juber Bertocci', cartellini: 2, scadenzaVisitaMedica: '2025-11-30', dataNascita: '2000-04-15', matricolaFigc: 'FIGC001', tipoDocumento: 'CI', numeroDocumento: 'AA112233' },
    { id: 2, numeroMaglia: 7, nome: 'Gennaro Falanga', cartellini: 0, scadenzaVisitaMedica: '2025-09-15', dataNascita: '2001-06-22', matricolaFigc: 'FIGC002', tipoDocumento: 'PASSAPORTO', numeroDocumento: 'BB445566' }
  ];

  tornaAllaDashboard() {
    this.router.navigate(['/dashboard']);
  }

  addStaff() {
    this.router.navigate(['/staff-detail'], { state: { mode: 'create' } });
  }

  editStaff(id: number) {
    this.router.navigate(['/staff-detail'], { state: { mode: 'edit', id } });
  }

  addCalciatore() {
    this.router.navigate(['/calciatore-detail'], { state: { mode: 'create' } });
  }

  editCalciatore(id: number) {
    this.router.navigate(['/calciatore-detail'], { state: { mode: 'edit', id } });
  }

  toggleStaffSelection(id: number) {
    this.selectedStaffIds = this.selectedStaffIds.includes(id)
      ? this.selectedStaffIds.filter(sid => sid !== id)
      : [...this.selectedStaffIds, id];
  }

  toggleCalciatoreSelection(id: number) {
    if (this.selectedCalciatoreIds.includes(id)) {
      this.selectedCalciatoreIds = this.selectedCalciatoreIds.filter(cid => cid !== id);
    } else if (this.selectedCalciatoreIds.length < 12) {
      this.selectedCalciatoreIds.push(id);
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

  generateNoteGara() {
    console.log('Staff selezionato:', this.selectedStaffIds);
    console.log('Calciatori selezionati:', this.selectedCalciatoreIds);
  }
}
