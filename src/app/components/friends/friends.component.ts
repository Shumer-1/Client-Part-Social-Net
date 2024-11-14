import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NewsService} from '../../services/news.service';
import {UserService} from '../../services/users.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  newsList: any[] = [];
  dataParse: any[] = [];
  users: User[] = [];
  friends_id: number[] = [];
  userId: number = 0;

  constructor(private newsService: NewsService, private router: Router,
              private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];

      this.userService.getUsers().subscribe(
        (data) => {
          console.log(this.userId);
          this.users = data;
          const user = this.users.find((user: any) => user.id === this.userId);
          console.log(user);
          if (user) {
            this.friends_id = user.friends;
          }
          this.dataParse = this.users.filter(u =>  this.friends_id.includes(u.id));
        }
      );

    });
  }
}
