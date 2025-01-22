import { IncomingMessage, ServerResponse } from "http"

export const getRequestBody = async (request: IncomingMessage, response: ServerResponse): Promise<string> => {

  let body = ''

  for await (const chunk of request) {
    body += chunk
  }

  return body
}