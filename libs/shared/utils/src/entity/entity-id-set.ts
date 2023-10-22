import type { IRef } from '@codelab/shared/abstract/core'
import { extractId } from './extract-id'

export const entityIdSet = <T extends IRef>(entities: Array<T>) =>
  new Set(entities.map(extractId))
