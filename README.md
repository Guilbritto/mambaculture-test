# Mamba cuture teste
Repositório contento teste técnico, onde o objetivo é criar um CRUD para campanhas de marketing.

OBS: Estarei levando em consideração que estaremos utilizando `yarn`, caso não esteja não tem problema, só rodar os comandos correspondentes do seu gerenciador de pacotes.

Para rodar o projeto foi usado o node na versão `20.17`.
## Libs

* Nextjs
* Shadcn
* Tailwind
* Zod
* React-form
* Date-fns

## Como rodar

Para rodar o projeto, primeiro instale as dependencias:

```js
yarn 
```

O Arquivo `server.json` já está criado, mas, caso queira o valor incial dele, segue abaixo.
```json
{
  "campain": [
   {
      "id": "7472",
      "name": "Campanha 1 - Expirada",
      "startDate": "2024-09-20T03:00:00.000Z",
      "endDate": "2024-09-22T03:00:00.000Z",
      "status": "active",
      "createAt": "2024-09-20T22:28:31-03:00"
    },
    {
      "id": "6681",
      "name": "Campanha 2",
      "startDate": "2024-10-25T03:00:00.000Z",
      "endDate": "2024-10-28T03:00:00.000Z",
      "status": "active",
      "createAt": "2024-09-24T22:28:43-03:00"
    }
  ]
}
```

Agora que tudo está preparado, abra uma aba rode o servidor `yarn server` e rode `yarn dev` em outra aba, dessa forma o sistema está pronto para rodar.

## Teste
Para testar basta rodar `yarn test`.

## Estrutura do projeto
A estrutura utilizada está abaixo:
```
└── src
|    ├── app -> Aplicação/paginas
|    ├── components -> todos componentes da aplicação
|    ├── context -> contextos que são usados na aplicação ( estados que são compartilhados )
|    ├── hooks -> hooks da aplicação
|    ├── lib -> funções utilitárias e ou wrappers
|    ├── types -> typos das requisições
└── arquivos de configuração
```

Algumas explicações sobre decisões tomadas:

1. Optei por utilizar um lib de componentes `shadcn` pois é uma lib completa e já conta com acessibilidade proveniente do `@radix`
2. Optei por utilizar `tailwind` pois já está na instalação do `next`, mas poderia utilizar um `styled-components` tambem.
3. Optei por utilizar o `json-server` por ser mais rápido e simples de configurar, e ele provem tudo que preciso para simular uma requisição **http**.
4. Testei as funcionalidades dos componentes, e os que eram apenas visual foi feito somente o teste de snapshot.