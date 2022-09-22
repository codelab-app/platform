export const logTask = (task: string, label: string, data?: object) => {
  console.debug(`[${task}`, label, data)
}

export const logSection = (task: string) => {
  console.log('---------------------')
  console.log(`${task}...`)
  console.log('---------------------')
}
