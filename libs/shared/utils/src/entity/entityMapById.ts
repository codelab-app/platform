import { IIdentifiable, Nullish } from '@codelab/shared/abstract/types'
import { keyBy } from 'lodash'

export const entityToIdAndEntity = <T extends IIdentifiable>(
  entity: T,
): [string, T] => [entity.id, entity]

export const entityMapById = <T extends IIdentifiable>(
  entities: Nullish<Array<T>>,
) => new Map(entities?.length ? entities.map(entityToIdAndEntity) : [])

export const entityRecordById = <T extends IIdentifiable>(
  entities: Nullish<Array<T>>,
): Record<string, T> => (entities?.length ? keyBy(entities, 'id') : {})
