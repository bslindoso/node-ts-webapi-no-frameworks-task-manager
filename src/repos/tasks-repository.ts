import fs from 'fs'
import path from 'path'
import { TaskModel } from '../models/task-model'
import { TaskDTOModel } from '../models/task-dto-model'
import { StatusCode } from '../utils/status-code'

const pathData = path.join(__dirname, "/database.json")
const language = "utf-8"


export const tasksRepository = async (id?: number): Promise<TaskModel[]> => {
  const rawData = fs.readFileSync(pathData, language)
  let jsonFile = JSON.parse(rawData)


  if (id) {
    jsonFile = jsonFile.filter(
      (task: TaskModel) => id === Number(task.id)
    )
  }

  return jsonFile
}

export const saveTaskRepository = async (task: TaskModel): Promise<TaskDTOModel> => {
  try {
    // read content from database file
    const rawData = await fs.promises.readFile(pathData, language)
    const tasks: TaskModel[] = JSON.parse(rawData)

    // add the new task to the list of tasks
    tasks.push(task)

    // write the new content to the database file
    await fs.promises.writeFile(pathData, JSON.stringify(tasks, null, 2), language)

    const responseFormat: TaskDTOModel = {
      statusCode: StatusCode.CREATED,
      body: JSON.stringify({ message: `Task saved successfuly! ID: ${task.id}` })
    }

    return responseFormat

  } catch (error) {

    const responseFormat: TaskDTOModel = {
      statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({ message: `Error to save the new Task: ${error}` })
    }

    return responseFormat
  }
}


