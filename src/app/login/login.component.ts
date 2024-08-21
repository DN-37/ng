import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ErrorMessage } from '../auth/auth.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  authService = inject(AuthService);
  router = inject(Router);

  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl<string | null>(null),
      password: new FormControl<string | null>(null),
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate(['/devices']);
      },
      error: (error: ErrorMessage) => {
        this.errorMessage = error.error.error.data.msg;
      },
    });
  }
}
