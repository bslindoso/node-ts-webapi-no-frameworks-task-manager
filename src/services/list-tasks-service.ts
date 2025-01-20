import { TaskDTOModel } from "../models/task-dto-model"
import { TaskModel } from "../models/task-model"
import { tasksRepository } from "../repos/tasks-repository"
import { StatusCode } from "../utils/status-code"

export const serviceListTasks = async (): Promise<TaskDTOModel> => {

  const data: TaskModel[] = await tasksRepository()

  let responseFormat: TaskDTOModel = {
    statusCode: 0,
    body: []
  }

  // verifica o tipo de resposta
  responseFormat = {
    statusCode: data.length !== 0 ? StatusCode.OK : StatusCode.NO_CONTENT,
    body: data
  }

  return responseFormat
}