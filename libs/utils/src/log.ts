import util from 'util'

export const cLog = (data) => {
  console.log(util.inspect(data, false, null, true))
}
