import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  firebaseService = inject(FirebaseService);
  authService = inject(AuthService);
  router = inject(Router);
  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  async login() {
    const name = this.profileForm.controls.name.value;
    const userData = {
      name: name,
    };
    const userId = await this.firebaseService.addDocument('users', userData);
    this.authService.login(userData.name);
    this.router.navigate(['/search', userId]);
  }
}
