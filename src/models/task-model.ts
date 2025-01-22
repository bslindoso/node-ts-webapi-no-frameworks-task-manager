import { Status } from "../utils/status-types"
import { FollowUpModel } from "./followup-model"

export interface TaskModel {
  id: number
  created: Date
  title: string
  description: string
  followups?: FollowUpModel[] // Optional field
  status: Status // Possible status 
}

export const isTaskModel = (obj: any): obj is TaskModel => {

  return (
    typeof obj === 'object' &&
    obj !== null &&
    'title' in obj &&
    'description' in obj &&
    (typeof obj.title === 'string') &&
    (typeof obj.description === 'string')
  );
};
