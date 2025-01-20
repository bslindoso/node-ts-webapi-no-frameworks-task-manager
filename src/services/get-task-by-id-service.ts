import { TaskDTOModel } from "../models/task-dto-model";
import { TaskModel } from "../models/task-model";
import { tasksRepository } from "../repos/tasks-repository";
import { StatusCode } from "../utils/status-code";

export const serviceGetListById = async (id: number): Promise<TaskDTOModel> => {

  const data: TaskModel[] = await tasksRepository(id)

  const responseFormat: TaskDTOModel = {
    statusCode: (data.length !== 0) ? StatusCode.OK : StatusCode.NO_CONTENT,
    body: JSON.stringify(data)
  }

  return responseFormat
}