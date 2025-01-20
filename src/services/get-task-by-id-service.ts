import { TaskDTOModel } from "../models/task-dto-model";
import { TaskModel } from "../models/task-model";

export const serviceGetListById = async (id: number): Promise<TaskDTOModel> => {

  const data: TaskModel[] = [] // CONTINUAR DAQUI
  const responseFormat: TaskDTOModel = {
    statusCode: 200,
    body: []
  }
  return responseFormat
}