import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Router} from '@angular/router';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      rememberPassword: new FormControl(),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value;

      this.auth.signInWithEmailAndPassword(email, password)
        .then(() => {
          this.router.navigateByUrl('/home');
        })
    } else {
      console.log('Form is invalid');
      Object.keys(this.loginForm.controls).forEach((key) => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  loginWithGoogle() {
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(async (result) => {
        const isNewUser = result.additionalUserInfo?.isNewUser;
        if (isNewUser) {
          this.router.navigateByUrl('/signup-social');
        } else {
          const user = result.user;
          const uid = user?.uid;
          const userDoc = await this.firestore.collection('users').doc(uid).get().toPromise();
          const password = userDoc?.get('password');
          if (password) {
            await user?.updatePassword(password);
          }
          this.router.navigateByUrl('/home');
        }
      })
  }
}
