# Moovy

Este servidor faz parte de um desafio fullstack cujo objetivo é salvar filmes na biblioteca e poder adicionar reviews de áudio nos filmes salvos. O servidor é responsável por fazer o redirecionamento da pesquisa, gerenciar os filmes salvos junto com as reviews gravadas.

## Executando o projeto

Para executar o projeto, você precisará ter o NodeJS instalado. Primeiramente, copie o conteúdo do arquivo .env.sample para um novo arquivo .env na pasta raíz, substituindo os valores de exemplo das variáveis pelos valores correspondentes.

Após isso, execute as migrations necessárias no seu banco de dados, rodando o comando:

```sh
yarn typeorm migration:run
```

Logo após, instale as dependências do projeto e depois o execute, com os comandos:

```sh
yarn
```

```sh
yarn start:dev
```
