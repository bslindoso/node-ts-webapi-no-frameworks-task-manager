import { StatusCode } from "../utils/status-code"
import { ContentType } from "../utils/content-type";
import { getTasksFromRepository, writeTaskToRepository } from "../repos/tasks-repository";
import { TaskDTOModel } from "../models/task-dto-model";
import { isTaskModel, TaskModel } from "../models/task-model";
import { hasExtraProperties } from "./utils/body-has-extra-properties";
import { HttpMethod } from "../utils/http-methods";

const DEFAULT_CONTENT = { "Content-Type": ContentType.JSON }

export const serviceCreateTask = async (body: string) => {

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
  if (hasExtraProperties(parsedBody, HttpMethod.POST)) {
    return {
      statusCode: StatusCode.UNPROCESSABLE_ENTITY,
      body: JSON.stringify({ message: "Verify extra porperties" })
    }
  }

  const tasks: TaskModel[] = await getTasksFromRepository()

  // Reorder the object to save in the file
  const orderedTask: TaskModel = {
    id: tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1, // Generate next ID from the database langth
    created: parsedBody.created = new Date(new Date().setHours(new Date().getHours() - 3)), // Generate created time based on BRT (UTC -3)
    title: parsedBody.title,
    description: parsedBody.description,
    status: 'todo'
  }

  tasks.push(orderedTask)

  const data: TaskDTOModel = await writeTaskToRepository(tasks, 'save')

  return data
}