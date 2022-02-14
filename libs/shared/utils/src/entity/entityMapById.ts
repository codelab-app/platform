import { EntityLike, Nullish } from '@codelab/shared/abstract/types'
import { keyBy } from 'lodash'

export const entityToIdAndEntity = <T extends EntityLike>(
  entity: T,
): [string, T] => [entity.id, entity]

export const entityMapById = <T extends EntityLike>(
  entities: Nullish<Array<T>>,
) => new Map(entities?.length ? entities.map(entityToIdAndEntity) : [])

export const entityRecordById = <T extends EntityLike>(
  entities: Nullish<Array<T>>,
): Record<string, T> => (entities?.length ? keyBy(entities, 'id') : {})
