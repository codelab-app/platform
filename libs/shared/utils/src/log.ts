import * as util from 'util'

export const cLog = (data: any) => {
  console.log(util.inspect(data, false, null, true))
}
