import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment';
import {throwError} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

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
    );
  }

  logout() {
    localStorage.removeItem('token');
  }
}
