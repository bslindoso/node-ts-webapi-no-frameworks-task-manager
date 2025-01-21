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
    return {
      statusCode: StatusCode.UNPROCESSABLE_ENTITY,
      body: JSON.stringify({ message: "Invalid JSON format" })
    }
  }

  // Checks if the object is TaskModel type
  if (!isTaskModel(parsedBody)) {
    return {
      statusCode: StatusCode.UNPROCESSABLE_ENTITY,
      body: JSON.stringify({ message: "Missing property 'title' and/or 'description'" })
    }
  }

  const data: TaskDTOModel = await saveTaskRepository(parsedBody)

  return data

}