import type { IRef } from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
import keyBy from 'lodash/keyBy'

export const entityToIdAndEntity = <T extends IRef>(entity: T): [string, T] => [
  entity.id,
  entity,
]

export const entityMapById = <T extends IRef>(entities: Nullish<Array<T>>) =>
  new Map(entities?.length ? entities.map(entityToIdAndEntity) : [])

export const entityRecordById = <T extends IRef>(
  entities: Nullish<Array<T>>,
): Record<string, T> => (entities?.length ? keyBy(entities, 'id') : {})
