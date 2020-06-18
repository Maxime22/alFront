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
import { PhotoService } from './services/photo.service';
import {  RxReactiveFormsModule } from "@rxweb/reactive-form-validators";

import { CKEditorModule } from 'ckeditor4-angular';
import { EditPageComponent } from './admin/edit-page/edit-page.component';
import { CreatePageComponent } from './admin/create-page/create-page.component';
import { PageListComponent } from './admin/page-list/page-list.component';
import { PageService } from './services/page.service';

const appRoutes: Routes = [
  { path: 'auth/signUp', component: SignupComponent },
  { path: 'auth/signIn', component: SigninComponent },
  { path: 'section/:sectionTitle', component: LayoutSectionComponent },
  { path: 'groupSection/:groupSectionTitle', component: LayoutGroupSectionComponent },
  { path: 'price', component: PageComponent },
  { path: 'contact', component: PageComponent },
  { path: 'admin', canActivate: [AuthGuardService], component: AdminComponent },
  { path: 'admin/sectionList', canActivate: [AuthGuardService], component: SectionListComponent },
  { path: 'admin/sectionList/editSection/:id', canActivate: [AuthGuardService], component: EditSectionComponent },
  { path: 'admin/sectionList/createSection', canActivate: [AuthGuardService], component: CreateSectionComponent },
  { path: 'admin/groupSectionList', canActivate: [AuthGuardService],component: GroupSectionListComponent },
  { path: 'admin/groupSectionList/editGroupSection/:id', canActivate: [AuthGuardService], component: EditGroupSectionComponent },
  { path: 'admin/groupSectionList/createGroupSection', canActivate: [AuthGuardService], component: CreateGroupSectionComponent },
  { path: 'admin/pageList', canActivate: [AuthGuardService], component: PageListComponent },
  { path: 'admin/pageList/createPage', canActivate: [AuthGuardService],component: CreatePageComponent },
  { path: 'admin/pageList/editPage/:id', canActivate: [AuthGuardService],component: EditPageComponent },
  { path: '', component: PageComponent },
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
    LayoutSectionComponent,
    AdminComponent,
    SectionListComponent,
    EditSectionComponent,
    CreateSectionComponent,
    LayoutGroupSectionComponent,
    GroupSectionListComponent,
    CreateGroupSectionComponent,
    EditGroupSectionComponent,
    EditPageComponent,
    CreatePageComponent,
    PageListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    RxReactiveFormsModule,
    CKEditorModule
  ],
  providers: [AuthService, AuthGuardService, SectionService, GroupSectionService, PhotoService, PageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
