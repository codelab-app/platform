import type { IEntity } from '@codelab/shared/abstract/types'
import { extractId } from './extract-id'

export const entityIdSet = <T extends IEntity>(entities: Array<T>) =>
  new Set(entities.map(extractId))
