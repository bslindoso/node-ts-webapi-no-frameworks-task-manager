# Task Manager API

## English

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
  "id": "1",
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
- `title`: (Required) String with a limit of 50 characters.
- `description`: Optional string.
- `status`: Must be one of the allowed values (see below).

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
  "id": "1",
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

#### Allowed statuses
- `todo`: Not started yet
- `doing`: Started
- `paused`: Paused
- `done`: Completed
- `canceled`: Canceled

#### Automatic Timestamps:
`Created` and `posted` are generated automatically.

---

## Português

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
  "id": "1",
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
- `title`: (Obrigatório) String com limite de 50 caracteres.
- `description`: String opcional.
- `status`: Deve ser um dos valores permitidos (veja abaixo).

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
  "id": "1",
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

#### Status permitidos
- `todo`: Ainda não iniciado
- `doing`: Iniciado
- `paused`: Pausado
- `done`: Finalizado
- `canceled`: Cancelado

#### Timestamps automáticos:
`Created` e `posted` são gerados automaticamente.