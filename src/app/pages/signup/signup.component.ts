import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Router} from '@angular/router';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string;

  constructor(
    private router: Router,
    private readonly firestore: AngularFirestore,
    private readonly auth: AngularFireAuth
  ) {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
    this.errorMessage = '';
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const firstName = this.signupForm.value.firstName;
      const lastName = this.signupForm.value.lastName;
      const email = this.signupForm.value.email;
      const password = this.signupForm.value.password;

      const user: User = {firstName, lastName, email, password};

      this.auth.createUserWithEmailAndPassword(email, password)
        .then((credential) => {
          const uid = credential.user?.uid;
          if (uid) {
            this.firestore.collection('users').doc(uid).set(user);
            this.router.navigate(['/home']);
          }
        });
    } else {
      console.log('Form is invalid');
      Object.keys(this.signupForm.controls).forEach(key => {
        this.signupForm.get(key)?.markAsTouched();
      });
    }
  }
}
