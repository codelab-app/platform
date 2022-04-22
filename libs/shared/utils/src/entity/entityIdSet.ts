import { IIdentifiable } from '@codelab/shared/abstract/types'
import { extractId } from './extractId'

export const entityIdSet = <T extends IIdentifiable>(entities: Array<T>) =>
  new Set(entities.map(extractId))
