import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'alFront';

  isAuth: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // REMPLACER CA PAR QUOI ?
    // firebase.auth().onAuthStateChanged(
    //   (user) => {
    //     if(user) {
    //       this.isAuth = true;
    //     } else {
    //       this.isAuth = false;
    //     }
    //   }
    // );
  }

  onSignOut() {
    this.authService.signOutUser();
  }

}
