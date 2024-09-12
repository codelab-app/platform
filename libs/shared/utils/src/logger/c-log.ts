import type { ObjectLike } from '@codelab/shared/abstract/types'
import * as util from 'util'

export const cLog = (
  ...objects: Array<ObjectLike | boolean | number | string | null | undefined>
) => {
  objects.forEach((obj) => {
    console.log(
      util.inspect(obj, { colors: true, depth: null, showHidden: false }),
    )
  })
}
