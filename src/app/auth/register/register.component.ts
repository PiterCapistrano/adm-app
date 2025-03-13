import { Component } from '@angular/core';
import { AuthService, User } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  user: User = {
    nome: '',
    email: '',
    password: '',
  };
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    this.authService.register(this.user).subscribe({
      next: () => {
        this.successMessage = 'Usuário cadastrado com sucesso!';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.errorMessage = 'Erro ao cadastrar usuário. Tente novamente.';
        console.error(err);
      },
    });
  }
}
