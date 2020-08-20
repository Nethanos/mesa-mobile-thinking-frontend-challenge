import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './pages/sign-in/signIn.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  { path: "", component: SignInComponent, pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "user", loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
