# Recursos sugeridos para a API
## Endpoints
### `GET /tasks`
Retorna todas as tarefas armazenadas no arquivo database.json.

### `GET /tasks/:id`
Retorna a tarefas armazenada com o id especificado no arquivo database.json.

### `POST /tasks`
Adiciona uma nova tarefa. O `corpo da requisição` pode conter algo como:

```json
{
  "title": "Minha nova tarefa",
  "description": "Desenvolver um mecanismo inovador que permita que pinguins realizem teletransporte enquanto executam coreografias de dança no gelo. O sistema deve incluir luzes coloridas e efeitos sonoros inspirados em discotecas dos anos 80."
}
```

#### O arquivo database.json deve ser atualizado para:
```json
{
  "id": "1",
  "created": "2025-01-19T10:59:12.982Z",
  "title": "Minha nova tarefa",
  "description": "Desenvolver um mecanismo inovador que permita que pinguins realizem teletransporte enquanto executam coreografias de dança no gelo. O sistema deve incluir luzes coloridas e efeitos sonoros inspirados em discotecas dos anos 80.",
  "status": "todo"
}
```
> OBS: Enviar os dados pelo `body`da requisição, e não pelos parâmetros queryString.

### `PUT /tasks/:id`
Atualiza uma tarefa existente pelo id. Você pode alterar, por exemplo, o título, description ou o status.

#### Atualizando valores (payload)
```json
{
  "title": "Minha nova tarefa 'quase' impossível",
  "status": "doing"
}
```

#### Atualizando somente o status (payload)
```json
{
  "status": "done"
}
```
#### Validações de dados
- `title`: (Obrigatório) String com limite de 50 caracteres.
- `description`: String opcional.
- `status`: Deve ser um dos valores permitidos (veja abaixo).

### `DELETE /tasks/:id`
Remove uma tarefa pelo id.

### `POST /folowups/:id`
Posta um acompanhamento de um user. O `corpo da requisição` pode conter algo como:

```json
{
  "user": "beatriz",
  "post": "😽 vamos começar!"
}
```

#### O arquivo database.json deve ser atualizado para:

```json
{
  "id": "1",
  "created": "2025-01-19T10:59:12.982Z",
  "title": "Minha nova tarefa 'quase' impossível",
  "description": "Desenvolver um mecanismo inovador que permita que pinguins realizem teletransporte enquanto executam coreografias de dança no gelo. O sistema deve incluir luzes coloridas e efeitos sonoros inspirados em discotecas dos anos 80.",
  "followups": [{
    "postedDateTime" : "2025-01-19T11:36:39.982Z",
    "user": "bruno",
    "post": "Bah, impossível realizar esta tarefa ainda este ano!"
  },
  {
    "postedDateTime" : "2025-01-19T12:02:31.982Z",
    "user": "beatriz",
    "post": "😽 vamos começar!"
  }],
  "status": "doing"
}
```

#### Validações de dados
- `user`: (Obrigatório) Define qual usuário está postando.
- `post`: (Obrigatório) Comentário ou atualização descritiva.

### Status permitidos
- `todo`: Ainda não iniciado
- `doing`: Iniciado
- `paused`: Pausado
- `done`: Finalizado
- `canceled`: Cancelado

### Timestamps automáticos:
  Created e postedDateTime são gerados automaticamente.