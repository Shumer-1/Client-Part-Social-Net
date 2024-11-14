import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewsService} from '../../services/news.service';
import {ActivatedRoute, Router} from '@angular/router';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit{
  addNewsForm: FormGroup;
  userId: number = 0;
  socket: any;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
    }
    );
    this.socket = io('https://localhost:3000');
  }


  constructor(private fb: FormBuilder, private newsService: NewsService, private route: ActivatedRoute,
              private router: Router) {
    this.addNewsForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit() {
    if (this.addNewsForm.valid) {
      const newsData = this.addNewsForm.value;
      newsData.author_id = this.userId;

      this.newsService.addNews(newsData).subscribe(
        response => {
          console.log('Новость успешно добавлена!', response);
          this.socket.emit('newNews', newsData);
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
