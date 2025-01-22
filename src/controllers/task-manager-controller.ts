import { IncomingMessage, ServerResponse } from "http";
import { serviceListTasks } from "../services/list-tasks-service";
import { ContentType } from "../utils/content-type";
import { TaskDTOModel } from "../models/task-dto-model";
import { StatusCode } from "../utils/status-code";
import { serviceGetTaskById } from "../services/get-task-by-id-service";
import { getRequestBody } from "../services/utils/get-request-body";
import { serviceCreateTask } from "../services/create-new-task-service";
import { serviceUpdateTask } from "../services/update-task-by-id-service";
import { serviceRemoveTask } from "../services/remove-task-by-id-service";

const DEFAULT_CONTENT = { "Content-Type": ContentType.JSON }

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

export const listTasks = async (request: IncomingMessage, response: ServerResponse) => {

  const content: TaskDTOModel = await serviceListTasks()

  response.writeHead(content.statusCode, DEFAULT_CONTENT); // saves in response header
  response.write(content.body) // saves in response content
  response.end() // finishes
}

export const getTaskById = async (request: IncomingMessage, response: ServerResponse, id: number) => {

  const content: TaskDTOModel = await serviceGetTaskById(id)

  response.writeHead(content.statusCode, DEFAULT_CONTENT) // saves in response header
  response.write(content.body) // saves in response content
  response.end() // finishes
}

export const createTask = async (request: IncomingMessage, response: ServerResponse) => {
  const body: string = await getRequestBody(request, response)
  const content: TaskDTOModel = await serviceCreateTask(body)

  response.writeHead(content.statusCode, DEFAULT_CONTENT) // saves in response header
  response.write(content.body) // saves in response content
  response.end() // finishes
}

export const updateTaskById = async (request: IncomingMessage, response: ServerResponse, id: number) => {
  const body: string = await getRequestBody(request, response)
  const content: TaskDTOModel = await serviceUpdateTask(id, body)

  response.writeHead(content.statusCode, DEFAULT_CONTENT) // saves in response header
  response.write(content.body) // saves in response content
  response.end() // finishes
}

export const removeTaskById = async (request: IncomingMessage, response: ServerResponse, id: number) => {
  const content: TaskDTOModel = await serviceRemoveTask(id)

  response.writeHead(content.statusCode, DEFAULT_CONTENT) // saves in response header
  response.write(content.body) // saves in response content
  response.end() // finishes
}