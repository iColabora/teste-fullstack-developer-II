<template>
  <div>
    <form class="formulario" @submit.prevent="enviar">
      <div v-for="(campo, index) in campos" :key="index" class="grupo-campo">
        <div>{{ campos[index].label }}</div>
        <input v-if="campos[index].tipoCampo=='simples'" type="text" maxlength="30" v-model="respostas[index].resposta">
        <textarea v-else-if="campos[index].tipoCampo=='grande'" name="" rows="3" maxlength="100" style="resize:none" v-model="respostas[index].resposta"></textarea>
        <select v-else-if="campos[index].tipoCampo=='combo'" name="" v-model="respostas[index].resposta">
          <option :value="campos[index].opcao1">{{ campos[index].opcao1 }}</option>
          <option :value="campos[index].opcao2">{{ campos[index].opcao2 }}</option>
          <option :value="campos[index].opcao3">{{ campos[index].opcao3 }}</option>
        </select>
      </div>
      <div class="grupo-botoes">
        <NuxtLink to="/" class="link"><button type="button" class="botao botao-voltar">Editar Formulário</button></NuxtLink>
        <button type="submit" class="botao botao-salvar">Enviar</button>
      </div>
    </form>
    <div :class="'toast ' + (showToast ? 'toast-show' : 'toast-hidden')">
      {{ toastMessage }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apiURL: 'http://localhost:4000',
      campos: null,
      respostas: [
        {
          idCampo: null,
          resposta: null
        },
        {
          idCampo: null,
          resposta: null
        },
        {
          idCampo: null,
          resposta: null
        },
        {
          idCampo: null,
          resposta: null
        },
        {
          idCampo: null,
          resposta: null
        }
      ],
      showToast: false,
      toastMessage: ''
    }
  },

  async mounted() { 
    try {
      var apiCampos = await this.$axios.get(`${this.apiURL}/campos`);
      this.campos = apiCampos.data.campos;
      this.respostas[0].idCampo = this.campos[0].idHTML;
      this.respostas[1].idCampo = this.campos[1].idHTML;
      this.respostas[2].idCampo = this.campos[2].idHTML;
      this.respostas[3].idCampo = this.campos[3].idHTML;
      this.respostas[4].idCampo = this.campos[4].idHTML;
    } 
    catch (err) {
      console.log(err);
    }
  },

  methods: {
    async enviar() {
      console.log(this.respostas);
      try {
        var res = await this.$axios.post(`${this.apiURL}/enviar`, this.respostas);
        this.toastMessage = 'Formulário registrado com sucesso!'
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 3000);
      }
      catch (err) {
        console.log(err);
        this.toastMessage = 'Não foi possível registrar seu formulário'
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 3000);
      }
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100;200;300;400;500;600;700&family=Roboto:wght@100;300;400;500;700;900&display=swap');

  body {
    font-family: 'Roboto', sans-serif;
    height: 100%;
    background: linear-gradient(180deg, rgba(33,80,89,1) 0%, rgba(28,43,71,1) 45%, rgba(4,2,29,1) 100%);
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
</style>

<style lang="scss" scoped>

  .formulario {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    font-size: 1rem;
    row-gap: 2em;
    padding-top: 2em;
  }
  
  .grupo-campo {
    display: flex;
    flex-direction: column;
    row-gap: 0.5em;
    padding: 1em;
    background-color: #e6e6e6;
    font-size: 1.5rem;
    font-weight: 600;
    border-radius: 0.3em;
    color: #0d1542;
    min-width: 22vw;
  }

  .campo {
    font-size: 1.2rem;
    font-weight: 600;
    width: 22vw;
  }

  .grupo-botoes {
    display: flex;
    column-gap: 3em;
  }

  .botao {
    font-size: 1.5rem;
    font-weight: 600;
    padding-left: 1em;
    padding-right: 1em;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    border-radius: 0.5em;
    border: 2px solid white;
    cursor: pointer;
  }

  .botao-voltar {
    background-color: #0b3169;
    color: white;
    &:hover {
      background-color: #205db9;
    }
  }

  .botao-salvar {
    background-color: #024139;
    color: white;
    &:hover {
      background-color: #1c9c91;
    }
  }

  //Toast de aviso ao salvar campos
  .toast {
    visibility: hidden;
    min-width: 250px;
    margin-left: -125px; //Centraliza o toast
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    padding: 16px;
    position: fixed; //Posição fixa na tela
    left: 50%; //Centraliza horizontalmente
    bottom:30px;
  }

  .toast-show {
    visibility: visible;
    //Animação de aparecer e sumir lentamente.
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
  }

  //Sobe do fundo da tela e ganha opacidade maxima
  @-webkit-keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
  }
  @keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
  }
  //Desce ao fundo da tela e perda a opacidade
  @-webkit-keyframes fadeout {
    from {bottom: 30px; opacity: 1;}
    to {bottom: 0; opacity: 0;}
  }
  @keyframes fadeout {
    from {bottom: 30px; opacity: 1;}
    to {bottom: 0; opacity: 0;}
  }

</style>