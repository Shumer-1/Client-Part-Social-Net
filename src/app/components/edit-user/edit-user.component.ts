import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../../services/users.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  userId: number = 0;
  users: User[] = [];
  user: User | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private userService: UserService
  ) {
    this.editUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      photo: [null],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.loadUserData();
    });
  }

  loadUserData(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        console.log(this.userId);
        this.users = data;
        const user = this.users.find((user: any) => user.id === this.userId);
        console.log(user);
      }
    );
  }

  onSubmit() {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.editUserForm.valid) {
      const formData = new FormData();

      formData.append('id', this.userId.toString());
      formData.append('name', this.editUserForm.get('name')?.value);
      formData.append('email', this.editUserForm.get('email')?.value);

      const photo = this.editUserForm.get('photo')?.value;
      if (photo) {
        formData.append('photo', photo);
      }

      this.http.post('https://localhost:3000/api/edit/', formData)
        .subscribe(
          response => {
            console.log('Изменения успешны', response);
            this.router.navigate(['/profile/', this.userId]);
          },
          (error: HttpErrorResponse) => {
            this.errorMessage = 'Ошибка редактирования';
            console.error('Ошибка редактирования', error);
          }
        );
    } else {
      this.errorMessage = 'Пожалуйста, заполните форму правильно';
    }
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.editUserForm.patchValue({photo: file});
    }
  }
}
