import { TaskDTOModel } from "../models/task-dto-model";
import { TaskModel } from "../models/task-model";
import { StatusCode } from "../utils/status-code";
import { hasExtraPropertiesFromFollowUp } from "./utils/body-has-extra-properties";

export const serviceCreateFollowUp = async (id: number, body: string): Promise<TaskDTOModel> => {

  let parsedBody: TaskModel

  try {
    parsedBody = JSON.parse(body);
  }
  catch (error) {
    return {
      statusCode: StatusCode.UNPROCESSABLE_ENTITY,
      body: JSON.stringify({ message: "Invalid JSON format" })
    }
  }

  // Check if there some extra properties on body
  if (hasExtraPropertiesFromFollowUp(parsedBody)) {
    return {
      statusCode: StatusCode.UNPROCESSABLE_ENTITY,
      body: JSON.stringify({ message: "Verify extra porperties" })
    }
  }


  return {
    statusCode: StatusCode.OK,
    body: ''
  }
}