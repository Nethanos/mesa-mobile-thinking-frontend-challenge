import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './pages/sign-in/signIn.component';


const routes: Routes = [
  { path: "", component: SignInComponent, pathMatch: "full" },
  { path: "map", loadChildren: () => import('./pages/map/map.module').then(m => m.MapModule) },
  { path: "profile", loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
