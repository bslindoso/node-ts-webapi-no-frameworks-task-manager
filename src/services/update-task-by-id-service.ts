import { TaskDTOModel } from "../models/task-dto-model";
import { getTasksFromRepository, updateTaskToRepository } from "../repos/tasks-repository";
import { StatusCode } from "../utils/status-code";
import { TaskModel } from "../models/task-model";
import { hasExtraProperties } from "./utils/body-has-extra-properties";
import { HttpMethod } from "../utils/http-methods";

export const serviceUpdateTask = async (id: number, body: string): Promise<TaskDTOModel> => {

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

  // Check if there some extra properties on body
  if (hasExtraProperties(parsedBody, HttpMethod.PUT)) {
    return {
      statusCode: StatusCode.UNPROCESSABLE_ENTITY,
      body: JSON.stringify({ message: "Verify extra porperties" })
    }
  }

  // read content from database file
  const tasks = await getTasksFromRepository()

  const taskFound = tasks.find((task) => id === task.id)

  // if there's no task with the ID
  if (!taskFound) return {
    statusCode: StatusCode.NOT_FOUND,
    body: JSON.stringify({ message: `No task found with id: ${id}` })
  }

  if (parsedBody.title) taskFound.title = parsedBody.title
  if (parsedBody.description) taskFound.description = parsedBody.description
  if (parsedBody.status) {
    const validStatuses = /^(todo|doing|done|canceled|paused)$/i;
    if (!validStatuses.test(parsedBody.status)) {
      return {
        statusCode: StatusCode.UNPROCESSABLE_ENTITY,
        body: JSON.stringify({ message: "Invalid status. Must be one of: todo, doing, done, canceled, paused" })
      }
    }
    taskFound.status = parsedBody.status
  }

  const responseFormat: TaskDTOModel = await updateTaskToRepository(id, tasks)

  return responseFormat
}