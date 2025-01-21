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