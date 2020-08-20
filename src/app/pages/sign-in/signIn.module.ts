import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from '../user/user.module';
import { SignInComponent } from './signIn.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastContainerModule } from 'ngx-toastr';





@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastContainerModule,
    UserModule


  ]
})
export class SignInModule { }
