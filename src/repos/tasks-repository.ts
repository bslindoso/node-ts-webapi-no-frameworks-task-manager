import fs from 'fs'
import path from 'path'
import { TaskModel } from '../models/task-model'

const pathData = path.join(__dirname, "../repos/database.json")
const language = "utf-8"


export const tasksRepository = async (): Promise<TaskModel[]> => {
  const rawData = fs.readFileSync(pathData, language)
  let jsonFile = JSON.parse(rawData)

  return jsonFile
}