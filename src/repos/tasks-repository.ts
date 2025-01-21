import fs from 'fs'
import path from 'path'
import { TaskModel } from '../models/task-model'

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

export const saveTaskRepository = async (task: TaskModel) => {
  console.log(task)
}