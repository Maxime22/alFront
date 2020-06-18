import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  isAuth = false;
  token: string;
  userId: string;

  // SIGNUP
  createNewUser(user: User) {
    return new Promise((resolve, reject) => {
      this.httpClient.post('http://localhost:3000/alBack/users/signup', user).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  signIn(user: User) {
    return new Promise((resolve, reject) => {
      this.httpClient.post('http://localhost:3000/alBack/users/signin', user).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  signOutUser() {
    this.isAuth = false;
  }

}
