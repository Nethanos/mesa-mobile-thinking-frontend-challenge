import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './../../components/user-form/user-form.component';
import { NewUserComponent } from './new-user/new-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const Components = [UserFormComponent, NewUserComponent]


@NgModule({
  declarations: Components,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: Components
})
export class UserModule { }
