import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewsService} from '../../services/news.service'; // Путь к вашему сервису
import {ActivatedRoute, Router} from '@angular/router';
import { io } from 'socket.io-client'; // Импортируем библиотеку socket.io-client

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent {
  addNewsForm: FormGroup;
  userId: number = 0;
  socket: any; // Объявляем socket

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
    }
    );
    // Инициализация WebSocket соединения
    this.socket = io('https://localhost:3000'); // Замените на ваш адрес сервера
  }


  constructor(private fb: FormBuilder, private newsService: NewsService, private route: ActivatedRoute,
              private router: Router) {
    this.addNewsForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  // Метод для отправки формы
  onSubmit() {
    if (this.addNewsForm.valid) {
      const newsData = this.addNewsForm.value;
      newsData.author_id = this.userId;

      // Отправляем новость на сервер
      this.newsService.addNews(newsData).subscribe(
        response => {
          console.log('Новость успешно добавлена!', response);
          // Отправляем новость через WebSocket на сервер для обновления всех клиентов
          this.socket.emit('newNews', newsData);

          // Очистка формы после успешной отправки
          this.addNewsForm.reset();
          this.router.navigate(['/profile', this.userId]);
        },
        error => {
          console.error('Ошибка при добавлении новости:', error);
        }
      );
    } else {
      console.log('Форма невалидна');
    }
  }

}
