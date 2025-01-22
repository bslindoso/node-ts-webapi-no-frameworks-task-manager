import { IncomingMessage, ServerResponse } from "http";
import { isTaskModel, TaskModel } from "../models/task-model";
import { StatusCode } from "../utils/status-code"
import { ContentType } from "../utils/content-type";
import { saveTaskRepository, getTasksRepository } from "../repos/tasks-repository";
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

  // Check if there some extra properties on body
  if (hasExtraProperties(parsedBody)) {
    return {
      statusCode: StatusCode.UNPROCESSABLE_ENTITY,
      body: JSON.stringify({ message: "Verify extra porperties" })
    }
  }

  // Reorder the object to save in the file
  const orderedTask: TaskModel = {
    id: (await getTasksRepository()).length + 1, // Generate next ID from the database langth
    created: parsedBody.created = new Date(new Date().setHours(new Date().getHours() - 3)), // Generate created time based on BRT (UTC -3)
    title: parsedBody.title,
    description: parsedBody.description,
    status: 'todo'
  }

  const data: TaskDTOModel = await saveTaskRepository(orderedTask)

  return data
}

const hasExtraProperties = (obj: TaskModel) => {
  const allowedProperties = ['title', 'description'];

  // Check if object has any properties not in the allowed list
  const hasExtraProperties = Object.keys(obj).some(key => !allowedProperties.includes(key));

  if (hasExtraProperties) {
    return true;
  }

  return false
}