import { FollowUpModel } from "./followup-model"

export interface TaskModel {
  id?: string
  created?: string
  title: string
  description: string
  followups?: FollowUpModel[] // Campo opcional
  status?: 'todo' | 'doing' | 'done' | 'canceled' | 'paused'// Enumeração de status possíveis
  [key: string]: any // Permite adicionar campos dinâmicos
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