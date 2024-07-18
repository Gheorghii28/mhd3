import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;
  private username: string | null = null;

  login(name: string | null): void {
    this.isLoggedIn = true;
    this.username = name;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.username = null;
  }

  isLoggedInUser(): boolean {
    return this.isLoggedIn;
  }

  getUsername(): string | null {
    return this.username;
  }
}
