import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  localStorageService = inject(LocalStorageService);
  router = inject(Router);
  

  login(name: string | null): void {
    this.localStorageService.setItem('isLoggedIn', true);
    this.localStorageService.setItem('username', name);
  }

  logout(): void {
    this.localStorageService.clear();
    this.router.navigate(['/login']);
  }

  isLoggedInUser(): boolean {
    const isLoggedIn = this.localStorageService.getItem('isLoggedIn');
    return isLoggedIn;
  }

  getUsername(): string | null {
    const username = this.localStorageService.getItem('username');
    return username;
  }
}
