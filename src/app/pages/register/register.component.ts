import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  NonNullableFormBuilder,
  ValidationErrors,
  ValidatorFn,
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
        this.badNameValidator('badname'),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    positions: this.fb.array([this.fb.control('')]),
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: [''],
  });

  // გამოიყენეთ NonNullableFormBuilder რომ reset()-მა
  // null-ის მაგივრად დააყენოს საწყისი მნიშვნელობები
  constructor(private fb: NonNullableFormBuilder) {
    this.controls['confirmPassword'].setValidators(
      this.confirmPasswordValidator(this.controls['password'])
    );
  }

  get controls() {
    return this.registerForm.controls;
  }

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

  badNameValidator(pattern: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value.includes(pattern)
        ? { badName: 'Contains a bad name!' }
        : null;
    };
  }

  confirmPasswordValidator(compareTo: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return { required: 'Please confirm password!' };
      }
      if (control.value !== compareTo.value) {
        return { confirmPassword: 'The passwords do not match!' };
      }
      return null;
    };
  }
}
