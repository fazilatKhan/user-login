import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { CreateUserComponent } from './create-user/create-user.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'user-list', component: UserListComponent },
    { path: 'create-user', component: CreateUserComponent },
    { path: 'create-user/:id', component: CreateUserComponent },
  
];
