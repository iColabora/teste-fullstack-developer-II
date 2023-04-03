import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CampoInterface } from 'src/app/interfaces/campo.interface';
import { FormBuilder } from '@angular/forms';
import { PostInterface } from 'src/app/interfaces/post.interface';
import { PostServiceService } from 'src/app/services/post-service.service';

@Component({
  selector: 'app-preencher-formulario',
  templateUrl: './preencher-formulario.component.html',
  styleUrls: ['./preencher-formulario.component.scss']
})
export class PreencherFormularioComponent {
  campos: Array<CampoInterface>;
  // Objeto para guardar as respostas de cada campo do form
  resposta: Array<Object> = new Array();
  // Dicionario de checkboxes (id-do-campo: valores escolhidos)
  checkbox: {[id: string]: Array<String>} = {};

  msgErro: String = "";

  posts: Array<PostInterface> = new Array<PostInterface>;

  // Mensagem a ser mostrada no modal
  message: String = "";

  constructor(private postagemService: PostServiceService) {
    this.campos = new Array();
    this.buscarFormularioArmazenado();
  }

  ngOnInit() {
  }

  buscarFormularioArmazenado() {
    var storagedForm = localStorage.getItem('formulario');
    if(storagedForm !== null) {
      var formArray = JSON.parse(storagedForm);
      if(formArray !== null) {
        formArray.forEach((c: CampoInterface) => {
          this.campos.push(c);
        });
      }
    }
  }

  async enviarForm() {
    var errorFlag = 0;
    
    // Filtragem de campos
    for(let i=0;i<this.campos.length;i++) {
      // Inicia cada slot da variável post com base na interface de post
      this.posts[i] = {} as PostInterface;
      this.posts[i].idCampo = this.campos[i].idCampo;
      
      // Se for do tipo Checkbox, buscamos a id no dicionario de checkboxes e atribuimos à resposta
      if(this.campos[i].tipo === 2) {
        for(let key in this.checkbox) {
          if(key.match(this.posts[i].idCampo.toString())) {
            console.log(this.checkbox[key]);
            this.posts[i].resposta = this.checkbox[key];
          }
        }
      }else {
        // Filtro de textos
        if(this.resposta[i] == null) {
          this.msgErro = "Preencha os campos de texto";
          errorFlag = -1;
          return;
        }
        console.log(this.resposta[i]);
        
        this.posts[i].resposta = this.resposta[i];
      }
    }

    if(errorFlag === -1) return;
    
    let result = await this.postagemService.postPostagem(this.posts);
    alert("Formulário enviado");
    this.resposta = Array();
    this.posts = new Array<PostInterface>;
    this.msgErro = "";
    //window.location.reload();
  }

  onCheckBox($event: any, $id: any) {
    if($event.target.checked) {
      //this.checkbox.push($event.target.name);
      if(this.checkbox[$id] === undefined) {
        this.checkbox[$id] = new Array();
      }
      this.checkbox[$id].push($event.target.name);
    }else {
      this.checkbox[$id].forEach(element => {
        if(element.match($event.target.name)) {
          this.checkbox[$id].splice(this.checkbox[$id].indexOf(element), 1);
          return;
        }
      });
    }
    console.log(this.checkbox);

  }
}
