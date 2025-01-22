import { TaskDTOModel } from "../models/task-dto-model";
import { TaskModel } from "../models/task-model";
import { getTasksFromRepository, writeTaskToRepository } from "../repos/tasks-repository";
import { StatusCode } from "../utils/status-code";

export const serviceRemoveTask = async (id: number): Promise<TaskDTOModel> => {

  const tasks: TaskModel[] = await getTasksFromRepository()

  const taskIndex = tasks.findIndex(task => task.id === id)
  if (taskIndex === -1) return {
    statusCode: StatusCode.NOT_FOUND,
    body: JSON.stringify({ message: "Task not found" })
  }

  tasks.splice(taskIndex, 1)[0]
  const data = await writeTaskToRepository(tasks, 'remove')

  return data
}