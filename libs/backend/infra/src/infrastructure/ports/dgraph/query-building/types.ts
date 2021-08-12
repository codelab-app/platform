import { DgraphEntity } from '../interfaces'

type DgraphQueryJsonValue<
  key extends keyof TEntity,
  TEntity extends DgraphEntity<any>,
> = TEntity[key] extends infer TValue | undefined | null
  ? TValue extends DgraphEntity<any>
    ? DgraphQueryJson<TValue> | boolean
    : TValue extends Array<infer TItem>
    ? TItem extends DgraphEntity<any>
      ? DgraphQueryJson<TItem> | boolean
      : boolean | undefined
    : boolean | undefined
  : boolean | undefined

export type DgraphQueryJson<TEntity extends DgraphEntity<any>> = {
  [key in keyof TEntity & string]?: DgraphQueryJsonValue<key, TEntity> | boolean
}

type NotNever<T> = {
  [P in keyof T]-?: Exclude<T[P], never>
}

/** Not working very well at the moment, ignore never-typed fields */
export type WithReverseFields<TOtherEntity extends DgraphEntity<any>> = {
  [key in keyof TOtherEntity & string as `~${key}`]?: TOtherEntity[key] extends
    | DgraphEntity<any>
    | Array<DgraphEntity<any>>
    | undefined
    | null
    ? DgraphQueryJsonValue<key, TOtherEntity> | boolean
    : never
}

/** Not working very well at the moment */
export type InferQueryResult<
  TJsonQuery extends DgraphQueryJson<TEntity>,
  TEntity extends DgraphEntity<any>,
> = {
  [key in keyof TEntity & string]: TJsonQuery[key] extends
    | undefined
    | null
    | false
    | never
    ? never
    : TJsonQuery[key] extends DgraphQueryJson<infer TInnerEntity>
    ? InferQueryResult<TJsonQuery[key], TInnerEntity>
    : TEntity[key]
}
