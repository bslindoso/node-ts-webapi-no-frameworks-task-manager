import { IncomingMessage, ServerResponse } from "http";
import { serviceListTasks } from "../services/list-tasks-service";
import { ContentType } from "../utils/content-type";
import { TaskDTOModel } from "../models/task-dto-model";
import { StatusCode } from "../utils/status-code";
import { serviceGetListById } from "../services/get-task-by-id-service";

const DEFAULT_CONTENT = { "Content-Type": ContentType.JSON }
export const getTasksList = async (request: IncomingMessage, response: ServerResponse) => {
  const content: TaskDTOModel = await serviceListTasks()
  // salva no header do response
  response.writeHead(content.statusCode, DEFAULT_CONTENT);
  // salva no content do response
  response.write(JSON.stringify(content.body))
  // finaliza
  response.end()
}

export const getTaskById = async (request: IncomingMessage, response: ServerResponse, taskId: number) => {
  const content: TaskDTOModel = await serviceGetListById(taskId)
  response.end(`Busca tarefa por id`)
}

export const postTask = async (request: IncomingMessage, response: ServerResponse) => {
  response.end(`Cadastra tarefa`)
}

export const unknownRoute = async (request: IncomingMessage, response: ServerResponse) => {
  response.writeHead(StatusCode.NOT_FOUND, DEFAULT_CONTENT)
  response.write(JSON.stringify({
    message: "Unknown Route"
  }))
  response.end()
}

export const unprocessableEntity = async (request: IncomingMessage, response: ServerResponse) => {
  response.writeHead(StatusCode.UNPROCESSABLE_ENTITY, DEFAULT_CONTENT)
  response.write(JSON.stringify({
    message: "Task ID must be an integer"
  }))
  response.end()
}