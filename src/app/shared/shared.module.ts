import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './../components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const Components = [NavbarComponent]
@NgModule({
  declarations: Components,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: Components
})
export class SharedModule { }
