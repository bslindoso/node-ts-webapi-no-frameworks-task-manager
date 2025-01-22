import fs from 'fs'
import path from 'path'
import { TaskModel } from '../models/task-model'
import { TaskDTOModel } from '../models/task-dto-model'
import { StatusCode } from '../utils/status-code'

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

export const saveTaskToRepository = async (task: TaskModel[]): Promise<TaskDTOModel> => {
  try {

    // write the new content to the database file
    await fs.promises.writeFile(pathData, JSON.stringify(task, null, 2), language)

    const responseFormat: TaskDTOModel = {
      statusCode: StatusCode.CREATED,
      body: JSON.stringify({ message: `Task saved successfuly!` })
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

export const updateTaskToRepository = async (id: number, tasks: TaskModel[]): Promise<TaskDTOModel> => {
  try {

    await fs.promises.writeFile(pathData, JSON.stringify(tasks, null, 2), language)

    const responseFormat: TaskDTOModel = {
      statusCode: StatusCode.OK,
      body: JSON.stringify({ message: `Task updated successfuly!` })
    }

    return responseFormat

  } catch (error) {

    const responseFormat: TaskDTOModel = {
      statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({ message: `Error to update the new Task: ${error} }` })
    }

    return responseFormat
  }
}

export const removeTaskFromRepository = async (id: number): Promise<TaskDTOModel> => {

  const tasks: TaskModel[] = await getTasksFromRepository(id)

  if (tasks.length === 0) return {
    statusCode: StatusCode.NO_CONTENT,
    body: `[]`
  }

  // TRY TO REMOVE 




  //////////

  const returnObj = {
    message: `Task removed sucessfuly`,
    data: [...tasks]
  }

  console.log(returnObj)


  return {
    statusCode: StatusCode.OK,
    body: `${JSON.stringify(returnObj)}`
  }
}


