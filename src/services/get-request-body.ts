import { IncomingMessage, ServerResponse } from "http"
import { isTaskModel, TaskModel } from "../models/task-model"
import { StatusCode } from "../utils/status-code"
import { ContentType } from "../utils/content-type"

export const getRequestBody = async (request: IncomingMessage, response: ServerResponse): Promise<string> => {

  let body = ''

  for await (const chunk of request) {
    body += chunk
  }

  return body
}