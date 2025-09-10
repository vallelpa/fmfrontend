import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MatCard, MatCardHeader, MatCardImage, MatCardTitle} from '@angular/material/card';

interface Team {
  id: number;
  name: string;
  imageUrl: string;
}

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
export class Dashboard {

  teams: Team[] = [
    { id: 1, name: 'Prima Squadra', imageUrl: './assets/logo,png' },
    { id: 2, name: 'Under 21', imageUrl: './assets/logo,png'},
  ];

  constructor(private router: Router) {}

  goToTeamDetail(teamId: number) {
    const team = this.teams.find(t => t.id === teamId);
    this.router.navigate(['/squadra', teamId], {
      state: { teamName: team?.name }
    });
  }

}
