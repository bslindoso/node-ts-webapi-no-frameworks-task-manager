import { TaskDTOModel } from "../models/task-dto-model";
import { TaskModel } from "../models/task-model";
import { getTasksRepository } from "../repos/tasks-repository";
import { StatusCode } from "../utils/status-code";

export const serviceGetTaskById = async (id: number): Promise<TaskDTOModel> => {

  const data: TaskModel[] = await getTasksRepository(id)

  const responseFormat: TaskDTOModel = {
    statusCode: (data.length !== 0) ? StatusCode.OK : StatusCode.NO_CONTENT,
    body: JSON.stringify(data)
  }

  return responseFormat
}