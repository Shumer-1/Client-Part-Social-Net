import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NewsService} from '../../services/news.service';
import {UserService} from '../../services/users.service';
import {User} from '../../models/user';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsList: any[] = []; // Поле для хранения списка новостей
  dataParse: any[] = [];
  users: User[] = [];
  friends_id: number[] = [];
  userId: number = 0;
  socket = io('http://localhost:3000'); // Указываем URL сервера WebSocket

  constructor(private newsService: NewsService, private router: Router,
              private route: ActivatedRoute, private userService: UserService) {
  }

  getAuthorName(authorId: number): string {
    const user = this.users.find(u => u.id === authorId);
    return user ? user.name : 'Неизвестно';
  }

  ngOnInit(): void {


    // Слушаем событие initialNews для получения начальных данных
    this.socket.on('initialNews', (news) => {
      this.newsList = news;
    });

    // Слушаем событие updateNews для обновления списка новостей
    this.socket.on('updateNews', (news) => {
      this.newsList = news;
    });


    // Загрузка новостей при инициализации компонента
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
        }
      );

      this.newsService.getNews().subscribe(
        (data) => {
          console.log('Полученные данные:', data);
          console.log(this.friends_id);
          this.dataParse = JSON.parse(data);
          this.dataParse = this.dataParse.filter(news => this.friends_id.includes(news.author_id) || news.author_id === this.userId);
          console.log(this.dataParse);
          this.newsList = this.dataParse;
        },
        (error) => {
          console.error('Ошибка при загрузке новостей:', error);
        }
      );
    });
  }
  // Очистка WebSocket соединения при выходе из компонента
  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
