import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private baseUrl: string;
  
  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8080/springboot-angular-test/api/user/users';
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.baseUrl, user);
  }

  public deleteUser(id: any): Observable<User> {
    return this.http.delete(`${this.baseUrl}?id=${id}`);
  }

  public findByFirstNameOrLastName(user: User): Observable<User[]> {
    return this.http.post<User[]>(`${this.baseUrl}/firstname/lastname`, user);
  }

}
