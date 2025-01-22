import fs from 'fs'
import path from 'path'
import { TaskModel } from '../models/task-model'
import { TaskDTOModel } from '../models/task-dto-model'
import { StatusCode } from '../utils/status-code'
import { OperationType } from '../utils/operation-types'

const pathData = path.join(__dirname, "/database.json")
const language = "utf-8"


export const getTasksFromRepository = async (id?: number): Promise<TaskModel[]> => {
  const rawData = fs.readFileSync(pathData, language)
  let jsonFile = JSON.parse(rawData)


  if (id) {
    jsonFile = jsonFile.filter(
      (task: TaskModel) => id === Number(task.id)
    )
  }

  return jsonFile
}

export const writeTaskToRepository = async (tasks: TaskModel[], operation: OperationType): Promise<TaskDTOModel> => {
  try {
    await fs.promises.writeFile(pathData, JSON.stringify(tasks, null, 2), language)

    const messages = {
      save: 'Task saved successfully!',
      update: 'Task updated successfully!',
      remove: 'Task removed successfully'
    }

    const statusCodes = {
      save: StatusCode.CREATED,
      update: StatusCode.OK,
      remove: StatusCode.OK
    }

    return {
      statusCode: statusCodes[operation],
      body: JSON.stringify({ message: messages[operation] })
    }

  } catch (error) {
    return {
      statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({
        message: `Error ${operation}ing task: ${error}`
      })
    }
  }
}