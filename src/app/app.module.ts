import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { GroupSectionComponent } from './group-section/group-section.component';
import { SectionComponent } from './section/section.component';
import { PageComponent } from './page/page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { Routes, RouterModule } from "@angular/router";
import { SignupComponent } from './auth/signup/signup.component';
import { SectionService } from './services/section.service';
import { HomeComponent } from './home/home.component';
import { LayoutSectionComponent } from './layout-section/layout-section.component';

const appRoutes: Routes = [
  { path: 'auth/signUp', component: SignupComponent },
  { path: 'auth/signIn', component: SigninComponent },
  { path: 'section/:sectionTitle', component: LayoutSectionComponent },
  { path: '', component: HomeComponent },
  // {
  //   path: 'not-found',
  //   component: FourOhFourComponent
  // },
  {
    path:"**", redirectTo:''
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    FooterComponent,
    HeaderComponent,
    GroupSectionComponent,
    SectionComponent,
    PageComponent,
    SignupComponent,
    HomeComponent,
    LayoutSectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
providers: [AuthService, AuthGuardService, SectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
