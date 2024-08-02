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
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoadingComponent } from './loading/loading.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { CommonLayoutComponent } from './common-layout/common-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: CommonLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  { path: 'users', component: CommonLayoutComponent,children:[{
    path: '', component: UsersComponent
  }] , canActivate: [AuthGuard] },
  { path: 'comments', component: CommonLayoutComponent,children:[{
    path: '', component: CommentsComponent
  }], canActivate: [AuthGuard] },
  { path: 'settings', component: CommonLayoutComponent,children:[{
    path: '', component: SettingsComponent
  }] , canActivate: [AuthGuard] },
  { path: 'history', component: CommonLayoutComponent,children:[{
    path: '', component: HistoryComponent
  }], canActivate: [AuthGuard] },
  { path: 'messages', component: CommonLayoutComponent,children:[{
    path: '', component: MessagesComponent
  }], canActivate: [AuthGuard] },
  {
    path: 'login',
    component: AuthLayoutComponent,
    children: [{ path: '', component: LoginComponent }],
  },
  { path: 'signup', component: SignupComponent },
  { path: 'loading', component: CommonLayoutComponent,children:[{
    path: '', component: LoadingComponent
   },
    ] },
  { path: '**', component: CommonLayoutComponent,children:[{
    path: '', component: PageNotFoundComponent
  }]
   },
];
