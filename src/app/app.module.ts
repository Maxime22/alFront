import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { GroupSectionComponent } from './group-section/group-section.component';
import { SectionComponent } from './section/section.component';
import { PageComponent } from './page/page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { Routes, RouterModule } from "@angular/router";
import { SignupComponent } from './auth/signup/signup.component';
import { SectionService } from './services/section.service';
import { AdminComponent } from './admin/admin.component';
import { SectionListComponent } from './admin/section-list/section-list.component';
import { EditSectionComponent } from './admin/edit-section/edit-section.component';
import { CreateSectionComponent } from './admin/create-section/create-section.component';
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
import { EditUserComponent } from './admin/edit-user/edit-user.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';

import { RouteHistory } from './services/routeHistory.service';
import { LayoutGroupAndSectionComponent } from './layout-group-and-section/layout-group-and-section.component';
import { SlideComponent } from './slide/slide.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMasonryModule } from 'ngx-masonry';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'section/:sectionTitle', component: LayoutGroupAndSectionComponent },
  { path: 'groupSection/:groupSectionTitle', component: LayoutGroupAndSectionComponent },
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
  { path: 'admin/editUserAnne', canActivate: [AuthGuardService],component: EditUserComponent },
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
    AdminComponent,
    SectionListComponent,
    EditSectionComponent,
    CreateSectionComponent,
    GroupSectionListComponent,
    CreateGroupSectionComponent,
    EditGroupSectionComponent,
    EditPageComponent,
    CreatePageComponent,
    PageListComponent,
    EditUserComponent,
    LayoutGroupAndSectionComponent,
    SlideComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    RxReactiveFormsModule,
    CKEditorModule,
    BrowserAnimationsModule,
    NgxMasonryModule
  ],
  providers: [AuthService, AuthGuardService, SectionService, GroupSectionService, PhotoService, PageService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, RouteHistory],
  bootstrap: [AppComponent]
})
export class AppModule { }
