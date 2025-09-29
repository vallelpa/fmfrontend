import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment';
import {tap, throwError} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private loggedIn = false;

  constructor(private http: HttpClient) {
    this.loggedIn = !!localStorage.getItem('token');
  }

  login(form: FormGroup) {
    if (form.invalid) {
      return throwError(() => new Error('Form non valido'));
    }

    const credentials = {
      username: form.value.username,
      password: form.value.password
    };

    return this.http.post<{ token: string }>(
      `${environment.apiHost}/api/auth/login`,
      credentials,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        withCredentials: true
      }
    ).pipe(
      tap(response => {
        // Salvo il token in localStorage
        localStorage.setItem('token', response.token);
        this.loggedIn = true; // aggiorno lo stato
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false; // aggiorno lo stato
  }

  isAuthenticated(): boolean {
    return this.loggedIn;
  }

  // opzionale se vuoi leggere il token in giro
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
