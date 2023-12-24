import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

// Services
import { NotificationService } from 'src/app/services/notification/notification.service';

// Interfaces
import { Register } from 'src/app/interfaces/register';
import { Login } from 'src/app/interfaces/login';

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
  }): Observable<Register> {
    return this.http.post<Register>(this.userURL + '/register', data);
  }

  userLogin(username: string, password: string): Observable<Login> {
    const data: object = { username, password };
    return this.http.post<Login>(this.userURL + '/login', data);
  }

  userLogout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.setUserLoggedIn();
    this.setUsername();
    this.router.navigate(['/login']);
    this.notificationService.setNotification({ type: 'success', message: 'Successfully logged out.' });
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
