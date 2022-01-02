import { Maybe, MaybeOrNullable } from '@codelab/shared/abstract/types'
import { Mutation } from 'dgraph-js-http'
import forOwn from 'lodash/forOwn'
import { DgraphEntityType } from '../dgraph-entity-type'

export type MutationJsonValue<TValue> = TValue extends Maybe<any>
  ? MaybeOrNullable<TValue>
  : TValue

type DgraphEntity = Record<string, any>

export type UidRef = Pick<DgraphEntity, 'uid'>

/** Makes all uids optional and allows references to other entities and single items for array values */
export type DgraphCreateMutationJson<TEntity extends DgraphEntity> = Omit<
  {
    [key in keyof TEntity]: key extends 'dgraph.type'
      ? TEntity[key] // If key is dgraph.type, leave it intact
      : TEntity[key] extends DgraphEntity // DgraphEntity, non-nullable?
      ?
          | DgraphUpdateMutationJson<TEntity[key]>
          | DgraphCreateMutationJson<TEntity[key]>
          | UidRef
      : TEntity[key] extends MaybeOrNullable<DgraphEntity | Array<DgraphEntity>>
      ? // DgraphEntity or DgraphEntityArray[], nullable?
        TEntity[key] extends infer TValue | null | undefined
        ? TValue extends DgraphEntity
          ? MaybeOrNullable<
              | DgraphUpdateMutationJson<TValue>
              | DgraphCreateMutationJson<TValue>
              | UidRef
            >
          : TValue extends Array<infer TItem>
          ? TItem extends DgraphEntity
            ? MaybeOrNullable<
                | Array<
                    | DgraphUpdateMutationJson<TItem>
                    | DgraphCreateMutationJson<TItem>
                  >
                | UidRef
                | DgraphUpdateMutationJson<TItem>
                | DgraphCreateMutationJson<TItem>
              >
            : MutationJsonValue<TEntity[key]>
          : MutationJsonValue<TEntity[key]>
        : never
      : TEntity[key] extends Array<infer TItem> // DgraphEntity[], non-nullable
      ? TItem extends DgraphEntity
        ?
            | Array<
                | DgraphUpdateMutationJson<TItem>
                | DgraphCreateMutationJson<TItem>
              >
            | DgraphUpdateMutationJson<TItem>
            | DgraphCreateMutationJson<TItem>
            | UidRef
        : TEntity[key]
      : TEntity[key]
  },
  'uid'
> &
  Partial<Pick<DgraphEntity, 'uid'>> & {
    'dgraph.type': DgraphEntity['dgraph.type'] extends Array<any>
      ? DgraphEntity['dgraph.type']
      : Array<DgraphEntityType>
  }

/** Makes all fields optional, except uid and allows setting array values as single references to uid */
export type DgraphUpdateMutationJson<TEntity extends DgraphEntity> = Partial<
  DgraphCreateMutationJson<TEntity>
> &
  Pick<DgraphEntity, 'uid'>

export type RemoveUid<T> = T extends { uid: infer TUid }
  ? Omit<T, 'uid'> & { id: TUid }
  : T extends Array<{ uid: infer TUid }>
  ? Array<RemoveUid<T[0]>>
  : T

/**
 * Returns a new object with recursively changed 'id' key to 'uid'
 * @param obj the object that will get mapped
 * @param iteration leave out if not using recursively
 */
export const mapIdToUid = <TObject>(
  obj: TObject,
  iteration = 0,
): RemoveUid<TObject> => {
  if (iteration > 10000) {
    throw new Error(
      'mapIdToUid runs on a recursive, or a very deeply nested object',
    )
  }

  if (typeof obj !== 'object' || !obj) {
    return obj as any
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => mapIdToUid(item, iteration + 1)) as any
  }

  const result: Record<string, any> = {}

  forOwn(obj, (value, key) => {
    if (key === 'id' && !(obj as any).uid) {
      result.uid = value
    } else if (typeof value === 'object' && value) {
      result[key] = mapIdToUid(value, iteration + 1)
    } else {
      result[key] = value
    }
  })

  return result as any
}

/**
 * Shortcut for creating a setJson mutation
 * @param json
 */
export const jsonMutation = <TEntity extends DgraphEntity = any>(
  json: DgraphCreateMutationJson<TEntity> | DgraphUpdateMutationJson<TEntity>,
): Mutation => {
  return {
    setJson: json,
  }
}

/**
 * Shortcut for creating a setJson mutation with a dgraph.type field
 *
 * returns {
 *   dgraph.type: <entityType>,
 *   ...json
 * }
 */
export const createEntityMutation = (
  entityType: DgraphEntityType | Array<DgraphEntityType>,
  json: Record<string, any>,
): Mutation => {
  return {
    setJson: {
      'dgraph.type': Array.isArray(entityType) ? entityType : [entityType],
      ...json,
    },
  }
}
