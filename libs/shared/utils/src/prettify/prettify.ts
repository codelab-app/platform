import type { ObjectLike } from '@codelab/shared/abstract/types'

export const prettifyForConsole = (object: ObjectLike) => {
  return JSON.stringify(object, null, 2)
}
