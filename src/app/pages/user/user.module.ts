import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './../../components/user-form/user-form.component';
import { NewUserComponent } from './new-user/new-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from './../../shared/shared.module';


const Components = [UserFormComponent, NewUserComponent, UserProfileComponent]


@NgModule({
  declarations: Components,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule
  ],
  exports: Components
})
export class UserModule { }
