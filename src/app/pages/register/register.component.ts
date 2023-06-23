import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[A-z]/),
        Validators.minLength(2),
        Validators.maxLength(20),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    positions: this.fb.array([this.fb.control('')]),
  });

  // გამოიყენეთ NonNullableFormBuilder რომ reset()-მა
  // null-ის მაგივრად დააყენოს საწყისი მნიშვნელობები
  constructor(private fb: FormBuilder) {}

  get positions() {
    return this.registerForm.controls['positions'];
  }

  onSubmit() {
    console.log(this.registerForm.value);
    this.registerForm.reset();
    console.log(this.registerForm.value);
  }

  updateName() {
    this.registerForm.patchValue({
      email: 'email@email',
      password: 'this is a password',
    });
  }

  addPosition() {
    this.positions.push(this.fb.control(''));
  }
}
