import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface User {
  nome: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  jwt: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // URLs dos microserviços
  private registerUrl = 'http://localhost:8081/api/usuarios/cadastro'; // endpoint do usuarios-service para cadastro
  private loginUrl = 'http://localhost:8082/api/auth/login'; // endpoint do auth-service para login

  constructor(private http: HttpClient) {}

  // Método para cadastro de usuário
  register(user: User): Observable<any> {
    return this.http.post(this.registerUrl, user);
  }

  // Método para login de usuário
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this.loginUrl, { email, password })
      .pipe(
        tap((response) => {
          // Salva o token no localStorage
          localStorage.setItem('token', response.jwt);
        })
      );
  }

  // Método para logout de usuário
  logout(): void {
    // Remove o token do localStorage
    localStorage.removeItem('token');
  }

  // Método para verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    // Verifica se o token está no localStorage
    return !!localStorage.getItem('token');
  }
}
