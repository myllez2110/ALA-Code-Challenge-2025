import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './shared/pages/login-page/login-page';
import { ButtonPage } from './shared/pages/button-page/button-page';
import { FooPage } from './shared/pages/foo-page/foo-page';
import { BarPage } from './shared/pages/bar-page/bar-page';
import { UsersComponent } from './shared/pages/users/users.component';
import { AuthGuard } from './core/guard/auth-guard';

const routes: Routes = [
  { path: '', component: LoginPage },
  { path: 'button', component: ButtonPage, canActivate: [AuthGuard], data: { roles: ['user', 'admin'] } },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'dropdownbutton/foo', component: FooPage, canActivate: [AuthGuard], data: { roles: ['user', 'admin'] } },
  { path: 'dropdownbutton/bar', component: BarPage, canActivate: [AuthGuard], data: { roles: ['user', 'admin'] } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }