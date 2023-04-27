import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from '@angular/router';
import firebase from 'firebase/compat/app';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-signup-social',
  templateUrl: './signup-social.component.html',
  styleUrls: ['./signup-social.component.css']
})

export class SignupSocialComponent {
  signupForm: FormGroup;
  errorMessage: string;

  constructor(private router: Router, private readonly firestore: AngularFirestore, private readonly auth: AngularFireAuth) {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
    this.errorMessage = '';
    this.auth.currentUser.then((user) => {
      if (user) {
        this.signupForm.addControl('email', new FormControl(user.email, [Validators.required, Validators.email]));
        this.signupForm.addControl('uid', new FormControl(user.uid));
      }
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const firstName = this.signupForm.value.firstName;
      const lastName = this.signupForm.value.lastName;
      const email = this.signupForm.value.email;
      const uid = this.signupForm.value.uid;
      const password = this.signupForm.value.password;

      const user: User = {
        firstName,
        lastName,
        email,
        password,
      };
      this.auth.currentUser.then((firebaseUser) => {
        if (firebaseUser && firebaseUser.providerData[0]?.providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID) {
          firebaseUser.updatePassword(password)
        }
      });
      this.firestore.collection('users').doc(uid).set(user)
        .then(() => {
          this.router.navigate(['/home']);
        });
    } else {
      console.log('Form is invalid');
      Object.keys(this.signupForm.controls).forEach(key => {
        this.signupForm.get(key)?.markAsTouched();
      });
    }
  }
}
