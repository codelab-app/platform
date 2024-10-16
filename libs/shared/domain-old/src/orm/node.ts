import type { ObjectLike } from '@codelab/shared/abstract/types'

export const createNode = (node: ObjectLike) => ({
  create: {
    node,
  },
})
