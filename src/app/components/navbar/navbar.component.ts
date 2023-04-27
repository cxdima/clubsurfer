import {Component} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent {

  isLoggedIn = false;

  constructor(
    private auth: AngularFireAuth,
    private router: Router
  ) {
    // Check user authentication status
    auth.authState.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  logout() {
    this.auth.signOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
  }
}
