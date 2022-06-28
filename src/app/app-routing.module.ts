import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './services/authentication/authentication.guard';
import { LoginGuard } from './services/authentication/login.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'usuario/login'
  },
  {
    path: 'usuario',
    loadChildren: () =>  import('./modules/user/user.module').then((m) => m.UserModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule),
    canLoad: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
