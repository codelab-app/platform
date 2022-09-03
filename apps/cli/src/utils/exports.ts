export const exportAsString = (data: Record<string, unknown>) =>
  JSON.stringify(data, null, 2)
