import util from 'util'

export const cLog = (obj: any) => {
  console.log(util.inspect(obj, false, null, true))
}
