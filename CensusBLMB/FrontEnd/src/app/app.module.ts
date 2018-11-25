import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginUserPassComponent } from './login-user-pass/login-user-pass.component';
import { HomeComponent } from './home/home.component';
import { LoginEcnCfnComponent } from './login-ecn-cfn/login-ecn-cfn.component';
import { RegisterCollectorComponent } from './register-collector/register-collector.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { CuartaPaginaComponent } from './cuarta-pagina/cuarta-pagina.component';
import { FillFormComponent } from './fill-form/fill-form.component';
import { SegundaPaginaComponent } from './segunda-pagina/segunda-pagina.component';
import { TerceraPaginaComponent } from './tercera-pagina/tercera-pagina.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginUserPassComponent,
    LoginEcnCfnComponent,
    RegisterCollectorComponent,
    CreateFormComponent,
    CuartaPaginaComponent,
    FillFormComponent,
    SegundaPaginaComponent,
    TerceraPaginaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
