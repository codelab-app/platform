export type EntityLike = {
  id: string
}

export type DgraphEntityLike = {
  uid: string
}

export type EntityRecord = Record<string, unknown>

export type Entity<T extends EntityLike> = Pick<T, 'id'>
