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
import { AdminComponent } from './admin/admin.component';
import { SectionListComponent } from './admin/section-list/section-list.component';
import { EditSectionComponent } from './admin/edit-section/edit-section.component';
import { CreateSectionComponent } from './admin/create-section/create-section.component';
import { LayoutGroupSectionComponent } from './layout-group-section/layout-group-section.component';
import { GroupSectionService } from './services/group-section.service';
import { GroupSectionListComponent } from './admin/group-section-list/group-section-list.component';
import { CreateGroupSectionComponent } from './admin/create-group-section/create-group-section.component';
import { EditGroupSectionComponent } from './admin/edit-group-section/edit-group-section.component';

const appRoutes: Routes = [
  { path: 'auth/signUp', component: SignupComponent },
  { path: 'auth/signIn', component: SigninComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/sectionList', component: SectionListComponent },
  { path: 'admin/sectionList/editSection/:id', component: EditSectionComponent },
  { path: 'admin/sectionList/createSection', component: CreateSectionComponent },
  { path: 'admin/groupSectionList', component: GroupSectionListComponent },
  { path: 'admin/groupSectionList/editGroupSection/:id', component: EditGroupSectionComponent },
  { path: 'admin/groupSectionList/createGroupSection', component: CreateGroupSectionComponent },
  { path: 'section/:sectionTitle', component: LayoutSectionComponent },
  { path: 'groupSection/:groupSectionTitle', component: LayoutGroupSectionComponent },
  { path: '', component: HomeComponent },
  // {
  //   path: 'not-found',
  //   component: FourOhFourComponent
  // },
  {
    path: "**", redirectTo: ''
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
    LayoutSectionComponent,
    AdminComponent,
    SectionListComponent,
    EditSectionComponent,
    CreateSectionComponent,
    LayoutGroupSectionComponent,
    GroupSectionListComponent,
    CreateGroupSectionComponent,
    EditGroupSectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, AuthGuardService, SectionService, GroupSectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
