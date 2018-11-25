import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginUserPassComponent } from './login-user-pass/login-user-pass.component';
import { LoginEcnCfnComponent } from './login-ecn-cfn/login-ecn-cfn.component';
import { RegisterCollectorComponent } from './register-collector/register-collector.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { CuartaPaginaComponent } from './cuarta-pagina/cuarta-pagina.component';
import { FillFormComponent } from './fill-form/fill-form.component';
import { SegundaPaginaComponent } from './segunda-pagina/segunda-pagina.component';
import { TerceraPaginaComponent } from './tercera-pagina/tercera-pagina.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login-user-pass',
    component: LoginUserPassComponent
  },
  {
    path: 'login-ecn-cfn',
    component: LoginEcnCfnComponent
  },
  {
    path: 'register-collector',
    component: RegisterCollectorComponent
  },
  {
    path: 'create-form',
    component: CreateFormComponent
  },
  {
    path: 'segunda-pagina',
    component: SegundaPaginaComponent
  },
  {
    path: 'cuarta-pagina',
    component: CuartaPaginaComponent
  },
  {
    path: 'tercera-pagina',
    component: TerceraPaginaComponent
  },

  { path: 'fill-form',
    component: FillFormComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
