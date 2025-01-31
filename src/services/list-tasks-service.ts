import { TaskDTOModel } from "../models/task-dto-model"
import { TaskModel } from "../models/task-model"
import { getTasksFromRepository } from "../repos/tasks-repository"
import { StatusCode } from "../utils/status-code"

export const serviceListTasks = async (): Promise<TaskDTOModel> => {

  const data: TaskModel[] = await getTasksFromRepository()

  const responseFormat: TaskDTOModel = {
    statusCode: data.length !== 0 ? StatusCode.OK : StatusCode.NO_CONTENT,
    body: JSON.stringify(data)
  }

  return responseFormat
}