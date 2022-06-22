<template>
    <div>
        <table v-if="!criado" width="100%">
            <thead>
                <tr>
                    <th>Label do campo</th>
                    <th>Id do campo</th>
                    <th>Tipo de campo</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="n in data" :key="n">
                    <td><input v-model="n.label" placeholder="Nome a ser apresentado"></td>
                    <td><input v-model="n.id" placeholder="ID do campo"></td>
                    <td>
                        <select v-model="n.tipoCampo">
                            <option disabled value="">Tipo de campo</option>
                            <option>Texto simples</option>
                            <option>Texto grande</option>
                            <option>Combo</option>
                        </select>
                    </td>
                    <div v-show="n.tipoCampo === 'Combo'" class="combo">
                        <td><input v-model="n.combo.opcao1" placeholder="Opção 1"></td>
                        <td><input v-model="n.combo.opcao2" placeholder="Opção 2"></td>
                        <td><input v-model="n.combo.opcao3" placeholder="Opção 3"></td>
                    </div>
                </tr>
            </tbody>
        </table>
        <button v-if="!criado" @click="criado = true">Criar tabela</button>
        <div class="registrar">
            <table class="form" v-if="criado" width="100%">
                <thead>
                    <tr>
                        <th>Campo</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tr v-for="n in data" :key="n">
                    <td>{{n.label}}</td>
                    <td>
                        <input v-if="n.tipoCampo === 'Texto grande'" v-model="n.value" :placeholder="n.label" maxlength="100">
                        <input v-if="n.tipoCampo === 'Texto simples'" v-model="n.value" :placeholder="n.label" maxlength="30">
                        <select v-if="n.tipoCampo === 'Combo'" v-model="n.value">
                            <option disabled value="">{{n.label}}</option>
                            <option>{{n.combo.opcao1}}</option>
                            <option>{{n.combo.opcao2}}</option>
                            <option>{{n.combo.opcao3}}</option>
                        </select>
                    </td>
                </tr>
            </table>
            <button v-if="criado" @click="inserirRegistro">Incluir registro</button>
        </div>
        <div class="registros">
            <table v-if="criado" width="100%">
                <thead>
                    <tr>
                        <th v-for="n in data" :key="n">{{n.label}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="registro in registros" :key="registro">
                        <td v-for="n in registro" :key="n">{{n}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    name: "CriaTabelaVue",
    data() {
        return {
            criado: false,
            data: {
                1: {
                    label: '',
                    id: '',
                    tipoCampo: '',
                    combo: 
                    {
                        opcao1: '',
                        opcao2: '',
                        opcao3: ''
                    },
                    value: ''
                },
                2: {
                    label: '',
                    id: '',
                    tipoCampo: '',
                    combo: 
                    {
                        opcao1: '',
                        opcao2: '',
                        opcao3: ''
                    },
                    value: ''
                },
                3: {
                    label: '',
                    id: '',
                    tipoCampo: '',
                    combo: 
                    {
                        opcao1: '',
                        opcao2: '',
                        opcao3: ''
                    },
                    value: ''
                },
                4: {
                    label: '',
                    id: '',
                    tipoCampo: '',
                    combo: 
                    {
                        opcao1: '',
                        opcao2: '',
                        opcao3: ''
                    },
                    value: ''
                },
                5: {
                    label: '',
                    id: '',
                    tipoCampo: '',
                    combo: 
                    {
                        opcao1: '',
                        opcao2: '',
                        opcao3: ''
                    },
                    value: ''
                }
            },
            number: 1,
            registros: []
        }
    },
    methods: {
       
        inserirRegistro () {
            var dados = []
            dados = { 1: this.data[1].value, 2: this.data[2].value, 3: this.data[3].value, 4: this.data[4].value, 5: this.data[5].value}
            this.registros[this.number] = dados;
            this.data[1].value = ''
            this.data[2].value = ''
            this.data[3].value = ''
            this.data[4].value = ''
            this.data[5].value = ''
            this.number = this.number + 1
        }
    }
}
</script>
<style scoped>
table {
    font-weight: bold;
    border-collapse: collapse;
    color: #666666;
}
.form {
    border-color:#666666;
}
tr, th, td  {
    padding: 20px;
}
thead {
    background-color: rgb(16, 41, 56);
    color: white;
}
input, select {
    padding: 15px;
    min-width: 200px;
}
button {
    background-color: rgb(16, 41, 56);
    color: white;
    font-weight: bold;
    border: none;
    float: right;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    margin-bottom: 25px;
}
</style>