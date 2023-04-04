import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CriarFormularioComponent } from './components/criar-formulario/criar-formulario.component';
import { PreencherFormularioComponent } from './components/preencher-formulario/preencher-formulario.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {HttpClientModule} from '@angular/common/http';
import { HomePageComponent } from './components/home-page/home-page.component';
import { InfoPageComponent } from './components/info-page/info-page.component';
@NgModule({
  declarations: [
    AppComponent,
    CriarFormularioComponent,
    PreencherFormularioComponent,
    NavbarComponent,
    HomePageComponent,
    InfoPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
