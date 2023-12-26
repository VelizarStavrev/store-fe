import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

// Services
import { NotificationService } from 'src/app/services/notification/notification.service';

// Interfaces
import { Response, ResponseData, ResponseLogin, ResponseRegister } from 'src/app/interfaces/user';

// Other
import { config } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userURL = config.serverURL + '/user';
  isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  username: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService,
  ) {
    this.setUserLoggedIn();
    this.setUsername();
  }

  userRegister(data: {
    email: string;
    username: string;
    password: string;
    repassword: string;
  }): Observable<ResponseRegister> {
    return this.http.post<ResponseRegister>(this.userURL + '/register', data);
  }

  userLogin(username: string, password: string): Observable<ResponseLogin> {
    const data = { username, password };
    return this.http.post<ResponseLogin>(this.userURL + '/login', data);
  }

  userLogout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.setUserLoggedIn();
    this.setUsername();
    this.router.navigate(['/login']);
    this.notificationService.setNotification({ type: 'success', message: 'Successfully logged out.' });
  }

  userDataChange(data: { username: string, email: string }): Observable<Response> {
    return this.http.post<Response>(this.userURL + '/change/data', data);
  }

  userPasswordChange(data: { password: string, repassword: string }): Observable<Response> {
    return this.http.post<Response>(this.userURL + '/change/password', data);
  }

  getUserData(): Observable<ResponseData> {
    return this.http.get<ResponseData>(this.userURL + '/data');
  }

  setUserLoggedIn(): void {
    const currentUserStatus = !!localStorage.getItem('token');
    this.isUserLoggedIn.next(currentUserStatus);
  }

  setUsername(): void {
    const currentUsername = localStorage.getItem('username') ?? '';
    this.username.next(currentUsername);
  }

  getUserToken(): string | null {
    const currentUserToken: string | null = localStorage.getItem('token');
    return currentUserToken;
  }
}
