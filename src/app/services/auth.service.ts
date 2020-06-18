import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  isAuth$ = new BehaviorSubject<boolean>(false);
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
        (authData: { token: string, userId: string }) => {
          this.token = authData.token;
          this.userId = authData.userId;
          this.isAuth$.next(true);
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  signOutUser() {
    this.isAuth$.next(false);
    this.userId = null;
    this.token = null;
  }

  // EDIT
  editUser(user: User) {
    return new Promise((resolve, reject) => {
      this.httpClient.put('http://localhost:3000/alBack/users/editAnne/5eeb4737d03d080ce07cbdea', user).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

}
