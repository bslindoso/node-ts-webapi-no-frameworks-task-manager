import { TaskModel } from "../../models/task-model";
import { HttpMethod } from "../../utils/http-methods";

export const hasExtraProperties = (obj: TaskModel, method: HttpMethod) => {
  let allowedProperties = ['title', 'description']

  if (method === HttpMethod.POST) allowedProperties = ['title', 'description'];
  if (method === HttpMethod.PUT) allowedProperties = ['title', 'description', 'status'];

  // Check if object has any properties not in the allowed list
  const hasExtraProperties = Object.keys(obj).some(key => !allowedProperties.includes(key));

  if (hasExtraProperties) {
    return true;
  }

  return false
}