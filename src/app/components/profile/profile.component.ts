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
  userId: number | null = null;
  user: User | undefined = undefined;
  friendsList: User[] = [];
  errorMessage: string = '';
  userPhoto: string | undefined = '';
  isAdm: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
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
