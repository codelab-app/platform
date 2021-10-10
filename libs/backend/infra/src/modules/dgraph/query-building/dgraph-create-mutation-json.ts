import { Mutation } from 'dgraph-js-http'
import { DgraphEntity } from '../interfaces'

export type MutationJsonValue<TValue> = TValue extends any | undefined
  ? TValue | null | undefined
  : TValue

export type UidRef = Pick<DgraphEntity<any>, 'uid'>

// https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type
export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never

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
      : TEntity[key] extends
          | DgraphEntity
          | Array<DgraphEntity>
          | null
          | undefined // DgraphEntity or DgraphEntityArray[], nullable?
      ? TEntity[key] extends infer TValue | null | undefined
        ? TValue extends DgraphEntity
          ?
              | DgraphUpdateMutationJson<TValue>
              | DgraphCreateMutationJson<TValue>
              | UidRef
              | undefined
              | null
          : TValue extends Array<infer TItem>
          ? TItem extends DgraphEntity
            ?
                | Array<
                    | DgraphUpdateMutationJson<TItem>
                    | DgraphCreateMutationJson<TItem>
                  >
                | UidRef
                | DgraphUpdateMutationJson<TItem>
                | DgraphCreateMutationJson<TItem>
                | undefined
                | null
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
  Partial<Pick<DgraphEntity, 'uid'>>

/** Makes all fields optional, except uid and allows setting array values as single references to uid */
export type DgraphUpdateMutationJson<TEntity extends DgraphEntity> = Partial<
  DgraphCreateMutationJson<TEntity>
> &
  Pick<DgraphEntity, 'uid'>

export const jsonMutation = <TEntity extends DgraphEntity>(
  json: DgraphCreateMutationJson<TEntity> | DgraphUpdateMutationJson<TEntity>,
): Mutation => {
  return {
    setJson: json,
  }
}
