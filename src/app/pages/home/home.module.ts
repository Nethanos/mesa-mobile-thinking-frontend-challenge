import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from './../user/user.module';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastContainerModule } from 'ngx-toastr';





@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastContainerModule,
    UserModule


  ]
})
export class HomeModule { }
