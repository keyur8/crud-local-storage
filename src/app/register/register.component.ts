import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  register() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value);
      const { email, password } = this.registerForm.value;
      if (this.authService.login(email, password)) {
        this.router.navigate(['/home']);
      } else {
        // Fallback in case login fails
        this.router.navigate(['/login']);
      }
    }
  }
}
