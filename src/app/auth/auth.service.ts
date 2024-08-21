import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthResponse, IUser } from './auth.interface';
import { URL } from '../consts/consts';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  token: string | null = null;

  login(userData: {
    email: string;
    password: string;
  }): Observable<AuthResponse> {
    let user: IUser = { ...userData, personal_data_access: true };
    return this.http
      .post<AuthResponse>(`${URL}/auth/login`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        tap((response) => {
          localStorage.setItem('access_token', response.data.access_token);
        })
      );
  }

  get authToken() {
    this.token = localStorage.getItem('access_token');
    return !!this.token;
  }
}
