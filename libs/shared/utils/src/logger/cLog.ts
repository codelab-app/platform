import * as util from 'util'

export const cLog = (...objects: Array<object>) => {
  // console.log(objects.map((obj) => util.inspect(obj, false, null, true)))

  objects.forEach((obj) => console.log(util.inspect(obj, false, null, true)))
}
