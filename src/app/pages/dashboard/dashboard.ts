import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatCard, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-dashboard',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  teams: Team[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams(): void {
    this.http.get<Team[]>(`${environment.apiHost}/api/squadra`).subscribe({
      next: (data) => this.teams = data,
      error: (err) => console.error('Errore caricamento teams', err)
    });
  }

  goToTeamDetail(teamId: number) {
    const team = this.teams.find(t => t.id === teamId);
    if (!team) return;
    this.router.navigate(['/squadra', teamId], {
      state: {
        teamName: team.name,
        campionato: team.campionato
      }
    });
  }

}
