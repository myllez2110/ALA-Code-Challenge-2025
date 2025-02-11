import { BehaviorSubject, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from './Constants';
import { User, UserLogin, UserLoginResponse, UserInsert, UserUpdate } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private BASE_URL: string = Constants.USER;
  private currentUserSource = new BehaviorSubject<any | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  getCurrentUser = () => sessionStorage.getItem('name');
  getCurrentAccessLevel = () => sessionStorage.getItem('roles');
  getCurrentToken = () => sessionStorage.getItem('token');
  getCurrentUserId = () => sessionStorage.getItem('userId');

  constructor(private http: HttpClient) { }

  Login = (user: UserLogin) => this.http.post<UserLoginResponse>(`${this.BASE_URL}/Validate`, user).pipe(
    map((user: UserLoginResponse) => {
      sessionStorage.setItem('roles', user.role);
      sessionStorage.setItem('name', user.name);
      sessionStorage.setItem('token', user.token);
    }));

  GetList = () => this.http.get<User[]>(`${this.BASE_URL}/Read`);
  
  GetById = (id: number) => this.http.get<User>(`${this.BASE_URL}/Read/${id}`);
  
  Insert = (obj: UserInsert) => this.http.post(`${this.BASE_URL}/Create`, obj);
  
  UpdateById = (obj: UserUpdate) => this.http.put(`${this.BASE_URL}/UpdateById`, obj);
  
  DeleteById = (id: number) => this.http.delete(`${this.BASE_URL}/DeleteById/${id}`);

  Logout = () => {
    sessionStorage.clear();
  }
}