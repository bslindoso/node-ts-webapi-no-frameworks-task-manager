import { IncomingMessage, ServerResponse } from "http"
import { HttpMethod } from "./utils/http-methods"
import { Routes } from "./routes/routes"
import { getTaskById, listTasks, createTask, unknownRoute, unprocessableEntity, updateTaskById, removeTaskById, createFollowUp } from "./controllers/task-manager-controller"


export const app = async (request: IncomingMessage, response: ServerResponse): Promise<void> => {

  // Split URL into parts using '/' as separator and get the necessary parts
  // Example: /tasks/123 -> ['', 'tasks', '123']
  const partsUrl = request.url?.split('/') ?? ["", ""]

  // Get the base route from URL (ex: /tasks)
  const baseurl = `/${partsUrl[1]}`

  // Get ID from URL if exists (ex: 123), otherwise return null
  const id: number | null = (partsUrl.length > 2) && partsUrl[2] !== ""
    ? Number(partsUrl[2])
    : null

  // If what comes after '/' is not a number (ID)
  if (Number.isNaN(Number(id))) {
    await unprocessableEntity(request, response)
  }
  // GET /tasks
  else if (request.method === HttpMethod.GET && baseurl === Routes.LIST_TASKS && !id) {
    await listTasks(request, response)
  }
  // GET /tasks/:id
  else if (request.method === HttpMethod.GET && baseurl === Routes.GET_TASK && id) {
    await getTaskById(request, response, id)
  }
  // POST /tasks
  else if (request.method === HttpMethod.POST && baseurl === Routes.CREATE_TASK && !id) {
    await createTask(request, response)
  }
  // PUT /tasks/:id
  else if (request.method === HttpMethod.PUT && baseurl === Routes.UPDATE_TASK && id) {
    await updateTaskById(request, response, id)
  }
  // DELETE /tasks/:id
  else if (request.method === HttpMethod.DELETE && baseurl === Routes.DELETE_TASK && id) {
    await removeTaskById(request, response, id)
  }
  // POST /followups/:id
  else if (request.method === HttpMethod.POST && baseurl === Routes.CREATE_FOLLOWUP && id) {
    await createFollowUp(request, response, id)
  }

  else {
    await unknownRoute(request, response)
  }
}