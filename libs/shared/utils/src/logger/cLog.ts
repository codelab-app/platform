import * as util from 'util'

export const cLog = (...objects: Array<string | object>) => {
  objects.forEach((obj) =>
    console.log(
      util.inspect(obj, { colors: true, depth: null, showHidden: false }),
    ),
  )
}
