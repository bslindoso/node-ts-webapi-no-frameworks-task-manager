export const generateBRTDateTime = async (): Promise<Date> => {
  return new Date(new Date().setHours(new Date().getHours() - 3)) // Generate created time based on BRT (UTC -3)
}