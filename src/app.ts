import { IncomingMessage, ServerResponse } from "http"
import { HttpMethod } from "./utils/http-methods"
import { Routes } from "./routes/routes"
import { getTaskById, getTasksList, postTask, unknownRoute, unprocessableEntity } from "./controllers/task-manager-controller"


export const app = async (request: IncomingMessage, response: ServerResponse): Promise<void> => {

  // Divide a URL em partes usando '/' como separador e pega as partes necessárias
  // Exemplo: /tasks/123 -> ['', 'tasks', '123']
  const partsUrl = request.url?.split('/') ?? ["", ""]

  // Obtém a rota base da URL (ex: /tasks)
  const baseurl = `/${partsUrl[1]}`

  // Obtém o ID da URL se existir (ex: 123), senão retorna null
  const taskId: number | null = (partsUrl.length > 2) && partsUrl[2] !== ""
    ? Number(partsUrl[2])
    : null

  console.log(`[${request.method}] Rota "${baseurl}" => ID "${taskId}"`)

  // Se o que vier após a '/' não for um número (ID)
  if (Number.isNaN(Number(taskId))) {
    await unprocessableEntity(request, response)
  }
  // GET /tasks
  else if (request.method === HttpMethod.GET && baseurl === Routes.LIST_TASKS && taskId === null) {
    await getTasksList(request, response)
  }
  // GET /tasks/:id
  else if (request.method === HttpMethod.GET && baseurl === Routes.LIST_TASKS && taskId !== null) {
    await getTaskById(request, response, taskId)
  }
  // POST /tasks
  else if (request.method === HttpMethod.POST && baseurl === Routes.LIST_TASKS && taskId === null) {
    await postTask(request, response)
  } else {
    await unknownRoute(request, response)
  }
}