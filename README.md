# API para o teste full stack

## Não tive tempo hábil para criar o front, então decidi enviar apenas o backend

# Backend feito utilizando:

# Node com:
## typescript
## express - Para o server
## typeOrm - Para o banco de dados
## tsrynger - Para injeções de dependência
## PostgreSQL
## Docker

# Caso tivesse tempo hábil:

## Documentação com Swagger
## Front: Vuejs e Nuxtjs (igual ao primeiro teste)

# Para testar basta rodar na raiz do projeto:

# yarn install

# docker-compose up -d

# yarn typeorm migration:run
##  Cria a tabela de Fields no banco de dados
##  O acesso ao banco está no arquivo ormconfig.json

# Tive alguns problemas para manter o server rodando pelo docker quando há alguma falha de requisição para a API, caso o servidor caia:
## Na shell do docker:
## npm run dev

atalho para teste:

  {
		"fieldId": "name",
		"label": "Nome",
		"type": "combo",
		"position": 1,
		"inputValue": {
				"firstOption": {
				"description": "Opção 01",
				"value": "op1"
			},
				"secondOption": {
				"description": "Opção 02",
				"value": "op2"
			},
				"thirdOption": {
				"description": "Opção 03",
				"value": "op3"
			}
		}
	}