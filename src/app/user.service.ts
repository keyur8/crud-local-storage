import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersKey = 'users';

  constructor() { }

  getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  addUser(user: any) {
    let users = this.getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }

  updateUser(index: number, updatedUser: any) {
    const users = this.getUsers();
    users[index] = updatedUser;
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  deleteUser(email: string) {
    let users = this.getUsers();
    users = users.filter((u: any) => u.email !== email);
    localStorage.setItem('users', JSON.stringify(users));
  }
}
