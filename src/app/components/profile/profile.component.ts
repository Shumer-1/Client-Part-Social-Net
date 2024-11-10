import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  inputValue: string = 'AAAA';
  userId: number | null = null; // ID пользователя
  user: User | undefined = undefined; // Объект пользователя
  friendsList: User[] = []; // Список друзей пользователя
  errorMessage: string = '';
  userPhoto: string | undefined = '';
  isAdm: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Получаем ID пользователя из URL
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      if (this.userId) {
        this.loadUserAndFriends(this.userId);
      }
    });
  }


  goToExternalLink() {
    window.open('https://localhost:3000/', '_blank');
  }


  // Метод для загрузки пользователя и его друзей
  loadUserAndFriends(userId: number): void {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.user = users.find(user => user.id === userId);
        if (this.user?.role=== "администратор"){
          this.isAdm = true;
        }
        console.log(this.user?.role);
        if (this.user) {
          this.userPhoto = "https://localhost:3000" + this.user?.photo;
          console.log(this.userPhoto);
          // Найти объекты друзей по идентификаторам из списка друзей пользователя
          this.friendsList = users.filter(u => this.user!.friends.includes(u.id));
        } else {
          this.errorMessage = 'Пользователь не найден';
        }
      },
      error => {
        this.errorMessage = 'Ошибка при загрузке данных';
        console.error('Error loading users:', error);
      }
    );
  }
}
