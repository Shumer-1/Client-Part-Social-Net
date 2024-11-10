import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:3000/api/users'; // URL вашего API

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  updateUserFriends(user: { id: number; friends: number[] | undefined }): Observable<any> {
    return this.http.post(`${this.apiUrl}/${user.id}/friends`, user);
  }

}
