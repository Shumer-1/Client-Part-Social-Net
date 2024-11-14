import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegistrationComponent} from './components/registration/registration.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {ProfileComponent} from './components/profile/profile.component';
import {NewsComponent} from './components/news/news.component';
import {FriendsComponent} from './components/friends/friends.component';
import {AddNewsComponent} from './components/add-news/add-news.component';
import {EditUserComponent} from './components/edit-user/edit-user.component';
import {AddFriendsComponent} from './components/add-friends/add-friends.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'news/:id', component: NewsComponent},
  {path: 'friends/:id', component: FriendsComponent},
  {path: 'add-news/:id', component: AddNewsComponent},
  {path: 'edit/:id', component: EditUserComponent},
  {path: 'add-friends/:id', component: AddFriendsComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
