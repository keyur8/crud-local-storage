import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  userForm: FormGroup;
  editMode = false;
  editIndex: number | null = null;


  constructor(private authService: AuthService, private router: Router,
    private userService: UserService, private fb: FormBuilder) {
    
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.users = this.userService.getUsers();
  }

  addUser() {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value);
      this.userForm.reset();
      this.ngOnInit();
    }
  }

  editUser(index: number) {
    this.editMode = true;
    this.editIndex = index;
    const user = this.users[index];
    this.userForm.setValue({
      email: user.email,
      password: user.password
    });
  }

  updateUser() {
    if (this.userForm.valid && this.editIndex !== null) {
      this.userService.updateUser(this.editIndex, this.userForm.value);
      this.userForm.reset();
      this.editMode = false;
      this.editIndex = null;
      this.loadUsers();
    }
  }
  
  loadUsers() {
    this.users = this.userService.getUsers();
  }

  deleteUser(email: string) {
    this.userService.deleteUser(email);
    this.ngOnInit();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
