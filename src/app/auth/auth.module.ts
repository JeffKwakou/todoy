import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';

const components = [
  AuthComponent,
  SignupComponent,
  LoginComponent,
  ResetPasswordComponent,
  UpdateUserComponent
]

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
