import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {environment} from '../environment';

import {NavbarComponent} from "./components/navbar/navbar.component";
import {FooterComponent} from './components/footer/footer.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {LandingComponent} from './pages/landing/landing.component';
import {HomeComponent} from './pages/home/home.component';
import {ContactComponent} from "./components/contact/contact.component";
import {TestimonialsComponent} from "./components/testimonials/testimonials.component";
import {LoginComponent} from "./pages/login/login.component";
import {SignupSocialComponent} from "./pages/signup-social/signup-social.component";
import {SignupComponent} from "./pages/signup/signup.component";
import {PrivacyComponent} from "./pages/privacy/privacy.component";
import {TermsComponent} from "./pages/terms/terms.component";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PageNotFoundComponent,
    LandingComponent,
    HomeComponent,
    ContactComponent,
    TestimonialsComponent,
    LoginComponent,
    SignupSocialComponent,
    SignupComponent,
    PrivacyComponent,
    TermsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
