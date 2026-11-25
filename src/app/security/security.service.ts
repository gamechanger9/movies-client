import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {
  AuthenticationResponseDTO,
  UserCredentialsDTO,
  UserDTO,
} from './security.models';
import { Observable, tap } from 'rxjs';
import { PaginationDTO } from '../shared/models/paginationDTO';
import { buildQueryParams } from '../shared/functions/buildQueryParams';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  constructor() {}

  private http = inject(HttpClient);
  private baseURL = environment.apiURL + '/users';
  private readonly keyToken = 'token';
  private readonly keyExpiration = 'token-expiration';

  register(
    userCredentials: UserCredentialsDTO,
  ): Observable<AuthenticationResponseDTO> {
    return this.http
      .post<AuthenticationResponseDTO>(
        `${this.baseURL}/register`,
        userCredentials,
      )
      .pipe(
        tap((authenticationResponse) => {
          this.storeToken(authenticationResponse);
        }),
      );
  }

  login(
    userCredentials: UserCredentialsDTO,
  ): Observable<AuthenticationResponseDTO> {
    return this.http
      .post<AuthenticationResponseDTO>(`${this.baseURL}/login`, userCredentials)
      .pipe(
        tap((authenticationResponse) => {
          this.storeToken(authenticationResponse);
        }),
      );
  }

  makeAdmin(email: string) {
    return this.http.post(`${this.baseURL}/makeAdmin`, { email });
  }

  removeAdmin(email: string) {
    return this.http.post(`${this.baseURL}/removeAdmin`, { email });
  }

  getUsers(pagination: PaginationDTO): Observable<HttpResponse<UserDTO[]>> {
    let queryParams = buildQueryParams(pagination);
    return this.http.get<UserDTO[]>(`${this.baseURL}/usersList`, {
      params: queryParams,
      observe: 'response',
    });
  }

  storeToken(authenticationResponse: AuthenticationResponseDTO): void {
    localStorage.setItem(this.keyToken, authenticationResponse.token);
    localStorage.setItem(
      this.keyExpiration,
      new Date(authenticationResponse.expiration).toISOString(),
    );
  }

  getJWTToken(): string | null {
    return localStorage.getItem(this.keyToken);
  }

  isLoggedIn(): boolean {
    const token = this.getJWTToken();
    if (!token) {
      return false;
    }
    const expiration = localStorage.getItem(this.keyExpiration)!;
    const expirationDate = new Date(expiration);

    if (expirationDate <= new Date()) {
      this.logout();
      return false;
    }
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.keyToken);
    localStorage.removeItem(this.keyExpiration);
  }

  getRole(): string {
    const isAdmin = this.getJWTClaim('isadmin');
    if (isAdmin) {
      return 'admin';
    }
    return '';
  }

  getJWTClaim(field: string): string {
    const token = this.getJWTToken();
    if (!token) {
      return '';
    }

    const dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[field];
  }
}
