import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoginRequestDto } from '../model/login-request-dto';
import { LoginResponseDto } from '../model/login-response-dto';
import {SignupRequestDto} from "../model/signup-request-dto";
import {SignupResponseDto} from "../model/signup-response-dto";

const BACKEND_URL = environment.apiUrl + '/Auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token: string;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  login(username: string, password: string) {
    const loginRequestDto: LoginRequestDto = { username: username, password: password };

    this.http
      .post<LoginResponseDto>(BACKEND_URL + '/login', loginRequestDto)
      .subscribe(response => {
        this.token = response.token;
        if (this.token) {
          this.isAuthenticated = true;
          this.saveAuthData(this.token);

          this.navigateAfterLogin(response);
        }
      });
  }

  logout() {
    this.token = '';
    this.isAuthenticated = false;
    this.clearAuthData();

    this.router.navigate(['/login']);
  }

  signup(email: string, username: string, password: string): boolean {
    const signupRequestDto: SignupRequestDto = { email: email, password: password, username: username };
    let success = false;

    this.http
      .post<{ data: SignupResponseDto }>(BACKEND_URL + '/register', signupRequestDto)
      .subscribe(response => {
        success = true;
      });

    return success;
  }

  private navigateAfterLogin(data: LoginResponseDto) {
    if (data.role === 'Admin') {
      this.router.navigate(['/edit-caff']);
    }
    this.router.navigate(['/signup']);
  }

  private saveAuthData(token: string) {
    localStorage.setItem('token', token);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    return {
      token: token,
    };
  }
}

