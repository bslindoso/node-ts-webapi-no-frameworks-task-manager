import { FollowUpModel } from "../models/followup-model";
import { TaskDTOModel } from "../models/task-dto-model";
import { getTasksFromRepository, writeTaskToRepository } from "../repos/tasks-repository";
import { StatusCode } from "../utils/status-code";
import { hasExtraPropertiesFromFollowUp } from "./utils/body-has-extra-properties";
import { generateBRTDateTime } from "./utils/generate-brt-date-time";

export const serviceCreateFollowUp = async (id: number, body: string): Promise<TaskDTOModel> => {

  let parsedBody: FollowUpModel

  try {
    parsedBody = JSON.parse(body);
  }
  catch (error) {
    return {
      statusCode: StatusCode.UNPROCESSABLE_ENTITY,
      body: JSON.stringify({ message: "Invalid JSON format" })
    }
  }
  // Check if both properties exists
  if (!parsedBody.hasOwnProperty('user') || !parsedBody.hasOwnProperty('post')) {
    return {
      statusCode: StatusCode.UNPROCESSABLE_ENTITY,
      body: JSON.stringify({ message: "Missing 'user' and/or 'post' property." })
    }
  }

  // Check if there some extra properties on body
  if (hasExtraPropertiesFromFollowUp(parsedBody)) {
    return {
      statusCode: StatusCode.UNPROCESSABLE_ENTITY,
      body: JSON.stringify({ message: "Verify extra porperties" })
    }
  }

  // Get the whole list of tasks
  const tasks = await getTasksFromRepository()
  const taskFound = tasks.find((task) => id === task.id)

  if (!taskFound) return {
    statusCode: StatusCode.NOT_FOUND,
    body: JSON.stringify({ message: `Task id:${id} not found` })
  }

  const orderedFollowUp = {
    user: parsedBody.user,
    posted: await generateBRTDateTime(),
    post: parsedBody.post
  }

  taskFound.followups?.push(orderedFollowUp)

  const data = await writeTaskToRepository(tasks, 'saveFollowup')

  return data
}