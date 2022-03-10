<template>
  <div class="base">
    <form class="formulario" @submit.prevent="salvarCampos">
      <div v-for="i in 5" :key="i" class="campo">
        <div class="campo-titulo">{{ i }}° CAMPO</div>
        <div class="campo-dados">
          <input type="text" :name="'idCampo'+i" placeholder="ID do campo" maxlength="20" v-model="campos[i-1].idCampo">
          <input type="text" :name="'labelCampo'+i" placeholder="Label do campo" v-model="campos[i-1].labelCampo">
          <select :name="'tipoCampo'+i" v-model="campos[i-1].tipoCampo">
            <option value="null" selected disabled>Tipo do campo</option>
            <option value="simples">Texto simples (30 caracteres)</option>
            <option value="grande">Texto longo (100 caracteres)</option>
            <option value="combo">Caixa de seleção (3 opções)</option>
          </select>
        </div>
        <div v-if="campos[i-1].tipoCampo=='combo'" class="combo-opcoes">
          <input type="text" placeholder="1ª opção" v-model="campos[i-1].opcoes.opcao1">
          <input type="text" placeholder="2ª opção" v-model="campos[i-1].opcoes.opcao2">
          <input type="text" placeholder="3ª opção" v-model="campos[i-1].opcoes.opcao3">
        </div>
      </div>
      <div class="grupo-botoes">
        <button type="submit" class="botao botao-salvar">Salvar</button>
        <NuxtLink to="/preencher" class="link"><button type="button" class="botao botao-preencher">Preencher formulário</button></NuxtLink>
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
      campos: [
        {
          idCampo: null,
          labelCampo: null,
          tipoCampo: null,
          opcoes: {
            opcao1: null,
            opcao2: null,
            opcao3: null
          }
        },
        {
          idCampo: null,
          labelCampo: null,
          tipoCampo: null,
          opcoes: {
            opcao1: null,
            opcao2: null,
            opcao3: null
          }
        },
        {
          idCampo: null,
          labelCampo: null,
          tipoCampo: null,
          opcoes: {
            opcao1: null,
            opcao2: null,
            opcao3: null
          }
        },
        {
          idCampo: null,
          labelCampo: null,
          tipoCampo: null,
          opcoes: {
            opcao1: null,
            opcao2: null,
            opcao3: null
          }
        },
        {
          idCampo: null,
          labelCampo: null,
          tipoCampo: null,
          opcoes: {
            opcao1: null,
            opcao2: null,
            opcao3: null
          }
        }
      ],
      showToast: false,
      toastMessage: ''
    }
  },

  methods: {
    async salvarCampos() {
      try {
        const res = await this.$axios.post(`${this.apiURL}/campos`, this.campos);
        if (res.data.status == 'success') {
          this.toastMessage = 'Campos salvos com sucesso!'
          this.showToast = true;
          setTimeout(() => {
            this.showToast = false;
          }, 3000);
          return;
        }
      } 
      catch (err) {
        console.log(err);
      }
      this.toastMessage = 'Não foi possível salvar os campos.'
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    }
  }
}
</script>

<style lang="scss">
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
    row-gap: 2em;
    padding-top: 2em;
  }

  .campo {
    display: flex;
    flex-direction: column;
    row-gap: 0.5em;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    background-color: #e6e6e6;
    font-size: 2rem;
    border-radius: 0.3em;
    color: #0d1542;

    .campo-titulo {
      text-align: center;
      font-weight: 600;
    }

    .campo-dados {
      padding-left: 1em;
      padding-right: 1em;
      display: flex;
      column-gap: 1em;
      justify-content: space-between;

      input, select{
        font-size: 1.3rem;
        outline: none;
      }
    }
  }

  .combo-opcoes {
    display: flex;
    justify-content: center;
    column-gap: 2em;

    input {
      font-size: 1.2rem;
    }
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

  .botao-salvar {
    background-color: #0b3169;
    color: white;
    &:hover {
      background-color: #205db9;
    }
  }

  .botao-preencher {
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