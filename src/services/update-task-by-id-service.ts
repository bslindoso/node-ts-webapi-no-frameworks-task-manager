import { IncomingMessage, ServerResponse } from "http";
import { TaskDTOModel } from "../models/task-dto-model";
import { TaskModel } from "../models/task-model";
import { getTasksRepository } from "../repos/tasks-repository";

export const serviceUpdateTask = async (request: IncomingMessage, response: ServerResponse, taskId: number): Promise<TaskDTOModel> => {

  const task: TaskModel = await getTasksRepository(taskId)


  return {
    statusCode: 200,
    body: `${task}`
  }
}