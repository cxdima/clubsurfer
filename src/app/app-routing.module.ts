import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {LandingComponent} from "./pages/landing/landing.component";
import {LoginComponent} from "./pages/login/login.component";
import {TermsComponent} from "./pages/terms/terms.component";
import {SignupComponent} from "./pages/signup/signup.component";
import {HomeComponent} from "./pages/home/home.component";
import {PrivacyComponent} from "./pages/privacy/privacy.component";
import {SignupSocialComponent} from "./pages/signup-social/signup-social.component";


const routes: Routes = [
  {path: 'landing', component: LandingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'home', component: HomeComponent},
  {path: 'signup-social', component: SignupSocialComponent},
  {path: 'terms', component: TermsComponent},
  {path: 'privacy', component: PrivacyComponent},

  {path: 'page-not-found', component: PageNotFoundComponent},
  {path: '', redirectTo: 'landing', pathMatch: 'full'},
  {path: '**', redirectTo: 'page-not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
