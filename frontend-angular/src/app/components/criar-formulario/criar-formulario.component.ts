import { Component } from '@angular/core';
import { CampoInterface } from 'src/app/interfaces/campo.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-criar-formulario',
  templateUrl: './criar-formulario.component.html',
  styleUrls: ['./criar-formulario.component.scss']
})
export class CriarFormularioComponent {
  nomeForms: String;
  maxCampos: Number = 5;
  campos: Array<CampoInterface>;
  tiposCampos = [
    {id: 0, nome: "Texto Simples"},
    {id: 1, nome: "Texto Grande"},
    {id: 2, nome: "Check Box"}
  ];
  msgErro: String = "";
  msg: String = "";

  constructor(private router: Router) {
    this.nomeForms = "";
    this.campos = new Array();
  }

  criarCampo() {
    const novoCampo = {} as CampoInterface;
    // Inicializar o array para não dar null pointer
    novoCampo.boxFields = new Array();
    this.campos.push(novoCampo);
  }
  excluirCampo(index: number) {
    this.campos.splice(index, 1);
  }
  renderizarFormulario() {
    // Flag sinalizando erro
    var flagErro = 0;

    // Filtragem
    if(this.nomeForms === "") {
      this.msgErro = "Insira um nome para o formulário";
      flagErro = -1;
      return;
    }
    if(this.campos.length <= 0) {
      this.msgErro = "Nenhum campo adicionado";
      flagErro = -1;
      return;
    }
    this.campos.forEach(campo => {
      if(typeof campo.label !== 'string' || campo.label.length === 0) {
        this.msgErro = "Label não pode estar vazia";
        flagErro = -1;
        return;
      }
      if(typeof campo.idCampo !== 'string' || campo.idCampo.length === 0) {
        this.msgErro = "Id não pode estar vazio";
        flagErro = -1;
        return;
      }
      if(!this.tiposCampos.find(tipo => tipo.id == campo.tipo)) {
        this.msgErro = "Selecione um tipo de campo válido";
        flagErro = -1;
        return;
      }
      if(campo.tipo === 2 && (typeof campo.boxFields[0] !== 'string' || campo.boxFields[0].length === 0)) {
        this.msgErro = "Primeiro box não pode estar vazio";
        flagErro = -1;
        return;
      }
      campo.nomeFormulario = this.nomeForms;
    });
    
    if(flagErro === -1) return; 

    // Armazenar o formulário em JSON local
    localStorage.setItem('formulario', JSON.stringify(this.campos));
      this.msgErro = "";
      this.campos = new Array();
      alert("Formulário Criado");
      this.router.navigate(['/preencher-form']);
  }
  
}
