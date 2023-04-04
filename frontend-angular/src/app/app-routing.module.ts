import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarFormularioComponent } from './components/criar-formulario/criar-formulario.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { InfoPageComponent } from './components/info-page/info-page.component';
import { PreencherFormularioComponent } from './components/preencher-formulario/preencher-formulario.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'info', component: InfoPageComponent},
  {path: 'criar-form', component: CriarFormularioComponent},
  {path: 'preencher-form', component: PreencherFormularioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
