import { TaskDTOModel } from "../models/task-dto-model";
import { TaskModel } from "../models/task-model";
import { getTasksFromRepository } from "../repos/tasks-repository";
import { StatusCode } from "../utils/status-code";

export const serviceGetTaskById = async (id: number): Promise<TaskDTOModel> => {

  const data: TaskModel[] = await getTasksFromRepository(id)

  const responseFormat: TaskDTOModel = {
    statusCode: (data.length !== 0) ? StatusCode.OK : StatusCode.NO_CONTENT,
    body: JSON.stringify(data)
  }

  return responseFormat
}