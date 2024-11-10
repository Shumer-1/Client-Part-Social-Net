import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';  // Переменная для имени пользователя
  password: string = '';  // Переменная для пароля

  users: User[] = [];
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    console.log('Запрос к API пользователей отправляется');
    this.userService.getUsers().subscribe(
      (data: User[]) => { // Укажите тип данных для ответа
        this.users = data; // Сохранение данных в массив
      },
      (error) => {
        this.errorMessage = 'Ошибка при загрузке пользователей'; // Обработка ошибок
        console.error('Error loading users:', error);
      }
    );
  }

  onSubmit(): void {
    const userExists = this.users.some(user => user.name === this.username);
    if (!userExists) {
      this.errorMessage = 'Пользователь не существует, пожалуйста перейдите в регистрацию';
    } else {
      this.errorMessage = '';
      const user = this.users.find(user => user.name === this.username);
      const users = this.users;
      if (user?.password !== this.password) {
        this.errorMessage = 'Пароль неверный';
      }
      else {
        this.router.navigate(['/profile', user.id], { state: { users: this.users } }); // Передаем объект пользователя в state
      }
    }
  }
}
