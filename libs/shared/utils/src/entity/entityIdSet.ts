import { IEntity } from '@codelab/shared/abstract/types'
import { extractId } from './extractId'

export const entityIdSet = <T extends IEntity>(entities: Array<T>) =>
  new Set(entities.map(extractId))
