import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      dob: ['', Validators.required],
      photo: [null]
    });
  }

  onSubmit() {
    this.errorMessage = null;

    if (this.registrationForm.valid) {
      const formData = new FormData();
      formData.append('name', this.registrationForm.get('name')?.value);
      formData.append('email', this.registrationForm.get('email')?.value);
      formData.append('password', this.registrationForm.get('password')?.value);
      formData.append('dob', this.registrationForm.get('dob')?.value);

      const fileInput = this.registrationForm.get('photo')?.value;
      if (fileInput) {
        formData.append('photo', fileInput);
      }

      this.http.post('https://localhost:3000/api/register', formData)
        .subscribe(
          response => {
            console.log('Регистрация прошла успешно', response);
            this.router.navigate(['/']);
          },
          (error: HttpErrorResponse) => {
            if (error.status === 409) { // Проверка на конфликт
              this.errorMessage = 'Пользователь уже существует';
            } else {
              this.errorMessage = 'Произошла ошибка при регистрации';
            }
            console.error('Ошибка при регистрации', error);
          }
        );
    } else {
      console.log('Форма заполнена некорректно');
    }
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registrationForm.patchValue({ photo: file });
    }
  }
}
