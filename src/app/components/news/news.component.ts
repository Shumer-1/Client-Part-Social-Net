import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { UserService } from '../../services/users.service';
import { User } from '../../models/user';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, OnDestroy {
  newsList: any[] = [];
  dataParse: any[] = [];
  users: User[] = [];
  friends_id: number[] = [];
  userId: number = 0;
  socket = io('https://localhost:3000');

  constructor(private newsService: NewsService, private router: Router,
              private route: ActivatedRoute, private userService: UserService) {}

  getAuthorName(authorId: number): string {
    const user = this.users.find(u => u.id === authorId);
    return user ? user.name : 'Неизвестно';
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];

      this.userService.getUsers().subscribe((data) => {
        this.users = data;
        const user = this.users.find((user: any) => user.id === this.userId);
        if (user) {
          this.friends_id = user.friends;
          console.log(this.friends_id);
        }
      });

      this.newsService.getNews().subscribe(
        (data) => {
          this.dataParse = JSON.parse(data);
          this.dataParse = this.dataParse.filter(news => this.friends_id.includes(news.author_id) || news.author_id === this.userId);
          console.log(this.dataParse);
          this.newsList = this.dataParse;
          console.log(this.newsList);
        },
        (error) => {
          console.error('Ошибка при загрузке новостей:', error);
        }
      );

      this.socket.on('initialNews', (news) => {
        this.newsList = news;
        this.newsList = this.newsList.filter(news => this.friends_id.includes(news.author_id) || news.author_id === this.userId);
      });

      this.socket.on('updateNews', (news) => {
        this.newsList = news;
        this.newsList = this.newsList.filter(news => this.friends_id.includes(news.author_id) || news.author_id === this.userId);
      });
    });
  }

  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
