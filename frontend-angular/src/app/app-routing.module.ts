import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarFormularioComponent } from './components/criar-formulario/criar-formulario.component';
import { PreencherFormularioComponent } from './components/preencher-formulario/preencher-formulario.component';

const routes: Routes = [
  {path: '', component: CriarFormularioComponent},
  {path: 'forms', component: PreencherFormularioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
