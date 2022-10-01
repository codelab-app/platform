import * as util from 'util'

export const cLog = (...objects: Array<string | object>) => {
  objects.forEach((obj) =>
    console.log(
      util.inspect(obj, { showHidden: false, depth: null, colors: true }),
    ),
  )
}
