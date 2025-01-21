import { IncomingMessage, ServerResponse } from "http"
import { HttpMethod } from "./utils/http-methods"
import { Routes } from "./routes/routes"
import { getTaskById, getTasksList, postTask, unknownRoute, unprocessableEntity } from "./controllers/task-manager-controller"


export const app = async (request: IncomingMessage, response: ServerResponse): Promise<void> => {

  // Split URL into parts using '/' as separator and get the necessary parts
  // Example: /tasks/123 -> ['', 'tasks', '123']
  const partsUrl = request.url?.split('/') ?? ["", ""]

  // Get the base route from URL (ex: /tasks)
  const baseurl = `/${partsUrl[1]}`

  // Get ID from URL if exists (ex: 123), otherwise return null
  const taskId: number | null = (partsUrl.length > 2) && partsUrl[2] !== ""
    ? Number(partsUrl[2])
    : null

  // console.log(`[${request.method}] Route "${baseurl}" => ID "${taskId}"`)

  // If what comes after '/' is not a number (ID)
  if (Number.isNaN(Number(taskId))) {
    await unprocessableEntity(request, response)
  }
  // GET /tasks
  else if (request.method === HttpMethod.GET && baseurl === Routes.LIST_TASKS && taskId === null) {
    await getTasksList(request, response)
  }
  // GET /tasks/:id
  else if (request.method === HttpMethod.GET && baseurl === Routes.GET_TASK && taskId !== null) {
    await getTaskById(request, response, taskId)
  }
  // POST /tasks
  else if (request.method === HttpMethod.POST && baseurl === Routes.CREATE_TASK && taskId === null) {
    await postTask(request, response)
  } else {
    await unknownRoute(request, response)
  }
}