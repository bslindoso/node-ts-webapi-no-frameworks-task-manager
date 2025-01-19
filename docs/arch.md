## Recursos sugeridos para a API
### Endpoints:
`GET /tasks`
Retorna todas as tarefas armazenadas no arquivo tasks.json.

`POST /tasks`
Adiciona uma nova tarefa. O corpo da requisição pode conter algo como:

```json
{
  "title": "Minha nova tarefa",
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
  }]
  "status": "doing"
}
```

`PUT /tasks/:id`
Atualiza uma tarefa existente pelo id. Você pode alterar, por exemplo, o título ou o status (completed).

`DELETE /tasks/:id`
Remove uma tarefa pelo id.