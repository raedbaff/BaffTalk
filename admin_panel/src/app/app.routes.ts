import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { CommentsComponent } from './comments/comments.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { HistoryComponent } from './history/history.component';
import { MessagesComponent } from './messages/messages.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth-guard.guard';

export const routes: Routes = [
    {path: '', component: DashboardComponent,canActivate: [AuthGuard]},
    {path: 'users', component: UsersComponent,canActivate: [AuthGuard]},
    {path: 'comments',component: CommentsComponent},
    {path: 'settings',component:SettingsComponent},
    {path: 'history',component:HistoryComponent},
    {path: 'messages',component:MessagesComponent},
    {path: 'login',component:LoginComponent},
    {path: 'signup',component:SignupComponent},




];
