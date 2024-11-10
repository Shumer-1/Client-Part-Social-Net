// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from './components/profile/profile.component';
import {NewsComponent} from './components/news/news.component';
import {FriendsComponent} from './components/friends/friends.component';
import {AddNewsComponent} from './components/add-news/add-news.component';
import {EditUserComponent} from './components/edit-user/edit-user.component';
import {AddFriendsComponent} from './components/add-friends/add-friends.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    NewsComponent,
    FriendsComponent,
    AddNewsComponent,
    EditUserComponent,
    AddFriendsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
