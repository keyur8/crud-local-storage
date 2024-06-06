import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersKey = 'users';
  private currentUserKey = 'currentUser';

  constructor() { }

  register(user: any) {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  login(email: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find((u:any) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.currentUserKey);
  }

  getUsers() {
    return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem(this.currentUserKey) || 'null');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.currentUserKey) !== null;
  }

  get isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }
}
