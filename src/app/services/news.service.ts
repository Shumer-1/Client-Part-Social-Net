import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiGetUrl = 'https://localhost:3000/api/news';
  private apiPostUrl = 'https://localhost:3000/api/add-news';

  constructor(private http: HttpClient) {}

  getNews(): Observable<any> {
    return this.http.get<any>(this.apiGetUrl);
  }
  addNews(newsData: any): Observable<any> {
    return this.http.post<any>(this.apiPostUrl, newsData);
  }
}
