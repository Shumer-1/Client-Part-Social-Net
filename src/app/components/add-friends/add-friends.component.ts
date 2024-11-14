import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NewsService} from '../../services/news.service';
import {UserService} from '../../services/users.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.css']
})
export class AddFriendsComponent implements OnInit {
  dataParse: any[] = [];
  users: User[] = [];
  friends_id: number[] | undefined = [];
  userId: number = 0;
  user: User | undefined = undefined;


  constructor(private newsService: NewsService, private router: Router,
              private route: ActivatedRoute, private userService: UserService) {
  }

  addFriend(friendId: number) {
    if (!this.user?.friends.includes(friendId)) {
      this.user?.friends.push(friendId);
      this.friends_id = this.user?.friends;
      this.updateUserFriends();
    }
  }

  isFriend(userId: number) {
    if (this.user?.friends!.includes(userId)) {
      return true;
    }
    return false;
  }


  removeFriend(friendId: number) {
    if (this.user?.friends.includes(friendId)) {
      this.friends_id = this.user!.friends.filter(id => id !== friendId);
      this.updateUserFriends();
    }
  }
  private updateUserFriends(): void {
    const updatedUser = { id: this.userId, friends: this.friends_id };
    this.userService.updateUserFriends(updatedUser).subscribe(
      () => console.log('Список друзей обновлен'),
      error => console.error('Ошибка обновления друзей', error)
    );
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];

      this.userService.getUsers().subscribe(
        (data) => {
          console.log(this.userId);
          this.users = data;
          const user = this.users.find((user: any) => user.id === this.userId);
          this.user = user;
          console.log(user);
          if (user) {
            this.friends_id = user.friends;
          }
          if (this.friends_id) {
            this.dataParse = this.users.filter(u => this.friends_id!.includes(u.id));
          }
        }
      );

    });
  }
}
