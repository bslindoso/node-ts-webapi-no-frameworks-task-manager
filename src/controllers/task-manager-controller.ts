import { IncomingMessage, ServerResponse } from "http";
import { StatusCode } from "../utils/status-code";


export const getTasksList = async (request: IncomingMessage, response: ServerResponse) => {
  response.end(`Lista tarefas`)
}

export const getTaskById = async (request: IncomingMessage, response: ServerResponse) => {
  response.end(`Busca tarefa por id`)
}

export const postTask = async (request: IncomingMessage, response: ServerResponse) => {
  response.end(`Cadastra tarefa`)
}

export const unknownRoute = async (request: IncomingMessage, response: ServerResponse) => {
  response.statusCode = StatusCode.BAD_REQUEST
  response.end("Erro")
}