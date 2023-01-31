import util from 'util'

export const logTask = (task: string, label = '', data?: object) => {
  if (data) {
    return console.debug(
      `[${task}]:`,
      label,
      util.inspect(data, false, null, true),
    )
  }

  return console.debug(`[${task}]:`, label)
}

export const logSection = (task: string) => {
  console.log('---------------------')
  console.log(`${task}...`)
  console.log('---------------------')
}
