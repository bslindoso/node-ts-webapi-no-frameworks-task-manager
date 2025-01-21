import { IncomingMessage, ServerResponse } from "http";
import { isTaskModel, TaskModel } from "../models/task-model";
import { StatusCode } from "../utils/status-code"
import { ContentType } from "../utils/content-type";
import { saveTaskRepository } from "../repos/tasks-repository";
import { TaskDTOModel } from "../models/task-dto-model";

const DEFAULT_CONTENT = { "Content-Type": ContentType.JSON }

export const serviceCreateTask = async (request: IncomingMessage, response: ServerResponse, body: string) => {

  let parsedBody: TaskModel

  try {
    parsedBody = JSON.parse(body);
  }
  catch (error) {
    response.writeHead(StatusCode.BAD_REQUEST, DEFAULT_CONTENT)
    response.write(JSON.stringify({ message: "Invalid JSON format" }))
    return // EVALUATE THIS
  }

  // Checks if the object is TaskModel type
  // console.log(`isTaskModel: ${isTaskModel(parsedBody)} - ${JSON.stringify(parsedBody)}`)
  if (!isTaskModel(parsedBody)) {
    response.writeHead(StatusCode.UNPROCESSABLE_ENTITY, DEFAULT_CONTENT)
    response.write(JSON.stringify({
      message: "Missing property 'title' and 'description'"
    }))
    return // EVALUATE THIS
  }

  const data = await saveTaskRepository(parsedBody)

  const responseFormat: TaskDTOModel = {
    statusCode: 0,
    body: JSON.stringify(data)
  }

  return responseFormat

}