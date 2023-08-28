# Configuração do ambiente

## Servidor da base de dados
**Requisitos**
- NPM 9.8
- Docker 20.10

**Preparação do ambiente (instalação)**
*No console/prompt/terminal do seu sistema, navegue até o diretório raiz do projeto e insira os seguintes comandos:*

Baixar imagem do MySQL
```
docker pull mysql:8.1
```

Imagem do MySQL para o projeto
```
docker build -t icolabora-mysql81-image -f api/db/Dockerfile .
```

Subir o container com o servidor MySQL
```
docker run -d -p 3306:3306 -v docker_volumes:/var/lib/mysql --rm --name icolabora-desafio2-mysql icolabora-mysql81-image
```

Para iniciar o *servidor* a API da aplicação, navegue até o diretório `./api` e insira o comando
```
npm i
```
```
npm run start
```

No navegador, acesse o endereço para criar as tabelas na nase de dados
```
http://localhost:3000/install/db-tables
```

Para instalar a *interface web*, navegue até o diretório `./intarface` e insira o comando
```
npm i
```
```
npm run dev
```


**Inicialização do ambiente para validação / uso**
Para iniciar o *servidor*, navegue até o diretório `./api` e insira o comando

```
npm run start
```

Para iniciar a *interface web*, navegue até o diretório `./intarface` e insira o comando

```
npm run dev
```
