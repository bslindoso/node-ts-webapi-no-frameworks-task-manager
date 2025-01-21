# API de Cadastro
- Não está gerando `id` nem `created`
- Não está gerando o `status: todo` 
- Falta recusar quando receber parâmetros a mais, como:
```json
{
    "title": "Titulo",
    "description" : "Descricao",
    "test": 1,
    "awsda": "fs"
}
```
