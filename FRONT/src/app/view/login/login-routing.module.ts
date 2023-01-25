import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { LogoutGuard } from './guard/logout.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'logout',
    component: LoginComponent,
    data: { registering: false },
    canActivate: [LogoutGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
