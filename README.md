# Task Manager API

[🇧🇷 Português](#portuguese-section)

<details open id="english-section">
<summary style='color: lightgreen'>🇺🇸 English</summary>

## Proposal
The **Task Manager API** is designed to facilitate task management in a dynamic and collaborative environment. It enables users to create, retrieve, update, delete tasks, and add comments or updates to existing tasks through a simple REST API. The primary goal is to provide a solid foundation for practicing API development using pure Node.js and TypeScript, while exploring concepts such as data manipulation, validation, and local persistence.

## Technologies Used
- **Node.js**: Platform used to create the server and manage HTTP requests using native modules.
- **TypeScript**: Tool to add static typing and improve code quality with enhanced development safety.
- **Native HTTP Modules**: Exclusive use of Node.js built-in modules to handle routing, requests, and responses.
- **File Persistence**: Data is stored in a JSON file (`database.json`), eliminating the need for an external database to simplify the project.

## Functionalities
### Task Management
1. **Create Tasks**: Allows the addition of new tasks, including title, description, and initial status.
2. **List Tasks**: Retrieves all registered tasks or a specific one by ID.
3. **Update Tasks**: Modifies properties such as title, description, or task status.
4. **Delete Tasks**: Removes specific tasks by ID.

### Comments and Updates
1. **Add Comments**: Allows users to post updates or observations to existing tasks.

### Validations and Rules
- **status** fields have specific rules to prevent inconsistencies.
- Required fields are validated before any operation, ensuring data integrity.

#### Allowed Statuses
- **todo**: Not started yet.
- **doing**: In progress.
- **paused**: Paused.
- **done**: Completed.
- **canceled**: Canceled.

## Project Objectives
This project focuses on learning and practicing:
- Handling HTTP requests without external frameworks.
- Managing data in JSON files.
- Data validation and structuring REST APIs.
- Using TypeScript to improve scalability and code safety.

### Endpoints
#### `GET /tasks`
Returns all tasks stored in the `database.json` file.

#### `GET /tasks/:id`
Returns the task stored with the specified `id` in the `database.json` file.

#### `POST /tasks`
Adds a new task. The `request body` can contain something like:

```json
{
  "title": "My new task",
  "description": "Develop an innovative mechanism that allows penguins to teleport while performing ice dance choreographies. The system must include colorful lights and sound effects inspired by 1980s discos."
}
```

##### The `database.json` file should be updated to:
```json
{
  "id": 1,
  "created": "2025-01-19T10:59:12.982Z",
  "title": "My new task",
  "description": "Develop an innovative mechanism that allows penguins to teleport while performing ice dance choreographies. The system must include colorful lights and sound effects inspired by 1980s discos.",
  "status": "todo"
}
```
> NOTE: Send the data in the `body` of the request, not via query string parameters.

#### `PUT /tasks/:id`
Updates an existing task by `id`. You can change, for example, the title, description, or status.

##### Updating values (payload)
```json
{
  "title": "My 'almost' impossible task",  
  "status": "doing"
}
```

##### Updating only the status (payload)
```json
{
  "status": "done"
}
```

##### Data validations
- `title`: (Optional) String with a limit of 50 characters.
- `description`: (Optional) String with no limits.
- `status`: (Optional) Must be one of the allowed values (see above).

#### `DELETE /tasks/:id`
Removes a task by `id`.

#### `POST /followups/:id`
Posts a comment or update from a user. The `request body` can contain something like:

```json
{
  "user": "beatriz",
  "post": "😽 Let's get started!"
}
```

##### The `database.json` file should be updated to:

```json
{
  "id": 1,
  "created": "2025-01-19T10:59:12.982Z",
  "title": "My 'almost' impossible task",
  "description": "Develop an innovative mechanism that allows penguins to teleport while performing ice dance choreographies. The system must include colorful lights and sound effects inspired by 1980s discos.",
  "followups": [{
    "user": "bruno",
    "posted" : "2025-01-19T11:36:39.982Z",
    "post": "Wow, it's impossible to complete this task this year!"
  },
  {
    "user": "beatriz",
    "posted" : "2025-01-19T12:02:31.982Z",
    "post": "😽 Let's get started!"
  }],
  "status": "doing"
}
```

##### Data validations
- `user`: (Required) Defines which user is posting.
- `post`: (Required) Comment or descriptive update.

[⬆️ Back to top](#task-manager-api)
---
</details>

<details id="portuguese-section">
<summary style='color: lightgreen'>🇧🇷 Português</summary>

## Proposta
A **Task Manager API** foi projetada para facilitar o gerenciamento de tarefas em um ambiente dinâmico e colaborativo. Ela permite criar, listar, atualizar, excluir tarefas e adicionar comentários ou atualizações associadas a tarefas existentes por meio de uma API REST simples. O objetivo principal é oferecer uma base sólida para a prática e desenvolvimento de APIs utilizando Node.js puro e TypeScript, enquanto explora conceitos como manipulação de dados, validação e persistência local.

## Tecnologias Utilizadas
- **Node.js**: Plataforma utilizada para criar o servidor e gerenciar requisições HTTP utilizando módulos nativos.
- **TypeScript**: Ferramenta para adicionar tipagem estática e melhorar a qualidade do código, com mais segurança durante o desenvolvimento.
- **Módulos HTTP Nativos**: Uso exclusivo dos módulos padrão do Node.js para gerenciar rotas, solicitações e respostas.
- **Persistência em Arquivo**: Os dados são armazenados em um arquivo JSON (`database.json`), dispensando a necessidade de um banco de dados externo para simplificar o projeto.

## Funcionalidades
### Gerenciamento de Tarefas
1. **Criar Tarefas**: Permite a adição de novas tarefas, incluindo título, descrição e status inicial.
2. **Listar Tarefas**: Recupera todas as tarefas cadastradas ou uma específica por ID.
3. **Atualizar Tarefas**: Modifica propriedades como título, descrição ou status da tarefa.
4. **Excluir Tarefas**: Remove tarefas específicas por ID.

### Comentários e Atualizações
1. **Adicionar Comentários**: Possibilita que usuários publiquem atualizações ou observações em tarefas existentes.

### Validações e Regras
- **status** possuem regras específicas para evitar inconsistências.
- Campos obrigatórios são validados antes de qualquer operação, garantindo a integridade dos dados.

#### Status Permitidos
- **todo**: Ainda não iniciado.
- **doing**: Em progresso.
- **paused**: Pausado.
- **done**: Finalizado.
- **canceled**: Cancelado.

## Objetivo do Projeto
Este projeto foi desenvolvido com foco em aprendizado e prática de:
- Manipulação de requisições HTTP sem frameworks externos.
- Gerenciamento de dados em arquivos JSON.
- Validação de dados e estruturação de APIs REST.
- Uso de TypeScript para melhorar a escalabilidade e segurança do código.

### Endpoints
#### `GET /tasks`
Retorna todas as tarefas armazenadas no arquivo `database.json`.

#### `GET /tasks/:id`
Retorna a tarefa armazenada com o `id` especificado no arquivo `database.json`.

#### `POST /tasks`
Adiciona uma nova tarefa. O `corpo da requisição` pode conter algo como:

```json
{
  "title": "Minha nova tarefa",
  "description": "Desenvolver um mecanismo inovador que permita que pinguins realizem teletransporte enquanto executam coreografias de dança no gelo. O sistema deve incluir luzes coloridas e efeitos sonoros inspirados em discotecas dos anos 80."
}
```

##### O arquivo `database.json` deve ser atualizado para:
```json
{
  "id": 1,
  "created": "2025-01-19T10:59:12.982Z",
  "title": "Minha nova tarefa",
  "description": "Desenvolver um mecanismo inovador que permita que pinguins realizem teletransporte enquanto executam coreografias de dança no gelo. O sistema deve incluir luzes coloridas e efeitos sonoros inspirados em discotecas dos anos 80.",
  "status": "todo"
}
```
> OBS: Enviar os dados pelo `body` da requisição, e não pelos parâmetros queryString.

#### `PUT /tasks/:id`
Atualiza uma tarefa existente pelo `id`. Você pode alterar, por exemplo, o título, descrição ou o status.

##### Atualizando valores (payload)
```json
{
  "title": "Minha nova tarefa 'quase' impossível",
  "status": "doing"
}
```

##### Atualizando somente o status (payload)
```json
{
  "status": "done"
}
```

##### Validações de dados
- `title`: (Opcional) String com limite de 50 caracteres.
- `description`: (Opcional) String sem limites.
- `status`: (Opcional) Deve ser um dos valores permitidos (veja acima).

#### `DELETE /tasks/:id`
Remove uma tarefa pelo `id`.

#### `POST /followups/:id`
Posta um comentário ou atualização de um usuário. O `corpo da requisição` pode conter algo como:

```json
{
  "user": "beatriz",
  "post": "😽 vamos começar!"
}
```

##### O arquivo `database.json` deve ser atualizado para:

```json
{
  "id": 1,
  "created": "2025-01-19T10:59:12.982Z",
  "title": "Minha nova tarefa 'quase' impossível",
  "description": "Desenvolver um mecanismo inovador que permita que pinguins realizem teletransporte enquanto executam coreografias de dança no gelo. O sistema deve incluir luzes coloridas e efeitos sonoros inspirados em discotecas dos anos 80.",
  "followups": [{
    "user": "bruno",
    "posted" : "2025-01-19T11:36:39.982Z",
    "post": "Bah, impossível realizar esta tarefa ainda este ano!"
  },
  {
    "user": "beatriz",
    "posted" : "2025-01-19T12:02:31.982Z",
    "post": "😽 vamos começar!"
  }],
  "status": "doing"
}
```

##### Validações de dados
- `user`: (Obrigatório) Define qual usuário está postando.
- `post`: (Obrigatório) Comentário ou atualização descritiva.

[⬆️ Voltar ao topo](#task-manager-api)
---
</details>

